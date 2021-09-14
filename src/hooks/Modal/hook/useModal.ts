import { useContext } from "react";
import { Student } from "../../../models/student";
import studentContext from "../context";
import { openDialog, closeDialog } from "../reducer/actions";
import { action, IState } from "../state";

interface IModal extends IState {
    openDialog: (action: action, student?: Student, ids?: string[]) => void
    closeDialog: (accept: boolean, student?: Student) => void
}

const useModal = (): IModal => {
    const context = useContext(studentContext);
    if (!context) {
        throw new Error('Only can use `useModal` inside a valid ModalProvider');
    }

    return {
        visible: context.state.visible,
        action: context.state.action,
        modalData: context.state.modalData,
        openDialog: (action, student, ids) => openDialog(context, action, student, ids),
        closeDialog: (accept, student) => closeDialog(context, accept, student),
    }
}

export default useModal;