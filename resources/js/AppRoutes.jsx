import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Penduduk from "./Pages/Backend/Penduduk/Penduduk";
import NotFound from "./components/404/NotFound";
import Authentication from "./Pages/Auth/Authentication";
import { AuthProvider, useAuth } from "./Pages/Auth/AuthContext";
import PrivateRoutes from "./Pages/Auth/PrivateRoutes";
import FrontHome from "./Pages/Frontend/FrontHome.jsx";
import Dashboard from "./Pages/Backend/Dashboard/Dashboard.jsx";
import Template from "./Pages/Frontend/Template.jsx";
import Home from "./Pages/Backend/Dashboard/Home/Home.jsx";
import Book from "./Pages/Backend/Book/Book.jsx";
import Category from "./Pages/Backend/Category/Category.jsx";
import Seminar from "./Pages/Backend/Seminar/Seminar.jsx";
import SeminarDetail from "./Pages/Frontend/Seminar/SeminarDetail.jsx";
import SeminarCheckout from "./Pages/Frontend/Seminar/SeminarCheckout.jsx";
import MySeminar from "./Pages/Frontend/Seminar/MySeminar.jsx";
import Users from "./Pages/Backend/Users/Users.jsx";
import MyProfile from "./Pages/Frontend/MyProfile/MyProfile.jsx";
import PrintTicket from "./Pages/Frontend/Seminar/PrintTicket.jsx";
import VerifyEmail from "./Pages/Auth/VerifyEmail.jsx";

const ProtectedRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                {user?.role === "admin" ? (
                    <Route element={<Dashboard />}>
                        <>
                            <Route path="/dashboard" element={<Home />} />
                            <Route path="/penduduk" element={<Penduduk />} />
                            <Route path="/book" element={<Book />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/seminar" element={<Seminar />} />
                            <Route path="/users" element={<Users />} />
                        </>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                ) : (
                    <Route element={<Template />}>
                        <Route path="/sd/:id" element={<SeminarDetail />} />
                        <Route path="/sco/:id" element={<SeminarCheckout />} />
                        <Route
                            path="/myseminar/:id"
                            element={<MySeminar userId={user?.id} />}
                        />
                        <Route path="/myprofile/:id" element={<MyProfile />} />
                    </Route>
                )}
            </Route>
            <Route path="/login" element={<Authentication />} />
            <Route path="/print-ticket/:id" element={<PrintTicket />} />
            <Route path="/verify-email/:id/:token" element={<VerifyEmail />} />
            <Route path="/" element={<Template />}>
                <Route index element={<FrontHome />} />
            </Route>
        </Routes>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <ProtectedRoutes />
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
