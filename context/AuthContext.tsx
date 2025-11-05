import { createContext } from "react";
import { AuthState } from "../stack/AppFlow";

export const AuthContext = createContext<AuthState>({
  signIn: () => Promise.resolve(),
  signOut: () => {},
  signUp: () => Promise.resolve(),
});
