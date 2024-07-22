import { AuthState } from "@/interfaces/Authenticattion";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isLogin: false,
  user: null,
  token: null,
  send: false,
  userChat: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setSend(state, action: PayloadAction<boolean>) {
      state.send = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<any>) {
      state.token = action.payload;
    },
    setUserChat(state, action: PayloadAction<any>) {
      state.userChat = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setLogin, setUserChat, setUser, setSend, resetState, setToken } =
  authSlice.actions;
export default authSlice.reducer;
