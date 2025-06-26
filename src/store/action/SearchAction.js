export const searchFlights = (dispatch) = async(origin, destination, date)=>{
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