import { useReducer } from "react";
import Modal from "../../components/Modal/Modal";
import useManagerStudent from "../Student/hook/useManagerStudent";
import Context from "./context";
import reducer from "./reducer/reducer";
import { initialState } from "./state";

interface IProps {
  children?: JSX.Element;
}

const ModalProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const managerStudent = useManagerStudent();

  return (
    <Context.Provider value={{ state, dispatch, managerStudent }}>
      <Modal
        visible={state.visible!}
        title={state.modalData!.title}
      >
        {state.modalData!.content}
      </Modal>
      ){children}
    </Context.Provider>
  );
};

export default ModalProvider;
