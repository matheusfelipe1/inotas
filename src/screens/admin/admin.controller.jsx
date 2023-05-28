import React, { Component, useState } from 'react';
import FilesService from '../../services/files.service';

class AdminController {

    constructor() {}


    file_service = new FilesService()

    getObjects = async () => {
        const values = localStorage.getItem('listInvoicesUp')
        let list = [];
        if (values !== null) {
            list = JSON.parse(values)
        }
        if (list.length) return list;
        try {
            const newDatas = (await this.file_service.getList()).DATA;
            
            for (const value of newDatas) {
                list.push({
                    id: value.id,
                    idNota: value.id,
                    status: Number(value.status),
                    createAt: new Date(value.createAt['_seconds'] * 1000).toISOString(),
                    description: value.description,
                    reason: value.reason,
                    path: value.path
                })
            }
            localStorage.setItem('listInvoicesUp', JSON.stringify(list))
            
            return list
        } catch (error) {
            console.log(error)
            return []
        }
    }

    getObjects2 = async () => {
        let list = [];
        try {
            const newDatas = (await this.file_service.getList()).DATA;
            
            for (const value of newDatas) {
                list.push({
                    id: value.id,
                    idNota: value.id,
                    status: Number(value.status),
                    createAt: new Date(value.createAt['_seconds'] * 1000).toISOString(),
                    description: value.description,
                    reason: value.reason,
                    path: value.path
                })
            }
            localStorage.setItem('listInvoicesUp', JSON.stringify(list))
            localStorage.setItem('listInvoices', JSON.stringify(list))
            return list
        } catch (error) {
            console.log(error)
            return []
        }
    }

    approveOrNot = async (id, status, reason) => {
        const body = {
            param: status,
            reason: reason
        }
        await this.file_service.update(id, body).then((result) => {
            alert('Nota fiscal atualizada com sucesso!')
        }).catch((err) => {
            console.log(err)
            alert('Ocorreu um erro ao tentar atualizar a nota')
        })
    }

}

export default AdminController;

