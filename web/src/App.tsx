import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Home />
      <ToastContainer position="top-right" autoClose={2500} theme="dark" />
    </>
  )
}

export default App
