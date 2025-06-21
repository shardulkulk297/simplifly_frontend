import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from "./reducer/FlightReducer";
import UserInfoReducer from "./reducer/UserInfoReducer";
import RouteReducer from "./reducer/RouteReducer";

const store = configureStore({
    reducer:{
        allFlights: FlightReducer,
        UserInfo: UserInfoReducer,
        routes: RouteReducer
    }
})
export default store;