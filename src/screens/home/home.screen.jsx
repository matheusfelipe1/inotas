import React, { Component, useState } from 'react';
import './home.css'
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import HomeController from './home.controller';
import 'primeicons/primeicons.css';
import Dictionary from '../../shared/dictionary';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputTextarea } from 'primereact/inputtextarea';
        
import { Dialog } from 'primereact/dialog';
        
import { FileUpload } from 'primereact/fileupload';
        

export default class HomeScreen extends Component {
    controller = new HomeController();
    dictionary = new Dictionary()
    state = {
        datas: [],
        pendentes: 0,
        visible: false,
        details: false,
        canUpload: true,
        loading: false,
        data: {},
        path: '',
        description: ''
    }
    componentDidMount = async () => {
        this.setState({
            loading: true
        })
        const values = await this.controller.getObjects()
        this.setState({
            datas: values,
            loading: false
        })
        const number = values.filter(e=> e.status === 0).length
        this.setState({
            pendentes: number
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
        let details = val => {
            return (<div onClick={(e) => this.setState({details: true, path: val.path, data: val})}>
                <i className="pi pi-info-circle" style={{ fontSize: '1.2rem' }}></i>
            </div>)
        }
        return (
            <div className='table'>
                <Card>
                    <div className='elements'>
                        <div className='elements1'>
                            <div className='card2'>
                                <p style={{color: 'white', marginLeft: '1rem'}}>Pendentes</p>
                                <p style={{color: 'white', marginLeft: '1rem'}}>{this.state.pendentes}</p>
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
                        <Column field="action" header="" body={(e) => details(e)} ></Column>
                    </DataTable>
                </Card>
                <Dialog header='Adicionar nota' style={{ width: '50vw', height: '60vh' }}
                visible={this.state.visible} onHide={(e) => this.setState({visible: false})}>
                    <FileUpload accept='.pdf' style={{width: '55rem', marginBottom: '2rem'}}
                    cancelLabel='Cancelar' uploadLabel='Enviar' chooseLabel='Buscar' 
                    cancelOptions={{style: {backgroundColor: 'red', borderColor: 'red'}}}
                    disabled={this.state.canUpload}
                    uploadHandler={async(e) => {
                        const file = e.files[0]
                        const reader = new FileReader()
                        reader.onload = async (result) => {
                            const value = result.target.result.replace('data:application/pdf;base64,','');
                            this.setState({
                                visible: false,
                                loading: true
                            })
                            await this.controller.saveStorage(value, file.name, this.state.description)
                            this.setState({
                                datas: await this.controller.getObjects2(),
                                loading: false,
                            })
                        }
                        reader.readAsDataURL(file)
                    }}
                    customUpload={true}
                    uploadOptions={{style: {backgroundColor: 'green', borderColor: 'green'}}}></FileUpload>
                    <InputTextarea cols={100} rows={6} placeholder='Informe a descrição da nota'
                    onChange={(e) => {
                        if (e.target.value !== null && e.target.value !== '') {
                            this.setState({
                                canUpload: false,
                                description: e.target.value
                            })
                        } else {
                            this.setState({
                                canUpload: true,
                                description: e.target.value
                            })
                        }
                    }}
                    ></InputTextarea>
                </Dialog>
                <Dialog header='Detalhes da nota' style={{ width: '70vw', height: '100vh' }}
                    visible={this.state.details} onHide={(e) => this.setState({ details: false })}>
                    <iframe width="100%" height="500" src={this.state.path} type="application/pdf">   </iframe>
                    <InputTextarea cols={150} rows={6} placeholder={this.state.data.reason}></InputTextarea>
                </Dialog>
                {this.state.loading ?
                <div className='loading'>
                    <ProgressSpinner />
                </div> : <div></div>
            }
            </div>
        )
    }
}