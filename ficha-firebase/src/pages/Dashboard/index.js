import { useContext } from 'react'
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'

import './dashboard.css'
//import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '/node_modules/primeflex/primeflex.css';
import "primereact/resources/primereact.min.css";
import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
//import { Slider } from 'primereact/slider';
//import { Tag } from 'primereact/tag';
//import { DateToString, StringToDate } from '../../ults/DateUtils';
import *as Yup from 'yup'
import CPF from 'cpf'
import { Toast } from 'primereact/toast';
//import { DateToString, StringToDate } from '../../ults/DateUtils';



import Header from '../../components/Header';


export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const { logout } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [editando, setEditando] = useState(false);
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
    const [numero,setNumero] = useState();
    const [complemento,setComplemento] = useState();
    const [genero,setGenero] = useState();
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [customGender, setCustomGender] = useState('');
    

    

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
                        'numero':doc.data().numero,
                        'complemento':doc.data().complemento,
                        'genero': doc.data().genero,

                    };

                    list.push(customerData);
                })
                setUsers(list);
            })
        }

        getCustomers();
        initFilters();
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
            setNumero(data.numero);
            setComplemento(data.complemento);
        

           
        } catch (error) {
           //alert('não existe esse cep')
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

         const userSchema = Yup.object({
            nome: Yup.string().min(9,"Nome deve ter sobrenome"),
            telefone: Yup.string().min(11,"O telefone deve ter 11 numeros"),
            //data:Yup.date().min(new Date("1905-01-01"),"A data minima é 01/01/1905"),
            cpf: Yup.string().test((cpf)=>CPF.isValid(cpf)),
        })
        

        try {
            const user = await userSchema.validate({
                nome: nome,
                data: data,
                telefone: telefone,
                cpf: cpf,
                cep: cep,
                rua: rua,
                bairro:bairro,
                localidade:localidade,
                uf:uf,
                numero:numero,
                complemento:complemento,
                genero:genero,
        })
            if (id) {
                const docRef = doc(db, "customers", id)
                await updateDoc(docRef, user)          
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
                if (nome !== '' && data !== '' && telefone !== '' && cpf !== '' && cep !== '' && rua !== '' && bairro !== '' && localidade !== '' && uf !== ''  && numero !== '' ) {
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
                        numero:numero,
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
                            setNumero('');
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
                            setNumero('');
                            setComplemento('');
                            setGenero('');
                            console.log(error)
                            toast.error("Erro ao fazer o cadastro")
                        })
                } else {
                    toast.error("Preencha todos os campos!")
                }
            }
        } catch (error) {
            alert(error.message)
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
        setNumero(customer.numero)
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
        setNumero('');
        setComplemento('');
        setGenero('');
        

        setVisible(false);
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

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            nome: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            telefone: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            data: {
                operator: FilterOperator.AND,
                label: '',
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            },
            
        });
        setGlobalFilterValue("");
    };

    const renderFilterHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Limpar"
                    className="p-button-outlined btn-secondary"
                    onClick={clearFilter}
                />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Pesquisa"
                    />
                </span>
            </div>
        );
    };

   // const formatDate = (value) => {
        //return value.toLocaleDateString("pt-BR", {
           // day: "2-digit",
           // month: "2-digit",
            //year: "numeric",
        //});
  // }
    //const dateBodyTemplate = (rowData) => {
       //return formatDate(rowData.data);
    //};
    
    const dateemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };
    const dateFilterTemplate = (options) => {
        return (
            <Calendar
                value={options.value}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                dateFormat="dd/mm/yy"
                placeholder="dd/mm/yyyy"
                mask="99/99/9999"
            />
        );
    };


   

   

    const onRowSelect = (event) => {
        setSelectedCustomer(event.data);
    };

    const header = renderFilterHeader();

    




   
    
    return (
        <div>
            <Header />
            
            <Toast ref={toast} />
            <div className="content">

                
                    <div className='flex flex-wrap justify-content-evenly my-5'>
                        <InputText disabled='true' placeholder='Nome do Cliente' value={selectedCustomer != null ? selectedCustomer.nome : ''} />
                        <InputText disabled='true' placeholder='Data de Nascimento' value={selectedCustomer != null ? selectedCustomer.data : ''} />
                        <Button onClick={() => setVisible(true)} className='seila'> Add User </Button>
                    </div>   

                <div className="card">
               
                
                <Toast ref={toast} />
                    <DataTable 
                    value={users}
                    className="p-datatable-customers"
                      paginator rows={10}
                      rowsPerPageOptions={[3, 5, 10, 25, 50]}
                      filters={filters}
                      filterDisplay="menu"
                      globalFilterFields={["nome", "data", "telefone"]}
                      header={header}
                      selectionMode="single"
                      selection={selectedCustomer}
                      onSelectionChange={(e) => setSelectedCustomer(e.value)}
                      onRowSelect={onRowSelect}
                      metaKeySelection={false}
                      emptyMessage="Nenhum cliente encontrado."
                      stripedRows
                      removableSort >
                       
                        <Column field="nome"
                         header="Nome"
                         filter
                         sortable
                         filterPlaceholder="Procurar pelo nome"
                         style={{ minWidth: '12rem' }}
                          />
                        <Column
                         field="data"
                          header="Data" 
                          filter
                          sortable
                           filterPlaceholder="Procurar por data"
                           mask="99/99/9999"
                           //filterElement={dateFilterTemplate}
                           //body={dateBodyTemplate}
                            style={{ minWidth: '12rem' }}
                             />
                        <Column
                         field="telefone"
                          header="Telefone"
                           filter
                           sortable
                            filterPlaceholder="Procurar por telefone"
                             style={{ minWidth: '12rem' }} />
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
                            <option value="masculino" >Masculino</option>
                            <option value="feminino" >Feminino</option>
                            <option value="outro" >Outro</option>
                            </select>
                            {genero === 'outro' ?
                             <span className="p-float-label my-5">
                             <InputText id="genero" name='genero' defaultValue={genero} value={customGender} className='w-full' onChange={(e) => setCustomGender(e.target.value)} />
                            <label htmlFor="genero">Gênero</label>
                            </span>
                            : null
                            }



                            <label>CPF:</label>
                            <InputMask type="text" placeholder='' mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)}   ></InputMask>

                            <label>CEP:</label>
                            <InputMask type="text" placeholder='' name='cep' mask="99999-999" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleSearch} ></InputMask>


                            <label>Rua:</label>
                            <input type="text" placeholder='' name='logradouro' value={rua} onChange={(e) => setRua(e.target.value)}></input>

                            <label>Bairro:</label>
                            <input type="text" placeholder='' name='bairro' value={bairro} onChange={(e) => setBairro(e.target.value)}></input>

                            <label>Estado:</label>
                            <input type="text" placeholder='' name='uf' value={uf} onChange={(e) => setUf(e.target.value)}></input>

                            <label>Numero:</label>
                            <input type="text" placeholder='' name='numero' value={numero} onChange={(e) => setNumero(e.target.value)}></input>

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