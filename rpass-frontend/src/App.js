import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loginpage from './pages/LoginPage';
import Homepage from './pages/HomePage';
import PassPage from './pages/PassPage';
import CreatePage from './pages/CreatePage';
import EditPassPage from './pages/EditPassPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/pass/:name' element={<PassPage/>}/>
      <Route path='/create' element={<CreatePage/>}/>
      <Route path='/edit/:name' element={<EditPassPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
