const loadFlights = ()=>{
    try {
        const flights = localStorage.getItem("flights");
        return flights ? JSON.parse(flights) : [];
    } catch (error) {
        console.error('Error loading flights:', error);
        return [];
    }
}

const saveFlights = (flights)=>{
    try {
        localStorage.setItem("flights", JSON.stringify(flights));        
    } catch (error) {
         console.error('Error saving flights:', error);
    }
}

const initialState = {
    flights:loadFlights()
}

const FlightReducer = (state = initialState, action) =>{
    if(action.type === 'FETCH_ALL_FLIGHTS'){
        
        return{
            ...state,
            flights: action.payload
        }

    }


    if(action.type === "SEARCH_FLIGHTS"){
        const newFlights = action.payload;
        saveFlights(newFlights);
        return {
            ...state,
            flights: newFlights
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