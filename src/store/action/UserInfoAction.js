import axios from "axios";


export const fetchLoggedInUser = (dispatch) => {
    const getName = async () => {
        try {
            let token = localStorage.getItem('token');
            let details = await axios.get('http://localhost:8080/api/user/getLoggedInUserDetails', {
                headers: { "Authorization": "Bearer " + token }
            }
            )
            console.log(details.data)
            dispatch({
                'payload': details.data,
                'type': "GET_USER_INFO"
            })

        } catch (error) {
            console.log(error);
        }
    }
    getName();
}