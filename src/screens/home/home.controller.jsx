import React, { Component, useState } from 'react';
import FilesService from '../../services/files.service';
import * as FileSaver from 'file-saver'
import * as XLSX from 'sheetjs-style'

class HomeController {

    constructor() {}
    file_service = new FilesService()

    getObjects = async () => {
        const values = localStorage.getItem('listInvoices')
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
            localStorage.setItem('listInvoices', JSON.stringify(list))
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
            localStorage.setItem('listInvoices', JSON.stringify(list))
            localStorage.setItem('listInvoicesUp', JSON.stringify(list))
            return list
        } catch (error) {
            console.log(error)
            return []
        }
    }

    saveStorage = async (base64, name, description) => {
        const body = {
            base64: base64,
            ext: 'pdf',
            mimetype: 'application/pdf',
            name: name.split('.')[0] + new Date().getMilliseconds().toString()
        }
        await this.file_service.post(body).then(async(result) => {
            const newBody = {
                path: result.DATA,
                createAt: new Date(),
                status: 'Aguardando',
                description: description,
                reason: ''
            }
            await this.file_service.postInvoice(newBody)
            alert('Nota cadastrada com sucesso!')
        }).catch((err) => {
            console.log(err)
            alert('Ocorreu um erro ao tentar cadastrar nota')
            
        })
    }

    generateXLSX = async (data) => {
        const list = [...data.map(value => {
            return {
                "id": value.id,
                "Status da nota": value.status,
                "Data de criação": value.createAt,
                "Descrição": value.description,
                "Motivo contestação": value.reason,
            }
        })]
        const ws = XLSX.utils.json_to_sheet(list)
        const wb = { Sheets: {'data': ws}, SheetNames: ['data'] }
        const excelBuffer = await XLSX.write(wb, { bookType:'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], { type: 'text/csv'})
        FileSaver.saveAs(blob, 'relatorio.csv')
    }

}

export default HomeController;

