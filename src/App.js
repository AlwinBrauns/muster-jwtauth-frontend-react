import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {UserService} from "./user/useUser";

export const MainRoutes = {
    home: {
        path: "/",
        element: <Home />
    },
    dashboard: {
        path: "/dashboard",
        element: <Dashboard/>,
        canActivate: ()=>{
            if(UserService.getAuthentication()){
                return true
            }else {
                
                return false
            }
        }
    },
    login: {
        path: "/login",
        element: <Login/>
    },
    register: {
        path: "/register",
        element: <Register/>
    }
}

function App() {
    return (
    <BrowserRouter>
        <Header />
        <Routes>
            {
                Object.values(MainRoutes).map(({path, element, canActivate = ()=>true}, index)=> {
                        if(canActivate()) {
                            return <Route key={index} path={path} element={element}/>
                        }
                    }
                )
            }
            <Route path={"/*"} element={<PageNotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
