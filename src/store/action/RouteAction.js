import axios from "axios";

export const getRoutes = (dispatch)=>{
    const getRoutes = async()=>{
        try {
        const response = await axios.get("http://localhost:8080/api/flight/route/getAll",{
            headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
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
    getRoutes();
    
}

