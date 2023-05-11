import { useContext } from 'react'
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'
import Title from '../../components/Title'
import './dashboard.css'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '/node_modules/primeflex/primeflex.css';
import "primereact/resources/primereact.min.css";
import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FiUser } from 'react-icons/fi'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputSwitch } from 'primereact/inputswitch';

import ValidateCPF from '../../ults/ValidateCPF';

import Header from '../../components/Header';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const { logout } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [editando, setEditando] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [id, setId] = useState();
    const [nome, setNome] = useState();
    const [data, setData] = useState();
    const [telefone, setTelefone] = useState();
    const [cpf, setCpf] = useState();
    const [cep, setCep] = useState();
    const [rua, setRua] = useState();
    const [bairro, setBairro] = useState();
    const [localidade,setLocalidade] = useState();
    const [uf,setUf] = useState();
    const [complemento,setComplemento] = useState();
    const [genero,setGenero] = useState();

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nome: { value: null, matchMode: FilterMatchMode.CONTAINS },
        data: { value: null, matchMode: FilterMatchMode.CONTAINS },
        telefone: { value: null, matchMode: FilterMatchMode.CONTAINS },


    });
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    useEffect(() => {
        async function getCustomers() {
            // eslint-disable-next-line no-unused-vars
            const unsub = onSnapshot(collection(db, 'customers'), (snapshot) => {
                let list = [];
                snapshot.forEach((doc) => {
                    const customerData = {
                        'id': doc.id,
                        'nome': doc.data().nome,
                        'data': doc.data().data,
                        'telefone': doc.data().telefone,
                        'cpf': doc.data().cpf,
                        'cep': doc.data().cep,
                        'rua': doc.data().rua,
                        'bairro': doc.data().bairro,
                        'localidade':doc.data().localidade,
                        'uf':doc.data().uf,
                        'complemento':doc.data().complemento,
                        'genero': doc.data().genero,

                    };

                    list.push(customerData);
                })
                setUsers(list);
            })
        }

        getCustomers();
    }, []);

    async function handleSearch(e) {
        try {
            const cep = e.target.value.replace(/\D/g, "");
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            const data = await response.json();
            setRua(data.logradouro);
            setBairro(data.bairro);
            setLocalidade(data.localidade);
            setUf(data.uf);
            setComplemento(data.complemento);
        

           
        } catch (error) {
           alert('não existe esse cep')
                        setCep('');
                        setRua('');
                        setBairro('');
                        setLocalidade('');
                        setUf('');
                        setComplemento('');

        }
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (id) {
            const docRef = doc(db, "customers", id)
            await updateDoc(docRef, {
                nome: nome,
                data: data,
                telefone: telefone,
                cpf: cpf,
                cep: cep,
                rua: rua,
                bairro:bairro,
                localidade:localidade,
                uf:uf,
                complemento:complemento,
                genero:genero,

            })
                .then(() => {
                    setEditando(false);
                    setVisible(false);
                    toast.success("Usuario editado");
                })
                .catch((error) => {
                    setEditando(false);
                    setVisible(false);
                    toast.error("algo deu errado");
                })
        } else {
            if (nome !== '' && data !== '' && telefone !== '' && cpf !== '' && cep !== '' && rua !== '' && bairro !== '' && localidade !== '' && uf !== '' ) {
                await addDoc(collection(db, "customers"), {
                    nome: nome,
                    data: data,
                    telefone: telefone,
                    cpf: cpf,
                    cep: cep,
                    rua: rua,
                    bairro:bairro,
                    localidade:localidade,
                    uf:uf,
                    complemento:complemento,
                    genero:genero,
                })
                    .then(() => {
                        setNome('');
                        setData('');
                        setTelefone('');
                        setCpf('');
                        setCep('');
                        setRua('');
                        setBairro('');
                        setLocalidade('');
                        setUf('');
                        setComplemento('');
                        setGenero('');
                        setVisible(false); /// quando cadastrar fecha o dialog
                        toast.success("Usuario registrado")
                    })
                    .catch((error) => {
                        setNome('');
                        setData('');
                        setTelefone('');
                        setCpf('');
                        setCep('');
                        setRua('');
                        setBairro('');
                        setLocalidade('');
                        setUf('');
                        setComplemento('');
                        setGenero('');
                        console.log(error)
                        toast.error("Erro ao fazer o cadastro")
                    })
            } else {
                toast.error("Preencha todos os campos!")
            }
        }
    }

    async function handleEdit(customer) {
        setEditando(true);
        setId(customer.id)
        setNome(customer.nome)
        setData(customer.data)
        setTelefone(customer.telefone)
        setCpf(customer.cpf)
        setCep(customer.cep)
        setRua(customer.rua)
        setBairro(customer.bairro)
        setLocalidade(customer.localidade)
        setUf(customer.uf)
        setComplemento(customer.complemento)
        setGenero(customer.genero)
        setVisible(true);
    }

    function clearData() {
        setNome('');
        setData('');
        setTelefone('');
        setCpf('');
        setCep('');
        setRua('');
        setBairro('');
        setLocalidade('');
        setUf('');
        setComplemento('');
        setGenero('');
        

        setVisible(false);
    }

    async function handleLogout() {
        await logout();
    }
    async function deleteTarefa(id) {
        const docRef = doc(db, "customers", id)
        await deleteDoc(docRef);
        toast.success("Usuario deletado ")
    }
    function buttons(customer) {
        return (
            <div>

                
                <Button label="" severity="success" size='small' onClick={() => handleEdit(customer)} >Editar</Button>
                <Button Button icon="pi pi-times" severity="danger" aria-label="Cancel" size='small'onClick={() => deleteTarefa(customer.id)} >Excluir</Button>
            </div>
            
        )
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();

    return (
        <div>
            <Header />
            

            <div className="content">
                
                
                    
               

                <div className="card">
                <Button onClick={() => setVisible(true)} className='seila'> Add User </Button>
                    <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row"
                    
                        globalFilterFields={['nome','data','telefone']} header={header} emptyMessage=" Não existe usuario ">
                        
                        <Column field="nome" header="Nome" filter filterPlaceholder="Procurar pelo nome" style={{ minWidth: '12rem' }} />
                        <Column field="data" header="Data" filter filterPlaceholder="Procurar por data" style={{ minWidth: '12rem' }} />
                        <Column field="telefone" header="Telefone" filter filterPlaceholder="Procurar por telefone" style={{ minWidth: '12rem' }} />
                        <Column header="action" body={buttons} />
                        
                        

                    </DataTable>
                    
                </div>
                
            </div>

            <div className="card flex justify-content-center">
                <Dialog header="Formulario de cadrasto" visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); setEditando(false); setId(''); clearData(); }} >
                    <div className='container'>
                        <form className='form-profile'>
                            <label>Nome</label>
                            <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} ></input>

                            <label>Data de Nascimento</label>
                            <input type="date" placeholder='' value={data} onChange={(e) => setData(e.target.value)}></input>

                            <label>Telefone</label>
                            <InputMask value={telefone} mask="(99) 99999-9999" placeholder="Seu numero" onChange={(e) => setTelefone(e.target.value)}></InputMask>

                            <label>Gênero:</label>
                            <select  onChange={(e) => setGenero(e.target.value)} value={genero}>
                            <option value="{masculino}" >Masculino</option>
                            <option value="{feminino}" >Feminino</option>
                            <option value="{outro}" >Outro</option>
                            </select>


                            <label>CPF:</label>
                            <InputMask type="text" placeholder='' mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)}   ></InputMask>

                            <label>CEP:</label>
                            <input type="text" placeholder='' name='cep' value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleSearch} ></input>


                            <label>Rua:</label>
                            <input type="text" placeholder='' name='logradouro' value={rua} onChange={(e) => setRua(e.target.value)}></input>

                            <label>Bairro:</label>
                            <input type="text" placeholder='' name='bairro' value={bairro} onChange={(e) => setBairro(e.target.value)}></input>

                            <label>Estado:</label>
                            <input type="text" placeholder='' name='uf' value={uf} onChange={(e) => setUf(e.target.value)}></input>

                            <label>Complemento:</label>
                            <input type="text" placeholder='' name='complemento' value={complemento} onChange={(e) => setComplemento(e.target.value)}></input>
                            


                            
                            <Button label="Enviar" severity="help" raised  onClick={handleRegister} />
                                
                            
                        </form>


                    </div>

                </Dialog>
            </div>

        </div>
    )

}