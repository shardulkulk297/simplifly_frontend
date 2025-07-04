import axios from "axios"

export const fetchAllFlights = (dispatch) => {

    //THis api is for Input select list of flights
    const getAllFlights = async () => {
        try {
            let token = localStorage.getItem('token');
            // console.log(token);
            if (!token) {
                console.warn("No token set yet")
                return;
            }
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
   return getAllFlights();

}

export const getOwnerFlights = (dispatch) => {

    const getFlights = async () => {
        //This is for the showing the schedules of the loggedInUser
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
                    'type': "GET_OWNER_FLIGHTS"
                })
            }
        }
        catch (err) {
            console.log(err);
        }


    }
   return getFlights();

}


export const searchFlights = (dispatch) => async(origin, destination, date, page, size=6) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/flight/schedule/search`, {
                params: {
                    origin,
                    destination,
                    date,
                    page,
                    size
                }
            });
            console.log(response.data);
            dispatch({
                'payload': response.data,
                'type': "SEARCH_FLIGHTS"
            })
            return response.data;

        } catch (error) {
            console.log(error);
        }
}



