import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import NotFound from "./Components/NotFound";
import DashBoard from "./Components/DashBoard";
import DetailsForm from "./Components/DetailsForm";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard/*" element={<DashBoard />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/detailsForm" element={<DetailsForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </>
  );
}
