import axios from "axios";

export const getRoutes = (dispatch)=>{
    const getRoutes = async()=>{
        try {
        const token = localStorage.getItem('token');

        if(!token){
            console.warn("No token set yet")
            return;
        }
        const response = await axios.get("http://localhost:8080/api/flight/route/getAll",{
            headers: {'Authorization': "Bearer " + token}
        })
        console.log(response.data);
        dispatch({
            'payload': response.data,
            'type': "GET_ALL_ROUTES"
        })
    } catch (error) {
        console.log(error)
    }
    }
    return getRoutes();
}

