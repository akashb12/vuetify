const state={
    token:[]
}
const mutations= {
    setToken(state,token) {
        state.token=token
        localStorage.setItem("token",JSON.stringify(token))
    }
}
const getters = {
    getToken(state){
        return state.token
    }
}
export default {
    state,
    mutations,
    getters
}