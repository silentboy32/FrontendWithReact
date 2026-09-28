
import API from "../Api/Api";

// Login User 
const LoginUser = async (username, password) => {
    const Response = await API.post("/api/v1/users/login", {
        username,
        password
    });

    return Response.data;

};

// Get Logged-in user's datails 
const UserProfile = async (token) => {
    const response = await API.get("/api/v1/users/profile", {
        headers: {
            Authorization: `${token}`
        }
    })

    return response.data;
}

export { LoginUser, UserProfile }