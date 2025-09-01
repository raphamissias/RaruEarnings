import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            {/* <Route path="/" element={<CustomersPage />}/>
            <Route path="/" element={<TasksPage />}/> */}
        </Routes>
    )
}