import { IState } from "../state";

export interface IAction extends IState {
    type: 'OPEN' | 'CLOSE'
}

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'OPEN':
            return {
                ...state,
                visible: true,
                action: action.action,
                modalData: action.modalData,
            }
        case 'CLOSE':
            return {
                ...state,
                visible: false,
                action: action.action,
            }
        default:
            return state;
    }
}

export default reducer;