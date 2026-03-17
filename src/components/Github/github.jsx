

import { useState } from "react"
import { useLoaderData } from "react-router-dom"


function Github() {

    const dataa = useLoaderData()
    // const [ data , setData ] = useState(1)

    // useEffect(() => {
    //     fetch("https://api.github.com/users/silentboy32")
    //     .then( response => response.json())
    //     .then( data => {
    //         setData(data)
    //     })
    // },[])


    const [username, setUsername] = useState("")
    const [data, setData] = useState(null)

    const getUser = async () => {
        const result = await githubloader(username);
        setData(result)
    }



    return (
        <div>
            <div className=" bg-blue-400 m-4 p-4 ">
                <p className=" text-3xl font-bold text-black ">Search Github Profile </p>

                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=" shrink-0 text-3xl p-2 overflow-hidden w-1/2 " type="text" />

                <button onClick={getUser} className=" m-4 text-lg p-2  bg-orange-500 rounded-lg hover:bg-blue-500 ">submit</button>
            </div>


            {data && (
                <div className=" grid grid-cols-2 m-4 text-center bg-gray-600 text-white text-3xl p-4">

                    <div>
                        <img src={data.avatar_url} />

                    </div>

                    <div className=" p-4 m-4 text-left ">
                        <p className=" text-2xl  "> User Name <span className=" text-3xl text-orange-700 font-bold ">
                            
                                {data.name}

                            </span>
                        </p>



                        <p>Followers: {data.followers}</p>
                        <p>Public Repos: {data.public_repos}</p>
                    </div>
                </div>
            )}


            {/* <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl ">
                {data && (
                    <div className="mt-4 text-center bg-gray-600 text-white text-3xl p-4">
                        <p className=" text-2xl ">{data.username}</p>
                        <img src={data.avatar_url} width="100" />
                        <p>Followers: {data.followers}</p>
                        <p>Public Repos: {data.public_repos}</p>
                    </div>
                )}

            </div> */}
        </div>

    )
}

export default Github


export const githubloader = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`)
    return response.json()
}