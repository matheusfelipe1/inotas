import react, { Component } from 'react'
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import Dictionary from '../../shared/dictionary';
import { InputTextarea } from 'primereact/inputtextarea';

import { RadioButton } from 'primereact/radiobutton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ToggleButton } from 'primereact/togglebutton';

import { InputSwitch } from 'primereact/inputswitch';
        

import { Dialog } from 'primereact/dialog';
import SettingsController from './settings.controller';

export default class SettingsScreen extends Component {
    controller = new SettingsController();
    dictionary = new Dictionary()
    state = {
        datas: [],
        visible: false,
        loading: false,
        checked: undefined,
        type: 0,
        name: '',
        email: ''

    }
    componentDidMount = async () => {
        this.setState({
            loading: true,
            datas: await this.controller.getObjects()
        })
        this.setState({loading: false})
    }
    render() {
        let bodyStatus = (e) => {
            return (<div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <InputSwitch checked={e.status} onChange={async(el) => {
                    const list = [...this.state.datas]
                    list.map(a => {
                        if (a.id === e.id) a.status = el.value
                    })
                    this.setState({
                        datas: list
                    })
                    const data = await this.controller.updateUser(el.value ? 0 : 1, e.id);
                    this.setState({
                        datas: data
                    })
                }} />
            </div>)

        }

        return (
            <div className='table'>
                <Card className='card-table'>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end', marginBottom: '0.5rem'}}>
                       <Button label='Adicionar novo usuário' icon='pi pi-plus' onClick={(e) => this.setState({ visible: true, checked: undefined })} /> 
                    </div>
                    <DataTable scrollable scrollHeight="35rem"
                        paginator={true} rows={7} value={this.state.datas} tableStyle={{ maxWidth: '100rem'}}>
                        <Column field="nome" sortable header="Nome" ></Column>
                        <Column field="email" sortable header="E-mail" ></Column>
                        <Column field="cargo" sortable header="Ocupação"  ></Column>
                        <Column field="status" sortable header="Ativo" body={(e) => bodyStatus(e)} ></Column>
                    </DataTable>
                </Card>
                <Dialog header='Cadastrar usuário' style={{ width: '30vw'}}
                    visible={this.state.visible} onHide={(e) => this.setState({ visible: false, checked: undefined })}>
                    <InputTextarea autoResize={false} cols={58} rows={1} placeholder='Informe seu nome' onChange={(e) => this.setState({name: e.target.value})}></InputTextarea>
                    <InputTextarea autoResize={false} cols={58} rows={1} placeholder='Informe seu e-mail' onChange={(e) => this.setState({email: e.target.value})}></InputTextarea>
                    <div  style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1.5rem', marginBottom: '1.5rem'}}>
                        <div className="flex align-items-center">
                            <RadioButton inputId="ingredient1" name="pizza" value="Vendedor" onChange={(e) => this.setState({checked: 'Vendedor', type: 1})} checked={this.state.checked === 'Vendedor'} />
                            <label style={{marginLeft: '0.5rem'}} htmlFor="ingredient1" className="ml-2">Vendedor</label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton inputId="ingredient2" name="pizza" value="Estoquista" onChange={(e) => this.setState({checked: 'Estoquista', type: 2})} checked={this.state.checked === 'Estoquista'}  />
                            <label style={{marginLeft: '0.5rem'}}  htmlFor="ingredient2" className="ml-2">Estoquista</label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton inputId="ingredient3" name="pizza" value="Administrador" onChange={(e) => this.setState({checked: 'Administrador', type: 0})} checked={this.state.checked === 'Administrador'} />
                            <label style={{marginLeft: '0.5rem'}}  htmlFor="ingredient3" className="ml-2">Administrador</label>
                        </div>
                    </div>
                    <div className='acoes'>
                        <Button style={{ backgroundColor: 'red', borderBlockColor: 'red', marginLeft: '0.5rem' }} label='Cancelar' icon='pi pi-times' onClick={() => this.setState({visible: false})} ></Button>
                        <Button style={{ backgroundColor: 'green', borderBlockColor: 'green', marginLeft: '0.5rem' }} label='Cadastrar' icon='pi pi-plus' onClick={async() => {
                            this.setState({loading: true, visible: false})
                            const datas = await this.controller.createUser(this.state.name, this.state.email, this.state.type)
                            this.setState({loading: false, datas: datas})
                        }} ></Button>
                    </div>
                </Dialog>
                 {this.state.loading ?
                <div className='loading'>
                    <ProgressSpinner />
                </div> : <div></div>}
            </div>
        )
    }
}