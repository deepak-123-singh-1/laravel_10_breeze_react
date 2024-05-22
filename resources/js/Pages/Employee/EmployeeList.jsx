import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
const BASE_URL = import.meta.env.VITE_ASSET_URL;


export default function Dashboard({ auth }) {
    const { employeeList } = usePage().props
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <div className="flex">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee List</h2>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Link tabIndex="1"
                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                            href={route("employee.create")}>Add Form</Link>
                    </div>
                </div>
            }
        >
            <Head title="Employee List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 w-20">No.</th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">Email</th>
                                            <th className="px-4 py-2">Address</th>
                                            <th className="px-4 py-2">Image</th>
                                            <th className="px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeList.map(({ id, name, email, address, image }) => (
                                            <tr>
                                                <td className="border px-4 py-2">{ id }</td>
                                                <td className="border px-4 py-2">{ name }</td>
                                                <td className="border px-4 py-2">{ email }</td>
                                                <td className="border px-4 py-2">{ address }</td>
                                                <td className="border px-4 py-2">
                                                    <img src={ BASE_URL + image } width="100px" />
                                                    
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        >Edit</Link>
                                                    
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                        >Delete</Link>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
