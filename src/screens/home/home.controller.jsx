import React, { Component, useState } from 'react';

class HomeController {

    constructor() {}


    getObjects = () => {
        let datas = [];
        for (let index = 0; index < 100; index++) {
            const data = {
                id: (Math.random() * 100).toFixed(0),
                idNota: index,
                status: this._generateStatus(),
                createAt: new Date().toISOString(),
                description: 'blablabla',
                reason: 'blablabla'
            }
            datas.push(data)
        }
        return datas;
    }

    _generateStatus = () => {
        const value = (Math.random() * 2).toFixed(0);
        return value;
    }

}

export default HomeController;

