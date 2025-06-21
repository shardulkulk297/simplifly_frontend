const initialState = {
    routes: []
}

const RouteReducer = (state=initialState, action)=>{

    if(action.type == "GET_ALL_ROUTES")
    {
        return{
            ...state,
            routes: action.payload
        }
    }

    return state;

}

export default RouteReducer