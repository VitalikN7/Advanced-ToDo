// Библиотеки
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { fetchUserCheckAuth } from "./redux/slice/authSlice";
// Компоненты
import { Header } from "./components/Header/Header";
import { Container } from './components/Ul/Container/Container';
// Страницы
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { Login } from './pages/Login/Login'
import { Registrasion } from './pages/Registrasion/Registrasion'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserCheckAuth())
    }
  }, [dispatch,])

  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Registrasion />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
