import react, { Component } from 'react'
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import Dictionary from '../../shared/dictionary';
import { InputTextarea } from 'primereact/inputtextarea';

import { ToggleButton } from 'primereact/togglebutton';

import { Dialog } from 'primereact/dialog';
import SettingsController from './settings.controller';

export default class SettingsScreen extends Component {
    controller = new SettingsController();
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
            return (<div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <ToggleButton onLabel="Ativar" offLabel="Desativar" onIcon="pi pi-check" offIcon="pi pi-times"
                    checked={e} onChange={(event) => console.log(e)} />
            </div>)

        }

        return (
            <div className='table'>
                <Card>
                    <DataTable scrollable scrollHeight="35rem"
                        paginator={true} rows={7} value={this.state.datas} tableStyle={{ maxWidth: '100rem', minWidth: '90rem' }}>
                        <Column field="nome" sortable header="Nome" ></Column>
                        <Column field="email" sortable header="E-mail" ></Column>
                        <Column field="cargo" sortable header="Ocupação"  ></Column>
                        <Column field="status" sortable header="Ativo" body={(e) => bodyStatus(e.status)} ></Column>
                    </DataTable>
                </Card>
                <Dialog header='Detalhes da nota' style={{ width: '70vw', height: '100vh' }}
                    visible={this.state.visible} onHide={(e) => this.setState({ visible: false })}>
                    <object width="100%" height="500" data="http://www.africau.edu/images/default/sample.pdf" type="application/pdf">   </object>
                    <InputTextarea cols={150} rows={6} placeholder='Informe a descrição da nota'></InputTextarea>
                    <div className='acoes'>
                        <Button style={{ backgroundColor: 'green', borderBlockColor: 'green', marginLeft: '0.5rem' }} label='Confirmar' icon='pi pi-check' onClick={() => this.setState({ visible: true })} ></Button>
                        <Button style={{ backgroundColor: 'red', borderBlockColor: 'red', marginLeft: '0.5rem' }} label='Contestar' icon='pi pi-times' ></Button>
                    </div>
                </Dialog>
            </div>
        )
    }
}