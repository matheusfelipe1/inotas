import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from '../screens/login/loginScreen'
import Sidebar from "./sidebar/Sidebar";

function RoutesApp() {
    return (
        <Router>
            <Routes>
               <Route exact path="/" Component={(props) => <Login {...props} history={Router} />} /> 
               <Route path="/initial/*" Component={Sidebar} /> 
            </Routes>
        </Router>
    )
}

export default RoutesApp;