import Dep from "./Dep";
import { arrayMethods } from "./ArrayProxy";
import { def } from "../../vue源码/src/core/util";

const hasProto = "__proto__" in {}; // 判断 __proto__ 是否可用
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

// 为每个 key 收集依赖
function defineReactive(data, key, val) {
  // 递归子属性
  let childOb = observe(val);

  let dep = new Dep(); // 收集依赖的类，通过闭包引用
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend(); // 收集依赖

      if (childOb) {
        // 在 Array 中，用于收集 Array 的依赖
        childOb.dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        // 判断值是否变化
        return;
      }
      val = newVal; // 改变值
      dep.notify(); // 触发依赖
    }
  });
}

// 拦截数组 __proto__
function protoAugment(target, src, keys) {
  target.__proto__ = src;
}

// 拦截数组 变异方法
function copyAugment(target, src, keys) {
  for (const key of keys) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}

// 工具函数
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Observer 类会附加到每一个被侦测的 object 上。
 * 一旦被附加上，Observer 会将 object 的所有属性转化为 getter/setter 的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知所有依赖
 */
export class Observer {
  constructor(value) {
    this.value = value; // 保存原始 value
    this.dep = new Dep(); // 用于收集当前属性的变动：如 Array 的变异方法，属性的增删
    def(value, "__ob__", this); // 在 value 中引用该 this

    if (Array.isArray(value)) {
      // 数组
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);

      // 递归数组
      this.observeArray(value);
    } else if (!Array.isArray(value)) {
      // object 类型
      this.walk(value);
    }
  }

  /**
   * walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 这个方法只有在数据类型为 object 时被调用
   */
  walk(obj) {
    const keys = object.keys(obj);
    for (const key of keys) {
      defineReactive(obj, key, obj[key]);
    }
  }

  /**
   * 侦听 Array 中的每一项
   */
  observeArray(value) {
    for (const item of value) {
      observe(item);
    }
  }
}

/**
 * 尝试为 value 创建一个 Observer 实例
 * 如果创建成功，直接返回新创建的 Observer 实例。
 * 如果 value 已经存在一个 Observer 实例，则直接返回它
 */
export function observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }

  let ob;
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    ob = value.__ob__; // 已是响应式对象，直接返回
  } else {
    ob = new Observer(value);
  }
  return ob;
}
