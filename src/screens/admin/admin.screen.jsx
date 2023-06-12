import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import Dictionary from '../../shared/dictionary';
import { InputTextarea } from 'primereact/inputtextarea';

import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import AdminController from "./admin.controller";

class Admin extends Component {
    controller = new AdminController();
    dictionary = new Dictionary()
    state = {
        datas: [],
        loading: false,
        visible: false,
        pendentes: 0,
        reason: '',
        detail: {}
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
            return (<div onClick={(e) => this.setState({ visible: true, detail : val, reason: val.reason })}>
                <i className="pi pi-info-circle" style={{ fontSize: '1.2rem' }}></i>
            </div>)
        }
        return (
            <div className='table'>
                <Card className="card-table">
                    <div className='elements'>
                        <div className='elements1'>
                            <div className='card2'>
                                <p style={{ color: 'white', marginLeft: '1rem' }}>Pendentes</p>
                                <p style={{ color: 'white', marginLeft: '1rem' }}>{this.state.pendentes}</p>
                            </div>
                        </div>
                        <div className='acoes'>
                        </div>
                    </div>
                    <DataTable scrollable scrollHeight="35rem"
                        paginator={true} rows={7} value={this.state.datas} tableStyle={{ maxWidth: '100rem'}}>
                        <Column field="idNota" sortable header="Nota" filter filterPlaceholder="Informe o parametro"  ></Column>
                        <Column field="createAt" sortable header="Data" body={(e) => bodyDates(e.createAt)}></Column>
                        <Column field="status" sortable header="Status" body={(e) => bodyStatus(e.status)} ></Column>
                        <Column field="description" sortable header="Descrição" filter filterPlaceholder="Informe o parametro" ></Column>
                        <Column field="reason" sortable header="Contestamento" filter filterPlaceholder="Informe o parametro"></Column>
                        <Column field="action" header="" body={(e) => details(e)} ></Column>
                    </DataTable>
                </Card>
                <Dialog header='Detalhes da nota' style={{ width: '70vw', height: '100vh' }}
                    visible={this.state.visible} onHide={(e) => this.setState({ visible: false, reason: '' })}>
                    <iframe width="100%" height="500" src={this.state.detail.path} type="application/pdf">   </iframe>
                    <InputTextarea disabled={this.state.detail.status} cols={150} rows={6} placeholder='Informe a razão se caso for contestação'
                        value={this.state.reason}
                        onChange={e => {
                        this.setState({
                            reason: e.target.value
                        })
                    }}></InputTextarea>
                    <div className='acoes'>
                        <Button disabled={this.state.detail.status}
                        onClickCapture={async (e) => {
                            this.setState({
                                loading: true,
                                visible: false
                            })
                            await this.controller.approveOrNot(this.state.detail.id, 1, this.state.reason);
                            this.setState({
                                datas: await this.controller.getObjects2(),
                                loading: false,
                                visible: false
                            })
                        }}
                        style={{ backgroundColor: 'green', borderBlockColor: 'green', marginLeft: '0.5rem' }} label='Confirmar' icon='pi pi-check' onClick={() => this.setState({ visible: true })} ></Button>
                        <Button 
                            onClickCapture={async (e) => {
                                this.setState({
                                    loading: true,
                                    visible: false
                                })
                                await this.controller.approveOrNot(this.state.detail.id, 2, this.state.reason);
                                this.setState({
                                    datas: await this.controller.getObjects2(),
                                    loading: false,
                                    visible: false
                                })
                            }}
                            disabled={this.state.detail.status} style={{ backgroundColor: 'red', borderBlockColor: 'red', marginLeft: '0.5rem' }} label='Contestar' icon='pi pi-times' ></Button>
                    </div>
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
export default Admin