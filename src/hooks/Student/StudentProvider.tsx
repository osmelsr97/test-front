import { useReducer } from "react"
import Context from "./context"
import reducer from "./reducer/reducer"
import { initialState } from "./state"

interface IProps {
    children?: JSX.Element
}

const StudentProvider = ({ children }: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}

export default StudentProvider;