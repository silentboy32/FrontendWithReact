import { useState } from "react"
import { useNavigate } from "react-router-dom";

function UserLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [data, setData] = useState(null)


    const FetchData = async () => {

        const result = await UserData(username, pass);
        

        setData(result)
        const { success, data, message } = result;

        if (success) {
           
            navigate("/dashboard", { state: data.user });
        }
            // } else {
        //     alert(<>
        //         <h1>{message}</h1>
        //     </>);
        // }
    }

    // const FetchData = async () => {


    //     const result = await UserData(username, pass);
    //     setData(result)

    //     if (data.success) {
    //         // go to dashboard and send user data
    //         navigate("/dashboard", { state: data.user });
    //     } else {
    //         alert(data.message);
    //     }

    // }




    return (

        <div className=" bg-gray-600 text-white p-4 text-3xl text-center">
            Login with username and password
            <div className=" ">

                <input  value={username} className=" text-2xl p-4 w-1/2 m-4 text-black" type="text" placeholder=" Enter Username" onChange={(e) => setUsername(e.target.value)} />

                <br />

                <input  value={pass} className=" text-2xl p-4 m-4 w-1/2 text-black" type="password" placeholder=" Enter Password" onChange={(e) => setPass(e.target.value)} />

            </div>

            <div>

                <button onClick={FetchData} className=" m-4 p-4 text-2xl rounded-lg hover:bg-blue-500 bg-orange-600 "> submit </button>
            </div>
            {data && (
                <>
                    <div>{data.message}</div>
                </>
            )}

            {/* <button onClick={() => navigate("/dashboard", { state: { username: "test" } })}  className=" m-4 p-4 text-2xl rounded-lg hover:bg-blue-500 bg-orange-600 "> Go to Dashboard </button> */}

        </div>
    )
}


export default UserLogin


const UserData = async (username, pass) => {

    const response = await fetch("http://127.0.0.1:3030/api/v1/users/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: pass
        })
    })

    return response.json()
}

