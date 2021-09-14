import { createContext, Dispatch } from "react";
import { IManagerStudent } from "../Student/hook/useManagerStudent";
import { IAction } from "./reducer/reducer";
import { IState } from "./state";

export interface IContextType {
    state: IState,
    dispatch: Dispatch<IAction>
    managerStudent: IManagerStudent
}

export const modalContext = createContext<IContextType | null>(null);
export default modalContext;