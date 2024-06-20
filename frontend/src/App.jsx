import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Home from './pages/HomePage'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserListPage from './pages/UserListPage'
import ProductListPage from './pages/ProductListPage'
import UserEditPage from './pages/UserEditPage'
import ProductEditPage from './pages/ProductEditPage'



function App() {

  return (
    <BrowserRouter>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/admin/userlist" Component={UserListPage}/>
            <Route path="/admin/user/:id/edit" Component={UserEditPage}/>
            <Route path="/admin/productlist" Component={ProductListPage}/>
            <Route path="/admin/product/:id/edit" Component={ProductEditPage} />
            <Route path="/login" Component={LoginPage}/>
            <Route path="/register" Component={RegisterPage}/>
            <Route path="/" Component={Home}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
