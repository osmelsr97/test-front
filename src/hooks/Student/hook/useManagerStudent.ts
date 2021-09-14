import { useContext } from "react";
import { Student } from "../../../models/student";
import studentContext from "../context";
import { getStudents, createStudent, updateStudent, deleteStudents } from "../reducer/actions";
import { IState } from "../state";

export interface IManagerStudent extends IState {
    getStudents: () => void
    createStudent: (student: Student) => void
    updateStudent: (student: Student) => void
    deleteStudents: (ids: string[]) => void
    selectStudent: (student: Student) => void
    selectStudents: (ids: string[]) => void
}

const useManagerStudent = (): IManagerStudent => {
    const context = useContext(studentContext);
    if (!context) {
        throw new Error('Only can use `useManagerStudent` inside a valid StudentProvider');
    }

    return {
        loading: context.state.loading,
        students: context.state.students,
        selectedStudent: context.state.selectedStudent,
        selectedIds: context.state.selectedIds,
        getStudents: () => getStudents(context),
        createStudent: (student) => createStudent(context, student),
        updateStudent: (student) => updateStudent(context, student),
        deleteStudents: (ids) => deleteStudents(context, ids),
        selectStudent: (selectedStudent) => context.dispatch({ type: 'SELECT_STUDENT', selectedStudent }),
        selectStudents: (selectedIds) => context.dispatch({ type: 'SELECT_STUDENTS', selectedIds })
    }
}

export default useManagerStudent;