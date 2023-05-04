import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeScreen from "../../screens/home/home.screen";
import Admin from "../../screens/admin/admin.screen";
import Settings from "../../screens/settings/settings.screen";

function SideBarNavigation() {
    return (
        <Routes>
            <Route exact path="/" Component={(props) => <HomeScreen {...props} history={Router} />} /> 
            <Route path="/admin" Component={(props) => <Admin {...props} history={Router} />} /> 
            <Route path="/settings" Component={(props) => <Settings {...props} history={Router} />} /> 
        </Routes>
    )
}

export default SideBarNavigation