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
import NotFoundPage from './pages/NotFoundPage'
import ProductPage from './pages/ProductPage'



function App() {

  return (
    <BrowserRouter>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/admin/userlist" element={<UserListPage/>} />
            <Route path="/admin/user/:id/edit" element={<UserEditPage/>}/>
            <Route path="/admin/productlist" element={<ProductListPage/>}/>
            <Route path="/admin/productlist/:pageNumber" element={<ProductListPage/>}/>
            <Route path="/admin/product/:id/edit" element={<ProductEditPage/>} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path='/search/:keyword/page/:pageNumber' element={<Home/>}/>
            <Route path='/search/:keyword' element={<Home/>}/>
            <Route path='/page/:pageNumber' element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
