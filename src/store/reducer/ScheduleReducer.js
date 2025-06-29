const initialState = {
    schedules: []
}

const ScheduleReducer = (state = initialState, action)=>{

    if(action.type === "GET_ALL_SCHEDULES")
    {
        return ({
            ...state,
            schedules: action.payload
        })
    }
    if(action.type === "GET_SCHEDULE")
    {
        return({
            ...state,
            schedules: action.payload
        })
    }
    
    return state;
}

export default ScheduleReducer;