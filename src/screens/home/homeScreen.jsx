import React, { Component, useState } from 'react';
import './home.css'
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import HomeController from './homeController';
import 'primeicons/primeicons.css';
import Dictionary from '../../shared/dictionary';

import { InputTextarea } from 'primereact/inputtextarea';
        
import { Dialog } from 'primereact/dialog';
        
import { FileUpload } from 'primereact/fileupload';
        

export default class HomeScreen extends Component {
    controller = new HomeController();
    dictionary = new Dictionary()
    state = {
        datas: [],
        visible: false
    }
    componentDidMount = () => {
        this.setState({
            datas: this.controller.getObjects()
        })
    }
    render() {
        let bodyStatus = (e) => {
            switch (Number(e)) {
                case 0:
                    return (<div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <i className="pi pi-clock" style={{ color: 'orange' }}></i>
                        <p style={{ marginLeft: '0.5rem' }}>Pendente</p>
                    </div>)
                case 1:
                    return (<div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <i className="pi pi-check" style={{ color: 'green' }}></i>
                        <p style={{ marginLeft: '0.5rem' }}>Confirmada</p>
                    </div>)
                default:
                    return (<div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <i className="pi pi-times" style={{ color: 'red' }}></i>
                        <p style={{ marginLeft: '0.5rem' }}>Cancelada</p>
                    </div>)
            }
        }

        let bodyDates = e => {
            return (<div>{this.dictionary.formattedDates(e)}</div>)
        }
        return (
            <div className='table'>
                <Card>
                    <div className='elements'>
                        <div className='elements1'>
                            <div className='card2'>
                                <p style={{color: 'white', marginLeft: '1rem'}}>Pendentes</p>
                                <p style={{color: 'white', marginLeft: '1rem'}}>56</p>
                            </div>
                        </div>
                        <div className='acoes'>
                            <Button label='Adicionar' icon='pi pi-plus' onClick={() => this.setState({visible: true})} ></Button>
                            <Button style={{ backgroundColor: 'green', borderBlockColor: 'green', marginLeft: '0.5rem' }} label='Exportar' icon='pi pi-file-excel' ></Button>
                        </div>
                    </div>
                    <DataTable scrollable scrollHeight="35rem"
                        paginator={true} rows={7} value={this.state.datas} tableStyle={{ maxWidth: '100rem', minWidth: '90rem' }}>
                        <Column field="idNota" sortable header="Nota" filter filterPlaceholder="Informe o parametro" ></Column>
                        <Column field="createAt" sortable header="Data" filter filterPlaceholder="Informe o parametro" body={(e) => bodyDates(e.createAt)}></Column>
                        <Column field="status" sortable header="Status" filter filterPlaceholder="Informe o parametro" body={(e) => bodyStatus(e.status)} ></Column>
                        <Column field="description" sortable header="Descrição" filter filterPlaceholder="Informe o parametro" ></Column>
                        <Column field="reason" sortable header="Contestamento" filter filterPlaceholder="Informe o parametro"></Column>
                    </DataTable>
                </Card>
                <Dialog header='Adicionar nota' style={{ width: '50vw', height: '60vh' }}
                visible={this.state.visible} onHide={(e) => this.setState({visible: false})}>
                    <FileUpload accept='.pdf' style={{width: '55rem', marginBottom: '2rem'}}
                    cancelLabel='Cancelar' uploadLabel='Enviar' chooseLabel='Buscar' 
                    cancelOptions={{style: {backgroundColor: 'red', borderColor: 'red'}}}
                    uploadOptions={{style: {backgroundColor: 'green', borderColor: 'green'}}}></FileUpload>
                    <InputTextarea cols={100} rows={6} placeholder='Informe a descrição da nota'></InputTextarea>
                </Dialog>
            </div>
        )
    }
}