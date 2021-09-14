import { Student } from "../../../models/student";
import { IContextType } from "../context";
import { action, IModal } from "../state";

export const openDialog = async (context: IContextType, action: action, student?: Student, ids?: string[]) => {
    let modalData: IModal = {
        title: '',
        content: ''
    };
    switch (action) {
        case "CREATE":
            modalData = {
                title: "Add student",
                content: "FORM"
            }
            break;
        case "UPDATE":
            if (student) {
                modalData = {
                    title: "Update student",
                    content: "FORM"
                }
                context.managerStudent.selectStudent(student);
            }
            break;
        case "DELETE":
            if (ids) {
                modalData = {
                    title: `Delete Student?`,
                    content: `Are you sure you want to delete the Student?`
                };
                context.managerStudent.selectStudents(ids);
            }
            break;
        case "DELETE_ALL":
            if (ids) {
                modalData = {
                    title: `Delete Students?`,
                    content: `Are you sure you want to delete the students?`
                };
                context.managerStudent.selectStudents(ids);
            }
            break;
        default:
            break;
    }
    context.dispatch({ type: 'OPEN', modalData, action });
}

export const closeDialog = async (context: IContextType, accept: boolean, student?: Student) => {
    const action = context.state.action;
    if (accept) {
        switch (action) {
            case "CREATE":
                if (student) {
                    context.managerStudent.createStudent(student);
                }
                break;
            case "UPDATE":
                if (student) {
                    context.managerStudent.updateStudent(student);
                }
                break;
            case "DELETE":
                if (context.managerStudent.selectedIds) {
                    context.managerStudent.deleteStudents(context.managerStudent.selectedIds);
                }
                break;
            case "DELETE_ALL":
                if (context.managerStudent.selectedIds) {
                    context.managerStudent.deleteStudents(context.managerStudent.selectedIds);
                }
                break;
            default:
                break;
        }
    }
    context.dispatch({ type: 'CLOSE', action: '' });
}