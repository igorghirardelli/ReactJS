import { useContext } from 'react'
import avatarImg from '../../assets/avatar.png'
import { Link  } from 'react-router-dom'

import {AuthContext} from '../../contexts/auth'
import { FiHome,FiUser,FiSettings} from 'react-icons/fi'
import './header.css';

export default function Header(){
    const {user}  = useContext(AuthContext)


    return(
        <div className="sidebar">
           
           <div>
            <img src={user.avatarURL == null ? avatarImg : user.avatarURL} alt="Foto do usuario"/>
           </div>

           <Link to="/dashboard">
            <FiHome color="#fff" size={24}/>
            Tabela
           </Link>

           

           <Link to="/profile">
            <FiSettings color="#fff" size={24}/>
            Perfil
           </Link> 

           
           <Link to="/">
            <FiSettings color="#fff" size={24}/>
            Logout
           </Link> 
  

        </div>
    )
}

//<Link to="/customers">
           // <FiUser color="#fff" size={24}/>
           // Clientes
        //   </Link> 
