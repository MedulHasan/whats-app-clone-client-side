import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login/Login";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate replace to='/login' />}
                    />
                </Routes>
                <Routes>
                    <Route path='/login' element={<Login />} />
                </Routes>
                <Routes>
                    <Route path='/home' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
