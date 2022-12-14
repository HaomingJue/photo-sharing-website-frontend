import './App.css';
import HomePage from './pages/home/home-page';
import LoginPage from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register-page';
import { AllPhotosPage } from './pages/home/home';
import { UploadPhotoPage } from './pages/home/upload-photo';
import { FavoritesPage } from './pages/home/favorites';
import { MySpacePage } from './pages/home/my-space';
function App() {
  return (
  
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<HomePage/>}>
          <Route path="all-photos" element={<AllPhotosPage/>} />
          <Route path="upload" element={<UploadPhotoPage/>} />
          <Route path="favorites" element={<FavoritesPage/>} />
          <Route path="my-space" element={<MySpacePage/>} />
        </Route>
        {/* <Route path="/register" element={<RegisterPage/>} /> */}
    </Routes>
  </BrowserRouter>
    
   
  );
}

export default App;
