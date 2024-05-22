import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

import { Button, Alert, Tabs, Tab, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Dashboard({ auth }) {





    const { data, setData, errors, post, progress } = useForm({
        name: "Deepak",
        csv_data: [
            {"Column-1": "India", "Column-2": "Bihar", "Column-3": "Motihari", "": "sec-63"},
            {"Column-1": "India", "Column-2": "UP", "Column-3": "Noida", "Column-4": "sec-155, UP"},
            {"Column-1": "India", "Column-2": "Punjab", "Column-3": "Mohali", "Column-4": "sec-110, punjab"},
        ]
    });
    
    const options = [
        { value: 'name', label: 'Name' },
        { value: 'state', label: 'State' },
        { value: 'city', label: 'City' },
        { value: 'date', label: 'Date' },
        { value: 'address', label: 'Address' },
        { value: 'country', label: 'Country' },
        { value: 'Column-1', label: 'Column-1' },
    ];
    // Column List
    const [columnList, setColumnList] = useState(['Column-1', "Column-2", "Column-3", "Column-4"]);

    const changeKeyName = (oldKey, newKey) => {
        const updatedCsvData = data.csv_data.map(item => {
            const newItem = { ...item };
            if (newItem.hasOwnProperty(oldKey)) {
                newItem[newKey] = newItem[oldKey];
                delete newItem[oldKey];
            }
            return newItem;
        });
        setData('csv_data', updatedCsvData);
    };

    const handleChange = (oldKey, index, event) => {
        // console.warn("Old key = "+oldKey+ ", New key = "+newKey);
        var newKey = event.target.value;
        const newSelectedValues = [...columnList];
        newSelectedValues[index] = newKey;
        setColumnList(newSelectedValues);
        changeKeyName(oldKey, newKey);
    }

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





                            <Table stripped bordered hover size="sm" >
                                <thead>
                                    <tr>
                                        <th>Column</th>
                                        <th>Column name</th>
                                        <th>Column map to</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        columnList.map((defaultValue, index) => (
                                            <tr>
                                                <td>{index}</td>
                                                <td>{defaultValue}</td>
                                                <td>
                                                    <select
                                                        key={index}
                                                        value={defaultValue}
                                                        onChange={(event) => handleChange(defaultValue, index, event)}
                                                    >
                                                        {
                                                            options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </Table>
                            
                            <h3>Change Data</h3>
                            <pre>{JSON.stringify(data.csv_data, null, 2)}</pre>







                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
