import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CustomerPage from "../pages/CustomerPage";
import TaskPage from "../pages/TaskPage";

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/tasks" element={<TaskPage />} />
        </Routes>
    )
}