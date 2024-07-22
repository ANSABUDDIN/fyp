import { LoginData } from "@/interfaces/Authenticattion";
import api from "./api";

export const login = async (data: LoginData) =>
  await api.post("/auth/login", data);

export const createAccount = async (data: any) =>
  await api.post("/auth/register", data);

export const logout = async (id: string) => await api.put(`/auth/logout/${id}`);

export const getChatList = async (userId: string) =>
  await api.get(`/chat/list?userId=${userId}`);

export const getUsersList = async (params: any) =>
  await api.get('/auth/get', { params: { query: params } });

export const getConversation = async (sender: String, receiver: String) =>
  await api.get(`/chat/messages?sender=${sender}&receiver=${receiver}`);

export const sendMessageToUser = async (messages: any) =>
  await api.post("/chat/send-message", messages);

export const readMessages = async (messages: any) =>
  await api.post("/chat/read-message", messages);
