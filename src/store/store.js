import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from "./reducer/FlightReducer";
import UserInfoReducer from "./reducer/UserInfoReducer";

const store = configureStore({
    reducer:{
        allFlights: FlightReducer,
        UserInfo: UserInfoReducer
    }
})
export default store;