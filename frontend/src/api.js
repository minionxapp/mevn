import axios from "axios";

const custumFetch = axios.create({
    baseURL :'/api/v1'

})

export default custumFetch