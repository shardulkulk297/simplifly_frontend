const initialState = {
    flights: []
}

const SearchReducer = (state = initialState, action)=>{

    if(action.type === "SEARCH_FLIGHTS"){
        return({
            ...state,
            flights: action.payload
        })
    }
    return state;
}
export default SearchReducer;
