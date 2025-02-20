import { LoginResult } from '@/api';

export function getLocalStore(key: string) {
  const data = localStorage.getItem(key);

  if (data === null) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

function setLocalStore(key: string, data: any): void {
  if (data === undefined || data === null) return; // 静默失败
  localStorage.setItem(key, JSON.stringify(data));
}

function removeLocalStore(key: string) {
  localStorage.removeItem(key);
}

/** 封装存入 token 方法 */
export function setToken(token: string): void {
  setLocalStore('token', token);
}
export function getToken(): string | null {
  return getLocalStore('token');
}
export function removeToken(): void {
  removeLocalStore('token');
}

/** 封装存入 userInfo 信息 */
export function setUserInfo(userInfo: LoginResult['userInfo']): void {
  setLocalStore('userInfo', userInfo);
}
export function getUserInfo(): LoginResult['userInfo'] | null {
  return getLocalStore('userInfo');
}
export function removeUserInfo(): void {
  removeLocalStore('userInfo');
}

/** 封装存入 */
export type SidebarStatus =
  | 1 // 收起 - 弹出式
  | 2 // 展开 - 弹出式
  | 3 // 收起 - 嵌入式
  | 4; // 展开 - 嵌入式
export function setSidebarStatus(sidebarStatus: SidebarStatus): void {
  setLocalStore('sidebarStatus', sidebarStatus);
}
export function getSidebarStatus(): SidebarStatus | null {
  return getLocalStore('sidebarStatus');
}
export function removesidebarStatus(): void {
  removeLocalStore('sidebarStatus');
}
