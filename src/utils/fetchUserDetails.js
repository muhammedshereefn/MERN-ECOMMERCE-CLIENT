import Axios from "./Axios"
import SummaryApi from "../common/SummuryApi"

const fetchUserDetails = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default fetchUserDetails