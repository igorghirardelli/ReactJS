import {Routes,Route} from 'react-router-dom';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
//import Customers from '../pages/Customers';
import Private from './Private';

function RoutesApp(){

    return(
        <Routes>
          <Route path='/' element={ <Signin/> } />
          <Route path='/register' element={ <Signup/> } />
          
          <Route path='/dashboard' element={ <Private><Dashboard/></Private>  } />
          <Route path='/profile' element={<Private><Profile/></Private> } />
          

        </Routes>
    )
}
export default RoutesApp;