import { useLocation } from "react-router-dom";

function Dashboard() {

    const location = useLocation();
    const user = location.state || {};

    return (
        <div className=" bg-gray-700 text-white text-center text-3xl  ">
            <div className=" p-4 m-4 ">

                <h1>Welcome {user.username}</h1>
                <p>Email: {user.email}</p>
                <p>Full Name: {user.fullname}</p>
            </div>
        </div>
    );

}


export default Dashboard