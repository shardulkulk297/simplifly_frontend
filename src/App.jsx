import { BrowserRouter, Route, Routes } from "react-router-dom"
import Search from "./components/customer/Search"
import Login from "./components/Login"
import FlightOwnerDashboard from "./components/flightowner/FlightOwnerDashboard"
import SchdeuledFlights from "./components/flightowner/SchdeuledFlights"
import OwnerLayout from "./components/flightowner/OwnerLayout"
import CreateSchedule from "./components/flightowner/CreateSchedule"
import AddFlights from "./components/flightowner/AddFlights"
import { Toaster } from "react-hot-toast"
import SearchResults from "./components/customer/SearchResults"
import CustomerLayout from "./components/customer/CustomerLayout"
import ManageRoutes from "./components/flightowner/ManageRoutes"
import BookingPage from "./components/customer/BookingPage"
import GetBookings from "./components/flightowner/GetBookings"
import Reports from "./components/flightowner/Reports"
import AddRoute from "./components/flightowner/AddRoute"
import Signup from "./components/Signup"
import Profile from "./components/flightowner/Profile"
import PaymentPage from "./components/customer/PaymentPage"
import ViewBookings from "./components/customer/ViewBookings"

function App() {
  return (
    <>
    <Toaster position="top-center"></Toaster>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/customer" element={<CustomerLayout/>}>
          <Route index element={<Search />}/>
          <Route path="search-results" element={<SearchResults/>}/>
          <Route path="book" element={<BookingPage/>}/>
          <Route path="payment" element={<PaymentPage />} />
          <Route path="bookings" element={<ViewBookings />}/>
        </Route>
        <Route path="/flightOwner" element={<OwnerLayout/>}>
          <Route index element={<FlightOwnerDashboard/>} />
          <Route path="scheduledFlights" element={<SchdeuledFlights/>}/>
          <Route path="new-schedule" element={<CreateSchedule />}/>
          <Route path="new-flight" element={<AddFlights/>} />
          <Route path="manage-routes" element = {<ManageRoutes/>}/>
          <Route path="new-route" element={<AddRoute />}/>
          <Route path="get-bookings" element={<GetBookings />}/>
          <Route path="reports" element={<Reports/>}/>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
