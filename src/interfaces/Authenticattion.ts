export interface AuthState {
  isLogin: boolean;
  user: any;
  token: any;
  send: any;
  userChat: any;
}

export interface LoginData {
  email: string;
  password: string;
  role: Number;
}
