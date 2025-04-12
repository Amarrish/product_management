
import './App.css'
import Addproject from './components/Addproject'
import Footer from './components/Footer'
import Header from './components/Header'
import Updateproject from './components/Updateproject'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import Registerpage from './pages/Registerpage'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Header/>
      <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Registerpage />}/>
      <Route path='/addproduct' element={<Addproject/>}/>
      <Route path='/updateproduct/:id' element={<Updateproject/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      {/* <LoginPage/> */}
      {/* <Registerpage/> */}
      {/* <Addproject/> */}
      {/* <Updateproject/> */}
      {/* <Dashboard/> */}
      </Routes>
      <Footer/>
    </>
  )
}

export default App
