import {Routes, Route} from 'react-router-dom';

import Home from '../pages/Home'; /// importando o home para o routes para configurar a rota dele no site
import Register from '../pages/Register'; /// mesma coisa que eu fiz com o home 
import Admin from '../pages/Admin';

import Private from './Private'; // importando para proteger o admin

function RoutesApp(){

    return(
        <Routes>
            
            <Route path='/' element={ <Home/> } />
            <Route path='/register' element={<Register/>} />

            <Route path='/admin' element={<Private> <Admin/> </Private>} />
        </Routes>
    )

}

export default RoutesApp; /// exportar o arquivo

/// path = qual caminho que seria o / que é o caminho inicial da aplicação
/// alement =  qual componente vai ser renderizado que sera o Home