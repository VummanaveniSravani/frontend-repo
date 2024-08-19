import React, { useState } from 'react';
import StudentDataTwo from './StudentDataTwo';
import CocurricularActivitiewTwo from './CocurricularActivitiewTwo';
import FilterStudentMarksTwo from './FilterStudentMarksTwo';
import UploadMarksTwo from './UploadMarksTwo';

const PasTab = ({ role }) => {
    const [activeForm, setActiveForm] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleForm = (formNumber) => {
        setActiveForm(formNumber);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <button
                    type="button"
                    className="btn toggle-btn"
                    onClick={toggleSidebar}
                >
                    {sidebarOpen ? '←' : '→'}
                </button>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 1 ? 'active' : ''}`}
                            onClick={() => toggleForm(1)}
                        >
                            View Your Semester Marks
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 2 ? 'active' : ''}`}
                            onClick={() => toggleForm(2)}
                        >
                            View Your Academic Profile
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 3 ? 'active' : ''}`}
                            onClick={() => toggleForm(3)}
                        >
                            Co-curricular Activities
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <main className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
                <div className="content-wrapper pt-3">
                    {activeForm === 1 && (
                        <div>
                            <FilterStudentMarksTwo />
                            <UploadMarksTwo />
                        </div>
                    )}
                    {activeForm === 2 && <StudentDataTwo />}
                    {activeForm === 3 && <CocurricularActivitiewTwo />}
                </div>
            </main>
        </div>
    );
};

export default PasTab;
