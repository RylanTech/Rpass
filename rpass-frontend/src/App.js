import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loginpage from './pages/LoginPage';
import Homepage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Loginpage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
