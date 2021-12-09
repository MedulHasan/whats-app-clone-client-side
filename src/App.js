import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import ChatScreen from "./pages/Home/ChatScreen/ChatScreen";
import FriendScreen from "./pages/Home/FriendScreen/FriendScreen";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login/Login";
import PrivateRoute from "./pages/Login/PrivateRoute/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Navigate replace to='/home' />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/home'
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                >
                    <Route path='/home/' element={<ChatScreen />} />
                    <Route
                        path='/home/friendMessage'
                        element={<FriendScreen />}
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
