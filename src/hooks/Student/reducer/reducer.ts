import { IState } from "../state";

export interface IAction extends IState {
    type: 'LOAD_STUDENTS' | 'SELECT_STUDENT' | 'SELECT_STUDENTS' | 'CREATE_STUDENT' | 'LOADING',
}

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'LOAD_STUDENTS':
            return {
                ...state,
                students: action.students,
                loading: false
            }
        case 'SELECT_STUDENT':
            return {
                ...state,
                selectedStudent: action.selectedStudent
            }
        case 'SELECT_STUDENTS':
            return {
                ...state,
                selectedIds: action.selectedIds
            }
        case 'LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}

export default reducer;