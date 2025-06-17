import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from "./reducer/FlightReducer";

const store = configureStore({
    reducer:{
        allFlights: FlightReducer
    }
})
export default store;