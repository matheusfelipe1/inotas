import React, { Component, useState } from 'react';

class SettingsController {

    constructor() {}


    getObjects = () => {
        let datas = [];
        for (let index = 0; index < 100; index++) {
            const data = {
                id: (Math.random() * 100).toFixed(0),
                nome: 'Matheus',
                status: this._generateStatus(),
                email: 'matheusteste@gmail.com',
                cargo: 'vendedor',
                reason: 'blablabla'
            }
            datas.push(data)
        }
        return datas;
    }

    _generateStatus = () => {
        const value = (Math.random() * 1).toFixed(0);
        return value === '1' ? true : false;
    }

}

export default SettingsController;

