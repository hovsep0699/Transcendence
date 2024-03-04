import React from "react"
import io from 'socket.io-client';
import { sock_ip } from "./utils/ip";

export const socket = io(`${sock_ip}:4001`);
