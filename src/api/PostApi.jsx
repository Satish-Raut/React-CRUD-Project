
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

// get Method
export const getPost = () => {
    return api.get("/posts");
}

// Delete Method
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
} 

// Post method
export const postData = (data) => {
    return api.post("/posts", data);
}

// Put method of updating completely
export const updateData = (id, updatedPost) => {
    return api.put(`/posts/${id}`, updatedPost);
}