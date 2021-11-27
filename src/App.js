import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login/Login";
import PrivateRoute from "./pages/Login/PrivateRoute/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Navigate replace to='/login' />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/home'
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
