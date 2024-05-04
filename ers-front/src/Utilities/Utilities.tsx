import axios from "axios"

export const fetchData = async (url: string) => {

//  USING FETCH
//     try {
//         const res = await fetch(url)
//         // console.log('response')
//         // console.log(res.json)
//         if(res.ok) {
//             return {
//                 error: null,
//                 response: await res.json()
//             }
//         }
//     } catch(e) {
//         return {
//             error: e,
//             response: null
//         }
//     }


// USING AXIOS
    try {
        const response = await axios(url)
        return {
           response: response.data,
           error: null
        }
    } catch (err) {
        return {
            response: null,
            error: err
        }
    }
}

export const baseUrl = "http://localhost:8080/";
