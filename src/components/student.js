import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasTab from './ParentAndStudentsTabs';
const Student = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || userData.role !== 'student') {
            navigate('/login'); // Redirect to login if no user data or wrong role
        } else {
            setUser(userData);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data on logout
        navigate("/");
    }

    return (
        <div>
            {user && (
                <div className="alert alert-success text-center" role="alert">
                    <div className='d-flex align-items-center justify-content-between'>
                        <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='student' className='img-width'/>
                        <h5>Welcome Student</h5>
                        <button className='btn btn-success' type='button' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
            <PasTab/>
        </div>
    );
}

export default Student;
