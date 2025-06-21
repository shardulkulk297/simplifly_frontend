export const getUserDetails = (dispatch)=(user)=>{
    
    dispatch({
        payload: user,
        type: "GET_USER_DETAILS"
    })

}