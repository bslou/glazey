import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import RegOne from './regOne';
import Login from './Login';
import RegTwo from './regTwo';
import Main from './Main';
import PostJob from './PostJob';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path = "/" exact element = {<MainPage/>}/>
          <Route path = "/SignUp" exact element = {<RegOne/>}/>
          <Route path = "/LogIn" exact element = {<Login/>}/>
          <Route path = "/SignUp2" exact element = {<RegTwo/>}/>
          <Route path = "/Main" exact element = {<Main/>}/>
          <Route path = "/PostJob" exact element = {<PostJob/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
