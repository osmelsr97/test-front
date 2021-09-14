import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import useModal from "../../hooks/Modal/hook/useModal";
import { Grade } from "../../models/grade";
import { Student } from "../../models/student";
import { get, handleAlertError } from "../../utils/http";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button/Button";
import FormStudent from "../Form/FormStudent";
import "./modal.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useManagerStudent from "../../hooks/Student/hook/useManagerStudent";

interface IProps {
  visible: boolean;
  accept?: () => void;
  title: string;
  children: string | JSX.Element;
}

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  grade: string;
}

const modal = document.getElementById("modal") as HTMLElement;
const Modal = ({ visible, title, children, accept }: IProps) => {
  const { selectedStudent } = useManagerStudent();
  const { closeDialog, action } = useModal();
  const [gradeList, setGradeList] = useState<Grade[]>();

  const schemaFields: { [name: string]: yup.SchemaOf<unknown> } = {};
  schemaFields.firstName = yup.string().required().label("First Name");
  schemaFields.lastName = yup.string().required().label("Last Name");
  schemaFields.age = yup.string().required().label("Age");
  schemaFields.email = yup.string().email().required().label("Email");
  schemaFields.grade = yup.string().required().label("Grade");
  const schema = yup.object(schemaFields);
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: !action.includes("DELETE") ? yupResolver(schema) : undefined,
  });

  useEffect(() => {
    if (selectedStudent) {
      setValue("firstName", selectedStudent.firstName);
      setValue("lastName", selectedStudent.lastName);
      setValue("email", selectedStudent.email);
      setValue("age", selectedStudent.age);
      setValue("grade", selectedStudent.grade.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent]);

  useEffect(() => {
    (async () => {
      if (!gradeList && children === "FORM") {
        try {
          const { data, status } = await get("/grade/get-all/");
          if (status === 200) {
            setGradeList(data);
          }
        } catch (error) {
          handleAlertError(error);
        }
      }
    })();
  }, [children, gradeList]);

  const handleClose = () => {
    closeDialog(false);
    reset({ firstName: "", lastName: "", age: 0, email: "", grade: "" });
  };
  const submit: SubmitHandler<IFormInputs> = async (value) => {
    if (action.includes("DELETE")) {
      closeDialog(true);
    } else {
      const grade = gradeList?.find((g) => g.id === value.grade);
      if (grade) {
        const st: Student = { ...value, grade };
        closeDialog(true, st);
        reset({ firstName: "", lastName: "", age: 0, email: "", grade: "" });
      }
    }
  };

  if (!modal) {
    throw new Error("Modal is not load");
  }
  return ReactDom.createPortal(
    <>
      <div
        className={`modalContainer ${visible ? "show" : ""} `}
        onClick={handleClose}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <header className="modal_header">
            <h2 className="modal_header-title">{title}</h2>
            <div className="close" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                  fill="black"
                />
              </svg>
            </div>
          </header>
          <main className="modal_content">
            {children === "FORM" ? (
              <FormStudent
                control={control}
                gradeList={gradeList}
                errors={errors}
              />
            ) : (
              children
            )}
          </main>
          <footer className="modal_footer">
            <Button className="btn-delete" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="btn-add" onClick={handleSubmit(submit)}>
              Accept
            </Button>
          </footer>
        </div>
      </div>
    </>,
    modal
  );
};

export default Modal;
