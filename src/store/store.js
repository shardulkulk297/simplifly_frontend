import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from "./reducer/FlightReducer";
import UserInfoReducer from "./reducer/UserInfoReducer";
import RouteReducer from "./reducer/RouteReducer";
import ScheduleReducer from "./reducer/ScheduleReducer";


const store = configureStore({
    reducer:{
        allFlights: FlightReducer,
        UserInfo: UserInfoReducer,
        routes: RouteReducer,
        schedules: ScheduleReducer,
    }
})
export default store;