import React from "react";
import useModal from "../../hooks/Modal/hook/useModal";
import Button from "../Button/Button";
import "./header.scss";

interface IProps {
  removeStudents: () => void;
}

const Header = ({ removeStudents }: IProps) => {
  const { openDialog } = useModal();
  const handleRemove = () => removeStudents();
  const handleDialogCreate = () => openDialog("CREATE");

  return (
    <div className="table-header">
      <div className="header">
        <div className="headerColumns">
          <h2 className="title">Manage Student</h2>
        </div>
        <div className="headerColumns">
          <Button
            className="btn-delete"
            iconClass="fa fa-minus-circle"
            onClick={handleRemove}
          >
            Delete All Students
          </Button>
          <Button
            className="btn-add"
            iconClass="fa fa-plus-circle"
            onClick={handleDialogCreate}
          >
            Add New Student
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Header;
