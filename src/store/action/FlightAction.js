import axios from "axios"

export const fetchAllFlights = (dispatch) => {

    const getAllCourses = async () => {
        try {
            let token = localStorage.getItem('token');
            // console.log(token);
            const response = await axios.get("http://localhost:8080/api/flight/getAllFlights", {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            // console.log(response.data);
            dispatch({
                'payload': response.data,
                'type': "FETCH_ALL_FLIGHTS"
            })
        } catch (error) {
            console.log(error);
        }
    }
    getAllCourses();

}


