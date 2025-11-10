import { createContext, useContext } from "react";
const Ctx = createContext({ currentUser: null, claims: {} });
export const useAuth = () => useContext(Ctx);
export function AuthProviderMock({ children, value }) { return <Ctx.Provider value={value}>{children}</Ctx.Provider>; }