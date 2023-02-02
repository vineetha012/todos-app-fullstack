import logo from './logo.svg';
import { Register } from './components/register'
import { Imagesget } from './components/images';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LogIn } from './components/login';
import { RegLogcontextProvider } from './components/context';
import { CreateTodoAuthentication, HomeAuthentication } from './components/auth';

function App() {
  return (
    <div className="App">
      {/* <Imagesget/> */}
      <BrowserRouter>
        <RegLogcontextProvider>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<LogIn />} />
            <Route  path='/home' element={<HomeAuthentication/>}/>
            <Route path='/createtodo' element={<CreateTodoAuthentication/>}/>
          </Routes>
        </RegLogcontextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
