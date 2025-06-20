const initialState = {
    flights:[]
}

const FlightReducer = (state = initialState, action) =>{
    if(action.type === 'FETCH_ALL_FLIGHTS'){

        return{
            ...state,
            flights: action.payload
        }

    }


    if(action.type === "SEARCH_FLIGHTS"){
        return {
            ...state,
            flights: action.payload
        }
    }

    if(action.type === "GET_OWNER_FLIGHTS"){
        return {
            ...state,
            flights: action.payload
        }
    }

    

    return state;
}

export default FlightReducer;