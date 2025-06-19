const initialState = {
    loggedInUser:[]
}

const UserInfoReducer = (state = initialState, action)=>{

    if(action.type === "GET_USER_INFO"){
        return {
            ...state,
            loggedInUser: action.payload
        }
    }
    return state;


}

export default UserInfoReducer;