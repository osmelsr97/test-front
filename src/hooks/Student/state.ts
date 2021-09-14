import { Student } from "../../models/student";

export interface IState {
    students?: Student[]
    selectedStudent?: Student
    selectedIds?: string[]
    loading?: boolean
}

export const initialState: IState = {
    loading: false
}