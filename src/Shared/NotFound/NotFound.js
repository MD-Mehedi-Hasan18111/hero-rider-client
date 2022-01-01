import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='mt-5'>
            <div className='text-center'>
            <h2>404</h2>
            <h1>Page Not Found!</h1>
                <Link to="/home">
                    <button className="registerBtn">Back To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;