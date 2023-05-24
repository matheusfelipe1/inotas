import React, { useState, useEffect } from "react";
import { Sidebar } from 'primereact/sidebar'
import SideBarNavigation from "./SidebarNavigation";
import Navbar from "../navbar/NavBar";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'
import logo from '../../assets/images/invoice-receipt-svgrepo-com.svg'

import laudos from '../../assets/images/laudos.png'
import admin from '../../assets/images/ic_menu_empresas.png'
import config from '../../assets/images/ic_menu_usuarios_administrativos.png'
import sair from '../../assets/images/ic_menu_sair.png'

function SidebarComponent() {
    const [visible, setVisible] = useState(false)
    const navigation = useNavigate()
    const navigate = (path) => {
        navigation(path);
        setVisible(false)
    }
    return (
        <div className="sidebar-component">
            <Navbar />
            <SideBarNavigation />
            <Sidebar onMouseLeave={() => setVisible(false)} id="sidebarCompressed2" visible={visible}
                onHide={() => setVisible(false)} position="left"
                className="sidebar">
                <div className="header-nav">
                    <div className="nav-component">
                        <img className="img2" src={logo} />
                    </div>
                    <p className="inotas2">iNotas</p>
                </div>
                <div className="label-side" onClick={() => navigate('')}>
                    <img src={laudos} />
                    <p className="p">Solicitações e Pendências</p>
                </div>
                <div className="label-side" onClick={() => navigate('admin')}>
                    <img src={admin} />
                    <p className="p">Administrativo</p>
                </div>
                <div className="label-side" onClick={() => navigate('settings')}>
                    <img src={config} />
                    <p className="p">Configurações</p>
                </div>
                <div className="label-side"onClick={() => {navigate('/'); localStorage.clear()}} >
                    <img src={sair} />
                    <p className="p">Sair</p>
                </div>
            </Sidebar>
            {!visible ?
                <div className='sidebarCompressed' onMouseOver={() => setVisible(true)}>
                    <div className="header-nav"></div>
                    <div className="label-side-compressed">
                        <img src={laudos} />
                    </div>
                    <div className="label-side-compressed">
                        <img src={admin} />
                    </div>
                    <div className="label-side-compressed">
                        <img src={config} />
                    </div>
                    <div className="label-side-compressed">
                        <img src={sair} />
                    </div>
                </div> : <div></div>
            }
        </div>

    )
}

export default SidebarComponent