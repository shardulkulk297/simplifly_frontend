import axios from "axios";

export const getAllSchedules = async (dispatch) => {

    try {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            const response = await axios.get("http://localhost:8080/api/flight/schedule/getAll", {
                headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
            })
            console.log(response.data);

            dispatch({
                'payload': response.data,
                'type': "GET_ALL_SCHEDULES"
            })
        }
    }
    catch (err) {
        console.log(err);
    }

}