export const fetchData = async (url: string) => {

    try {
        const res = await fetch(url)
        // console.log('response')
        // console.log(res.json)
        if(res.ok) {
            return {
                error: null,
                response: await res.json()
            }
        }
    } catch(e) {
        return {
            error: e,
            response: null
        }
    }
}
