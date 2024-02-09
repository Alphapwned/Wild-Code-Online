import { createContext, useState } from "react";
import { IAuthContextProps } from "../interface/IAuthContext";

export const authContext = createContext<IAuthContextProps>({
    isAuthenticated: false,
    setIsAuth: () => { }
})

