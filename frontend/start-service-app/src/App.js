//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import Login from './pages/login';
import Content from './components/content';
import PrivateRoute from './components/auth';
import Register from './pages/register';


/*O PrivateRoute recebe como element a view que será carregada*/
function App() {
	return (
        	<div className="App">
		   <Router>
                      <Routes>
                         <Route path='/' element={<Login />} />
                         <Route path='/register' element={<Register />} />
                         <Route path='/content' element={<Register/>}>
                         </Route>
                      </Routes>
                   </Router>
                </div>
        );
}

export default App;


