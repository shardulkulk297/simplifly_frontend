import axios from "axios"



export const fetchAllFlights = (dispatch) => {
   
    //THis api is for Input select list of flights
    const getAllFlights = async () => {
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
    getAllFlights();

}

export const getOwnerFlights = (dispatch)=>{

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
        getFlights();

}


export const searchFlights=(dispatch)=>(origin, destination, date)=>{
    const getFlights = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/flight/schedule/search", {
            params: {
              origin,
              destination,
              date
            }
          });
          console.log(response.data);
          dispatch({
            'payload': response.data,
            'type': "SEARCH_FLIGHTS"
          })

        } catch (error) {
          console.log(error);
        }

      }
      getFlights();

}


