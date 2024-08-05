import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link}from 'react-router-dom';

const CocurricularList = ({ myActivity }) => {
    const [activity, setActivity] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [editFormData, setEditFormData] = useState({
        sname: '',
        rno: '',
        branch: '',
        aname: '',
        date: '',
        description: '', 
    });

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get('http://localhost:3001/activity');
                setActivity(response.data);
            } catch (error) {
                console.error('Error fetching activity:', error);
            }
        };

        fetchActivity();
    }, [myActivity]);

    const handleEditClick = (activity) => {
        setEditingStudent(activity.id);
        setEditFormData({
            sname: activity.sname,
            rno: activity.rno,
            branch: activity.branch,
            aname: activity.aname,
            date: activity.date,
            description: activity.description,
            
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/activity/${editingStudent}`, editFormData);
            setActivity(activity.map(activity => (activity.id === editingStudent ? response.data : activity)));
            setEditingStudent(null);
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    return (
        <div>
            <div className='container-fluid'>
                            
                {/* <div className='float-end pt-3'><Link className='btn btn-success' type='button' to="/admin">Go Back</Link></div> */}

                <h3 className='text-center py-3'>Student Activities</h3>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll NO</th>
                                <th>Branch</th>
                                <th>Activity Name</th>
                                <th>Date of Event</th>
                                <th>Description</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {activity.map((activity) => (
                                <tr key={activity.id}>
                                    {editingStudent === activity.id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="sname"
                                                    value={editFormData.sname}
                                                    onChange={handleEditFormChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="rno"
                                                    value={editFormData.rno}
                                                    onChange={handleEditFormChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="branch"
                                                    value={editFormData.branch}
                                                    onChange={handleEditFormChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="aname"
                                                    value={editFormData.aname}
                                                    onChange={handleEditFormChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={editFormData.date}
                                                    onChange={handleEditFormChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={editFormData.description}
                                                    onChange={handleEditFormChange}
                                                />
                                            </td>
                                            <td>
                                                <button onClick={handleEditFormSubmit}>Save</button>
                                                <button onClick={() => setEditingStudent(null)}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{activity.sname}</td>
                                            <td>{activity.rno}</td>
                                            <td>{activity.branch}</td>
                                            <td>{activity.aname}</td>
                                            <td>{activity.date}</td>
                                            <td>{activity.description}</td>
                                            <td>
                                                <button onClick={() => handleEditClick(activity)}>Edit</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default CocurricularList;
