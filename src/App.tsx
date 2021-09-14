import React, { Fragment } from "react";
import "./index.scss";
import Dashboard from "./dashboard/Dashboard";
import StudentProvider from "./hooks/Student/StudentProvider";
import ModalProvider from "./hooks/Modal/ModalProvider";

function App() {
  return (
    <StudentProvider>
      <ModalProvider>
        <Fragment>
          <Dashboard />
        </Fragment>
      </ModalProvider>
    </StudentProvider>
  );
}

export default App;
