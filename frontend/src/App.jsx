import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Home from './pages/HomePage'



function App() {

  return (
    <BrowserRouter>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>

            <Route path="/" Component={Home}/>
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  )
}

export default App
