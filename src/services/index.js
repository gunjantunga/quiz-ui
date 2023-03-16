import axios from "axios";

const baseUrl = "http://localhost:9000";

export const createNewUser = async (data) => {
    try {
        return await axios.post(`${baseUrl}/signup`, data)
    } catch (err) {
        return err.response;
    }
}

export const loginUser = async (data) => {
    try {
        return await axios.post(`${baseUrl}/authenticate`, data)
    } catch (err) {
        return err.response;
    }
}


export const getAllQuestions = async () => {
    try {
        return await axios.get(`${baseUrl}/questions`)
    } catch (err) {
        return err.response;
    }
}