import React from 'react';
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg";

const Notification = () => {
    return (
         <div
              className="min-h-screen w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <h2 className='text-gray-300 flex justify-center items-center'>In Development</h2>
            
        </div>
    );
}

export default Notification;
