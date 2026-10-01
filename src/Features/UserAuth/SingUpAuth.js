
import { ApiUrl } from "../../Services/Api";

const SingUp = async (formData) => {

  const response = await fetch(`${ApiUrl.baseURL}/api/v1/users/register` ,

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};


export { SingUp }

// {
//         username : formData.username,
//         email : formData.email,
//         fullname : formData.fullname,
//         password : formData.password
//     }