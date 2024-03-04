import { store } from "../redux";

export const ip =  process.env.IP ?? "http://localhost";
export const sock_ip = process.env.socket ?? "ws://localhost:4000"
export function getUserState() {
    return store.getState().user;
  }