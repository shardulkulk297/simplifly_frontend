import { BrowserRouter, Route, Routes } from "react-router-dom"
import Search from "./components/customer/Search"
import Login from "./components/Login"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/customer" >
          <Route index path="search" element={<Search />}/>
          <Route path="flights"/>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
