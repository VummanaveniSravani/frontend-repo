import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SingleStudent = ({ rollNoFilter }) => {
    const [students, setStudents] = useState([]);
    const [editStudentId, setEditStudentId] = useState(null);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/student');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleEdit = (student) => {
        setEditStudentId(student.id);
        setFormValues(student);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/student/${id}`);
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/student/${editStudentId}`, formValues);
            setStudents(students.map(student => student.id === editStudentId ? formValues : student));
            setEditStudentId(null);
            setFormValues({});
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleCancel = () => {
        setEditStudentId(null);
        setFormValues({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const filteredStudents = students.filter(student => student.rno === rollNoFilter);

    return (
        <div>
            {filteredStudents.length > 0 ? (
                <div className='table-responsive container-fluid w-100 py-5'>
                    <h2 className='py-3'>Student Activities</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Father's Name</th>
                                <th>Roll No</th>
                                <th>Mobile No</th>
                                <th>Email Id</th>
                                <th>DOB</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    {editStudentId === student.id ? (
                                        <>
                                            <td><input type="text" name="finame" value={formValues.finame} onChange={handleChange} /></td>
                                            <td><input type="text" name="laname" value={formValues.laname} onChange={handleChange} /></td>
                                            <td><input type="text" name="faname" value={formValues.faname} onChange={handleChange} /></td>
                                            <td><input type="text" name="rno" value={formValues.rno} onChange={handleChange} /></td>
                                            <td><input type="text" name="mno" value={formValues.mno} onChange={handleChange} /></td>
                                            <td><input type="email" name="email" value={formValues.email} onChange={handleChange} /></td>
                                            <td><input type="date" name="dob" value={formValues.dob} onChange={handleChange} /></td>
                                            <td><input type="text" name="address" value={formValues.address} onChange={handleChange} /></td>
                                            <td>
                                                <button type="button" onClick={handleSave}>Save</button>
                                                <button type="button" onClick={handleCancel}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{student.finame}</td>
                                            <td>{student.laname}</td>
                                            <td>{student.faname}</td>
                                            <td>{student.rno}</td>
                                            <td>{student.mno}</td>
                                            <td>{student.email}</td>
                                            <td>{student.dob}</td>
                                            <td>{student.address}</td>
                                            <td>
                                                <button type="button" onClick={() => handleEdit(student)}>Edit</button>
                                                <button type="button" onClick={() => handleDelete(student.id)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No students found for Roll No: {rollNoFilter}</p>
            )}
        </div>
    );
};

export default SingleStudent;
