
import API from "../../Services/Api";

// Login User 
const LoginUser = async (username, password) => {
    const Response = await API.post("/api/v1/users/login", {
        username,
        password
    });

    return Response.data;

};

// User SignUp Here 
const SignUp = async (data) => {
    const response = await API.post("/api/v1/users/register", data);

    return response.data;
};




// Get Logged-in user's datails 
const UserProfile = async () => {
    const response = await API.get("/api/v1/users/profile")

    return response.data;
}


//    Logout  User

const UserLogOut = async () => {
    const response = await API.get("/api/v1/users/loggedout")

    return response.data
}



// Get All Contacts 

const AllContact = async () => {
    
    const response = await  API.get("/api/v1/message/contacts")

    
    
    return response.data;
}

export { LoginUser, UserProfile, SignUp , UserLogOut  , AllContact }