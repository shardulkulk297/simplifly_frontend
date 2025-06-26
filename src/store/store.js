import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from "./reducer/FlightReducer";
import UserInfoReducer from "./reducer/UserInfoReducer";
import RouteReducer from "./reducer/RouteReducer";
import ScheduleReducer from "./reducer/ScheduleReducer";
import SearchReducer from "./reducer/SearchReducer";

const store = configureStore({
    reducer:{
        allFlights: FlightReducer,
        UserInfo: UserInfoReducer,
        routes: RouteReducer,
        schedules: ScheduleReducer,
        searchResults: SearchReducer
    }
})
export default store;