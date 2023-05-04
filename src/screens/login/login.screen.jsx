import React, { useState } from 'react';
import './login.styles.css'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';

import invoice from '../../assets/images/invoice-receipt-svgrepo-com.svg'

function LoginScreen(props) {
    let [loading, loadingState] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => navigate('/initial');
    return (
        <div className='bodyLogin'>
            <div className='bodyOpacity'></div>
            <div className='content'>
                <Card className='card'>
                    <div className='inside-card'>
                        <div className='inside-card-component'>
                            <div className='component-inside'>
                                <img src={invoice} style={{width: '6rem', height: '6rem'}}  />
                                <p className='nameCard'>iNotas</p>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user" />
                                    <InputText placeholder="Informe seu e-mail" className='input' />
                                </span>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-lock" />
                                    <InputText placeholder="Informe sua senha" className='input' />
                                </span>
                                <Button label='Entrar' className='button' onClick={() => {
                                    loadingState(true)
                                    setTimeout(() => {
                                        handleClick()
                                    },2000)
                                }} />
                                <p>Recuperar senha</p>
                                <p>Primeira vez aqui? <strong>Cadastre-se</strong></p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            { loading ? 
                <div className='loading'>                                   
                    <ProgressSpinner />
                </div> : <div></div>
            }
        </div>
    )
}

export default LoginScreen;