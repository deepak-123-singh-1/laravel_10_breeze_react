import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

import { Button, Alert, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Dashboard({ auth }) {

    
    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'date', label: 'Date' },
        { value: 'name', label: 'name' },
        { value: 'address', label: 'Address' },
        { value: 'city', label: 'City' },
    ];
    
    // How many select boxes
    const selectBoxes = ['Select-1', 'Select-2', 'Select-3'];

    // Create state for each select box
    const [selectedValues, setSelectedValues] = useState(['name']);

    // Handle change for select boxes
    const handleChange = (index, event) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues[index] = event.target.value;
        setSelectedValues(newSelectedValues);
    };
    console.warn(selectedValues);





    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <div className="p-6">





                            <div>
                                {
                                    selectBoxes.map((defaultValue, index) => (
                                        
                                        <select
                                            key={index}
                                            value={selectedValues[index]}
                                            onChange={(event) => handleChange(index, event)} >
                                            {
                                                options.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        
                                    ))
                                }
                            </div>







                            {/* <Tabs
                                defaultActiveKey="home"
                                id="justify-tab-example"
                                justify >
                                <Tab eventKey="home" title="Home">
                                    <div className='px-3 py-3' style={{'borderRight':'1px solid silver', 'borderBottom':'1px solid silver', 'borderLeft':'1px solid silver'}} >
                                        Tab content for Home
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Profile">
                                    Tab content for Profile
                                </Tab>
                                <Tab eventKey="longer-tab" title="Loooonger Tab">
                                    Tab content for Loooonger Tab
                                </Tab>
                            </Tabs> */}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
