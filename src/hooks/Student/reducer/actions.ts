import { Student } from "../../../models/student";
import { get, handleAlertError, post, put, _delete } from "../../../utils/http";
import { IContextType } from "../context";

export const getStudents = async (context: IContextType) => {
    try {
        const { data, status } = await get('/student/get-all/');
        const students: Student[] = data.students;
        if (status === 200) {
            context.dispatch({ type: 'LOAD_STUDENTS', students })
            context.dispatch({ type: 'SELECT_STUDENT', selectedStudent: undefined })
        }
    } catch (error) {
        handleAlertError(error);
    }
}

export const createStudent = async (context: IContextType, student: Student) => {
    try {
        const { status } = await post('/student/create/', { ...student, gradeId: student.grade.id, grade: undefined });
        if (status === 200) {
            await getStudents(context);
        }
    } catch (error) {
        handleAlertError(error);
    }
}

export const updateStudent = async (context: IContextType, student: Student) => {
    try {
        if (context.state && context.state.selectedStudent) {
            const { status } = await put(`/student/update?id=${context.state.selectedStudent.id}`, {
                ...student,
                gradeId: student.grade.id,
                grade: undefined,
                id: undefined
            });
            if (status === 200) {
                await getStudents(context);
            }
        }
    } catch (error) {
        handleAlertError(error);
    }
}

export const deleteStudents = async (context: IContextType, ids: string[]) => {
    try {
        if (context.state && context.state.selectedIds) {
            const { status } = await _delete('/student/delete/', { ids: context.state.selectedIds });
            if (status === 200) {
                await getStudents(context);
            }
        }
    } catch (error) {
        handleAlertError(error);
    }
}