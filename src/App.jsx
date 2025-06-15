import { BrowserRouter, Route, Routes } from "react-router-dom"
import Search from "./components/customer/Search"
import Login from "./Login"
import FlightOwnerDashboard from "./components/flightowner/FlightOwnerDashboard"
import SchdeuledFlights from "./components/flightowner/SchdeuledFlights"
import OwnerLayout from "./components/flightowner/OwnerLayout"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/customer" >
          <Route index element={<Search />}/>
          <Route path="flights"/>
        </Route>
        <Route path="/flightOwner" element={<OwnerLayout/>}>
          <Route index element={<FlightOwnerDashboard/>} />
          <Route path="scheduledFlights" element={<SchdeuledFlights/>}/>
        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App
