import React, { Component, useState } from 'react';
import SettingsService from '../../services/settings.service';

class SettingsController {

    settingServices = new SettingsService()

    constructor() {}


    getObjects = async () => {
        let datas = [];
        try {
            const itens = JSON.parse(localStorage.getItem('users'));
            if (itens !== null && itens !== undefined) return itens;
            const response = (await this.settingServices.get()).DATA;
            for (const data of response) {
                const element = {
                    id: data.id,
                    nome: data.name,
                    status: data.permission === 0 ? true : false,
                    email: data.email,
                    cargo: this._generateCargo(data.type),
                }
                datas.push(element)
            }
            const index = datas.findIndex(e => e.id === localStorage.getItem('id'))
            datas.splice(index, 1)
            localStorage.setItem('users', JSON.stringify(datas))
            return datas;
        } catch (error) {
            console.log(error)
            return []
        }
    }

    _generateCargo = (value) => {
        switch (value) {
            case 0:
                return 'Administrador';
            case 1:
                return 'Vendedor';
            default:
                return 'estoquista';
        }
    }

    createUser = async (name, email, type) => {
        const body = {
            name: name,
            email: email,
            type: type,
            permission: 0,
            adminUser: type === 0 ? true : false
        };
        await this.settingServices.register(body).then((e) => {
            alert('Usuário cadastrado com sucesso!')
        }).catch((e) => {
            console.log(e)
            alert('Ocorreu um erro ao cadastrar usuário')
        })
        return await this.getObjects2()
    }

    getObjects2 = async () => {
        let datas = [];
        try {
            const response = (await this.settingServices.get()).DATA;
            for (const data of response) {
                const element = {
                    id: data.id,
                    nome: data.name,
                    status: data.permission === 0 ? true : false,
                    email: data.email,
                    cargo: this._generateCargo(data.type),
                }
                datas.push(element)
            }
            const index = datas.findIndex(e => e.id === localStorage.getItem('id'))
            datas.splice(index, 1)
            localStorage.setItem('users', JSON.stringify(datas))
            return datas;
        } catch (error) {
            console.log(error)
            return []
        }
    }

    updateUser = async (permission, id) => {
        const body = {
            permission: permission,
        };
        await this.settingServices.update(body, id).catch((e) => {
            console.log(e)
            alert('Ocorreu um erro ao atualizar usuário')
        })
        return await this.getObjects2()
    }

}

export default SettingsController;

