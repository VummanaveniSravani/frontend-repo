import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasTab from './ParentAndStudentsTabs';

const Student = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState({});

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || userData.role !== 'student') {
            navigate('/login'); // Redirect to login if no user data or wrong role
        } else {
            setUser(userData);
            fetchUploadedFiles(userData.rollNo); // Fetch existing files
        }
    }, [navigate]);

    const fetchUploadedFiles = async (rollNo) => {
        if (!rollNo) {
            console.error('No roll number provided.');
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:4000/student/files/${rollNo}`);
            setUploadedFiles(response.data);
        } catch (error) {
            console.error('Error fetching student files:', error);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data on logout
        navigate("/");
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleCertificateChange = (e) => {
        setCertificate(e.target.files[0]);
    };

    const uploadPhoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', photo);

        try {
            await axios.post('http://localhost:4000/student/upload-photo', formData);
            fetchUploadedFiles(user.rollNo); // Refresh uploaded files
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    const uploadCertificate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('certificate', certificate);

        try {
            await axios.post('http://localhost:4000/student/upload-certificate', formData);
            fetchUploadedFiles(user.rollNo); // Refresh uploaded files
        } catch (error) {
            console.error('Error uploading certificate:', error);
        }
    };

    return (
        <div>
            {user && (
                <div className="alert alert-success text-center" role="alert">
                    <div className='d-flex align-items-center justify-content-between'>
                        <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='student' className='img-width' />
                        <h5>Welcome Student</h5>
                        <button className='btn btn-success' type='button' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
            <PasTab />
            <h3>Upload Photo and Certificate</h3>
            <form onSubmit={uploadPhoto}>
                <input type="file" onChange={handlePhotoChange} required />
                <button type="submit">Upload Photo</button>
            </form>
            <form onSubmit={uploadCertificate}>
                <input type="file" onChange={handleCertificateChange} required />
                <button type="submit">Upload Certificate</button>
            </form>

            {uploadedFiles.photo && (
                <div>
                    <h4>Uploaded Photo:</h4>
                    <img src={`http://localhost:4000/${uploadedFiles.photo}`} alt="Student" style={{ width: '100px', height: '100px' }} />
                </div>
            )}
            {uploadedFiles.certificate && (
                <div>
                    <h4>Uploaded Certificate:</h4>
                    <a href={`http://localhost:4000/${uploadedFiles.certificate}`} download>Download Certificate</a>
                </div>
            )}
        </div>
    );
}

export default Student;
