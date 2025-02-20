/*
 * @Descripttion:
 * @Author: 温祖彪
 * @Date: 2020-03-23 22:11:30
 * @LastEditTime: 2020-03-23 22:11:37
 */
// initGlobalAPI
Vue.config;
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive
};
Vue.set = set;
Vue.delete = del;
Vue.nextTick = nextTick;
Vue.options = {
  components: {
    KeepAlive
    // Transition 和 TransitionGroup 组件在 runtime/index.js 文件中被添加
    // Transition,
    // TransitionGroup
  },
  directives: Object.create(null),
  // 在 runtime/index.js 文件中，为 directives 添加了两个平台化的指令 model 和 show
  // directives:{
  //	model,
  //	show
  // },
  filters: Object.create(null),
  _base: Vue
};

// initUse ***************** global-api/use.js
Vue.use = function(plugin: Function | Object) {};

// initMixin ***************** global-api/mixin.js
Vue.mixin = function(mixin: Object) {};

// initExtend ***************** global-api/extend.js
Vue.cid = 0;
Vue.extend = function(extendOptions: Object): Function {};

// initAssetRegisters ***************** global-api/assets.js
Vue.component = Vue.directive = Vue.filter = function(
  id: string,
  definition: Function | Object
): Function | Object | void {};

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext
});

Vue.version = "__VERSION__";

// entry-runtime-with-compiler.js
Vue.compile = compileToFunctions;
