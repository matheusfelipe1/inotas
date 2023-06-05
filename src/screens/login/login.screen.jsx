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
    let [register, registerState] = useState(false);
    let [email, emailState] = useState('');
    let [senha, senhaState] = useState('');
    let [confirSenha, confirSenhaState] = useState('');

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
                                { !register ? <div>
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
                                </div> : <div>
                                <span className="p-input-icon-left">
                                        <i className="pi pi-user" />
                                        <InputText placeholder="Informe seu e-mail" className='input' onChange={(e) => emailState(e.target.value)} />
                                    </span>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-lock" />
                                        <InputText placeholder="Informe sua senha" className='input' onChange={(e) => senhaState(e.target.value)} />
                                    </span>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-lock" />
                                        <InputText placeholder="Confirme sua senha" className='input' onChange={(e) => confirSenhaState(e.target.value)} />
                                    </span>
                                    <Button label='Cadastrar' className='button' onClick={async () => {
                                        if (email !== '' && senha !== '') {
                                            loadingState(true)
                                            const valid = await controller.createAuthUser(email, senha, confirSenha);
                                            loadingState(false)
                                            if (valid) registerState(false)
                                        } else {
                                            alert('Campos obrigatórios')
                                        }
                                    }} />
                                    </div>}
                                { !register ? <div onClick={() => registerState(true)}>
                                    <p>Primeira vez aqui? <strong>Cadastre-se</strong></p>
                                </div> : <div onClick={() => registerState(false)}>
                                    <p><i className='pi pi-arrow-left'></i> Voltar</p>
                                </div>  }
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