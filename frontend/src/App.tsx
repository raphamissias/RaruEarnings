import Date from "./components/Date";
import Transactions from './components/Transactions'
import History from './components/History'
import Orders from "./components/Orders";
import Nav from "./components/Nav";
import './App.css'

function App() {

  return (
    <>
      <Nav></Nav>
      <Date></Date>
      <Transactions></Transactions>
      <Orders></Orders>
      <History></History>
    </>
  )
}

export default App
