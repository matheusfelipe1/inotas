import React, { useState } from 'react';
import './login.styles.css'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import invoice from '../../assets/images/invoice-receipt-svgrepo-com.svg'
import LoginController from './login.controller';

function LoginScreen(props) {

    let [loading, loadingState] = useState(false);
    let [email, emailState] = useState('');
    let [senha, senhaState] = useState('');

    const controller = new LoginController();
    return (
        <div className='bodyLogin'>
            <div className='bodyOpacity'></div>
            <div className='content'>
                <Card className='card'>
                    <div className='inside-card'>
                        <div className='inside-card-component'>
                            <div className='component-inside'>
                                <img src={invoice} style={{ width: '6rem', height: '6rem' }} />
                                <p className='nameCard'>iNotas</p>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user" />
                                    <InputText placeholder="Informe seu e-mail" className='input' onChange={(e) => emailState(e.target.value)} />
                                </span>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-lock" />
                                    <InputText placeholder="Informe sua senha" className='input' onChange={(e) => senhaState(e.target.value)} />
                                </span>
                                <Button label='Entrar' className='button' onClick={async () => {
                                    if (email !== '' && senha !== '') {
                                        loadingState(true)
                                        await controller.doLogin(email, senha);
                                        loadingState(false)
                                    } else {
                                        alert('Campos obrigatórios')
                                    }
                                }} />
                                <p>Recuperar senha</p>
                                <p>Primeira vez aqui? <strong>Cadastre-se</strong></p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            {loading ?
                <div className='loading'>
                    <ProgressSpinner />
                </div> : <div></div>
            }
        </div>
    )
}

export default LoginScreen;