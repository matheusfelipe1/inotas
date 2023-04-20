import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeScreen from "../../screens/home/homeScreen";
import Admin from "../../screens/admin/Admin";

function SideBarNavigation() {
    return (
        <Routes>
            <Route exact path="/" Component={(props) => <HomeScreen {...props} history={Router} />} /> 
            <Route path="/admin" Component={(props) => <Admin {...props} history={Router} />} /> 
        </Routes>
    )
}

export default SideBarNavigation