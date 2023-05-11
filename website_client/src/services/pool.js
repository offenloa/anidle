import http from "../http-common"

class PoolService {
    async getBank() {
        let response = await http.get("/pool")
        console.log(response)
        return response.data
    }

    get(id) {
        return http.get(`/pool/${id}`)
    }
}

export default new PoolService();