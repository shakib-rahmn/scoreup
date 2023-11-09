import { Route, Routes } from "react-router-dom";
import StudentTable from "../components/StudentTable";
import EditForm from "../components/EditForm";

const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/:id" element={<EditForm />} />
      </Routes>
    </>
  );
};

export default Dashboard;
