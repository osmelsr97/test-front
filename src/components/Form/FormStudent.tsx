import { Fragment, memo } from "react";
import { Grade } from "../../models/grade";
import { Student } from "../../models/student";
import InputText, { InputProps } from "../Input/Input";
import {
  FieldValues,
  FieldError,
  DeepMap,
  Controller,
  Control,
} from "react-hook-form";
import "./formStudent.scss";

interface Props {
  student?: Student;
  errors: DeepMap<FieldValues, FieldError>;
  gradeList?: Grade[];
  control: Control<FieldValues>;
}

const propertyFields: InputProps[] = [
  {
    label: "First Name",
    name: "firstName",
    placeholder: " Add firstName...",
    pattern: "[a-zA-Z]{10}",
    required: true,
  },
  {
    label: "Last Name",
    name: "lastName",
    placeholder: " Add lastName......",
    pattern: "[a-zA-Z]{10}",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    placeholder: " johndoe@gmail.com",
    pattern: "[a-zA-Z]{10}",
    required: true,
  },
  {
    label: "Age",
    name: "age",
    placeholder: " Add age...",
    maxLength: 3,
    min: 1,
    max: 100,
    required: true,
  },
];

const FormStudent = ({ errors, gradeList, control }: Props) => {
  const Field = ({ name, type, ...props }: InputProps) => {
    return (
      <Controller
        key={name}
        control={control}
        name={name!}
        render={({ field: { onBlur, onChange, value } }) => (
          <div className="field">
            <InputText
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors[name!] && (
              <span className="validation_error">{errors[name!].message}</span>
            )}
          </div>
        )}
      />
    );
  };

  return (
    <Fragment>
      {propertyFields.map((p) => Field(p))}
      <div className="field">
        <Controller
          control={control}
          name={"grade"}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <select
                className="classic"
                id="grade"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              >
                <option value="">Select grade</option>
                {gradeList?.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <span className="validation_error">
                  {errors.grade?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    </Fragment>
  );
};

export default memo(FormStudent);
