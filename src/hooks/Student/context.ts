import { createContext, Dispatch } from "react";
import { IAction } from "./reducer/reducer";
import { IState } from "./state";

export interface IContextType {
    state: IState,
    dispatch: Dispatch<IAction>
}

export const studentContext = createContext<IContextType | null>(null);
export default studentContext;