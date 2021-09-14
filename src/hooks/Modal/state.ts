export interface IModal {
    title: string
    content: string | JSX.Element
}

export type action = "CREATE" | "UPDATE" | "DELETE" | "DELETE_ALL" | "";

export interface IState {
    action: action
    modalData?: IModal
    visible?: boolean
}

export const initialState: IState = {
    action: "CREATE",
    visible: false,
    modalData: {
        title: '',
        content: ''
    }
}