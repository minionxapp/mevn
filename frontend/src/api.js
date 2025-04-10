import axios from "axios";

const custumFetch = axios.create({
    baseURL :'https://backendmevn.vercel.app/api/v1'

})

export default custumFetch