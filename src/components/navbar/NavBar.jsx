import React from "react";
import './NavBar.css'
import logo from '../../assets/images/invoice-receipt-svgrepo-com.svg'

function Navbar() {
    return (
        <div className="nav">
            <div className="nav-component">
                <img className="img" src={logo} />
            </div>
            <p className="inotas">iNotas</p>
        </div>
    )
}

export default Navbar