import{BrowserRouter} from 'react-router-dom'
import RoutesApp from "./routes/index";

export default function app(){

return(
    
    <BrowserRouter>
        <RoutesApp/>
    </BrowserRouter>


);


  
}

/// a funcao do APP js vai ser para chamar todas as routas 
/// importei a function RoutesApp 
/// BrowserRouter: (é um componente responsável por informar a nossa aplicação que teremos
/// um roteamento de componentes, por conta disso ele ficará em volta dos componentes)
/// RoutesAPP ele que vai decidir quais das rotas serão renderizadas