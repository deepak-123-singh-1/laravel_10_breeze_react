import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import React from 'react';


export default function Dashboard({ auth }) {
    const { employeeList } = usePage().props
    const { data, setData, errors, post, progress } = useForm({
        name: "",
        email: "",
        address: "",
        image: null,
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        console.warn(data);

        post(route("employee.store"), data);
  
        // setData("title", "")
        // setData("file", null)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <div className="flex">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Add</h2>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Link tabIndex="1"
                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                            href={route('employee.index')}>Back</Link>
                    </div>
                </div>
            }
        >
            <Head title="Employee Add" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Name</label>
                                        <input type="text"
                                            className="w-full px-4 py-2"
                                            label="Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            } />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                        <input type="email"
                                            className="w-full px-4 py-2"
                                            label="Email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            } />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Address</label>
                                        <input type="text"
                                            className="w-full px-4 py-2"
                                            label="Address"
                                            name="address"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData("address", e.target.value)
                                            } />
                                        <span className="text-red-600">
                                            {errors.address}
                                        </span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="">File</label>
                                        <input type="file"
                                            className="w-full px-4 py-2"
                                            label="File"
                                            name="image"
                                            onChange={(e) =>
                                                setData("image", e.target.files[0])
                                            } />
                                        <span className="text-red-600">
                                            {errors.image}
                                        </span>
                                    </div>
                                </div>
  
                                <div className="mt-4">
                                    <button type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                        >Save</button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
