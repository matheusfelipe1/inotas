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
                    status: data.permission,
                    email: data.email,
                    cargo: this._generateCargo(data.type),
                }
                datas.push(element)
            }
            localStorage.setItem('users', JSON.stringify(datas))
            return datas;
        } catch (error) {
            console.log(error)
            return []
        }
        return datas;
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

}

export default SettingsController;

