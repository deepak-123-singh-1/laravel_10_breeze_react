import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

import { Button, Alert, Tabs, Tab, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Dashboard({ auth }) {

    const { data, setData, errors, post, progress } = useForm({
        name: "Deepak",
        csv_data: [],
        mappedHeader: []
    });
    const [headers, setHeaders] = useState([]);
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            processCsvData(text);
        };
        reader.readAsText(file);
    };
    
    const processCsvData = (text) => {
        const rows = text.split('\n');
        const headers = rows[0].split(',').map(header => header.trim().toLowerCase());
        const data = rows.slice(1).map(row => row.split(',').map(cell => cell.trim()));
        setHeaders(headers);
        setData({
            ...data,
            csv_data: data,
            mappedHeader : headers
        });
    };

    const options = ['name', 'email', 'state', 'city', 'date'];

    
    // Column List
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
        var newKey = event.target.value;
        // console.warn("Old key = "+oldKey+ ", New key = "+newKey);
        const newSelectedValues = [...headers];
        newSelectedValues[index] = newKey;
        // setColumnList(newSelectedValues);
        setHeaders(newSelectedValues);
        changeKeyName(oldKey, newKey);

    }
    // console.warn(columnList);
    

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

                            <input type="file" accept=".csv" onChange={handleFileUpload} />
                            {/* <div>
                                <table>
                                    <thead>
                                        <tr>
                                        {headers.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                            ))}
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}







                        <Table  bordered hover variant="dfs">
                            <thead>
                                <tr>
                                    <th>Column no</th>
                                    <th>Column name</th>
                                    <th>Value</th>
                                    <th>Map to</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {headers.map((header, index) => (
                                        <tr>
                                            <td>{ index }</td>
                                            <td key={index}>{ header }</td>
                                            <td>{ data.csv_data[0][index] }</td>
                                            <tr>
                                                <select
                                                    key={index}
                                                    value={header}
                                                    onChange={(event) => handleChange(header, index, event)} >
                                                        {
                                                            (header==options[index]) ? (
                                                                <option value="">--: Select :--</option>
                                                            ) : (
                                                                <option value={data.mappedHeader[index]}>--: New create :--</option>
                                                            )
                                                        }
                                                    {
                                                        options.map((row, key) => (
                                                            <option key={key} value={row}>
                                                                {row}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </tr>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>















{/* 
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
 */}






                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
