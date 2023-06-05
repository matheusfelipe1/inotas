import { useNavigate } from "react-router-dom";
import LoginService from "../../services/login.service";

export default class LoginController {

    loginService = new LoginService();

    navigate = useNavigate();

    doLogin = async (email, senha) => {
        const body = {
            "email": email.trim(),
            "password": senha.trim()
        };
        await this.loginService.post(body).then((resp) => {
            const data = resp.DATA.user;
            localStorage.setItem('id', data.uid)
            localStorage.setItem('user', JSON.stringify(resp.DATA.userFirestore))
            localStorage.setItem('token', data.stsTokenManager.accessToken)
            localStorage.setItem('refreshToken', data.stsTokenManager.refreshToken);
            this.navigate('/initial');
        }).catch((error) => {
            console.log(error);
            alert('Ocorreu um erro ao tentar efetuar o login')
        })
    } 

    createAuthUser = async (email, senha, confirmSenha) => {
        let valid = false
        if (confirmSenha === senha) {
            const body = {
                email: email,
                password: senha
            }
            await this.loginService.postCreate(body).then((e) => {
                alert('Cadastro finalizado com sucesso!')
                valid = true
            }).catch((e) => {
                console.log(e)
                alert('Ocorreu um erro ao tentar finalizar o cadastro')
            })
        } else {
            alert('As senha não coincidem')
        }
        return valid
    }
}