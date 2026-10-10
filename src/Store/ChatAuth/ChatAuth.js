
import API from "../../Lib/Api";



// Create Conversation

const CreateChat = async (data) => {

    const response = await API.post("/api/v1/conversations", data );

    return response.data;

}


// Get Your Conversations 

const MyChat = async () => {

    const response = await API.get("/api/v1/conversations/my-conversations");

    return response.data;

}


// Send Messages 

const SendMessage = async (content ,conversationid) => {

    const response = await API.post(`/api/v1/message/${conversationid}`, { content } )

    
    return response.data;
}

// Get Message 
const GetMessage = async (conversationid) => {

    const response = await API.get(`/api/v1/message/${conversationid}`,)

    return response.data;
}


// Delete A Message 
const DeleteMessage = async (data) => {

    const response = await API.delete("/api/v1/message/:conversationId/:messageId", data );

    return response.data;
}




export {
    CreateChat,
    MyChat,
    SendMessage,
    GetMessage,
    DeleteMessage,
}



