import './App.css';
import HomePage from './pages/home/home-page';
import LoginPage from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
  
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        {/* <Route path="/register" element={<RegisterPage/>} /> */}
    </Routes>
  </BrowserRouter>
    
   
  );
}

export default App;
