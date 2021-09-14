import React, { useEffect, useState } from "react";

import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons/";

import useManagerStudent from "../hooks/Student/hook/useManagerStudent";
import { COLUMNS } from "../utils/constants";
import { Student } from "../models/student";
import "./dashboard.scss";
import Header from "../components/Header/Header";
import useModal from "../hooks/Modal/hook/useModal";

const Dashboard = () => {
  const { getStudents, students } = useManagerStudent();
  const { openDialog } = useModal();
  const [studentsSelected, setStudentsSelected] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const handleDialogUpdate = (student: Student) =>
    openDialog("UPDATE", student);
  const handleDialogDelete = (student?: Student) => {
    let ids: string[] = [];
    if (!students) {
      alert("Students not found");
    } else {
      if (!student && !studentsSelected.length) {
        ids = students.map((st) => st.id!);
      } else {
        ids = student ? [student.id!] : studentsSelected;
      }
      openDialog(ids.length > 1 ? "DELETE_ALL" : "DELETE", undefined, ids);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getStudents(), []);

  const handleSelect = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    setStudentsSelected([...studentsSelected, value]);
    if (!checked) {
      setStudentsSelected(studentsSelected.filter((item) => item !== value));
    }
  };

  const handleSelectAll = (e: React.FormEvent<HTMLInputElement>) => {
    setIsCheckAll(!isCheckAll);
    if (students) {
      setStudentsSelected(students.map((st) => st.id!));
    }
    if (isCheckAll) {
      setStudentsSelected([]);
    }
  };

  return (
    <div className="table-wrapper">
      <Header removeStudents={handleDialogDelete} />
      <table className="table table-responsive-sm">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                value="selectAll"
                name="selectAll"
                onChange={(e) => {}}
                onClick={handleSelectAll}
                checked={isCheckAll}
              />
            </th>
            {COLUMNS.map((name) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        {students && (
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <input
                    type="checkbox"
                    value={student.id}
                    name={student.firstName}
                    onChange={(e) => {}}
                    onClick={handleSelect}
                    checked={studentsSelected.includes(student.id!)}
                  />
                </td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.grade.name}</td>
                <td>
                  <div className="actions ">
                    <EditIcon
                      className="btn-edit"
                      onClick={() => handleDialogUpdate(student)}
                      htmlColor="orange"
                    />
                    <DeleteIcon
                      className="btn-edit"
                      onClick={() => handleDialogDelete(student)}
                      htmlColor="red"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Dashboard;
