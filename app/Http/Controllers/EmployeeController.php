<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::all();
        return Inertia::render('Employee/EmployeeList', ['employeeList' => $employees]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/CreateForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
                'name' => 'required',
                'email' => 'required|email|unique:employees',
                'address' => 'required',
                'image' => 'required|mimes:jpg,jpeg,png',
            ]);

        if($validator->fails()){
            return response()->json($validator->messages());
        }else{
            $employee = new Employee();
            $employee->name = $request->name;
            $employee->email = $request->email;
            $employee->address = $request->address;

            if($file = $request->file('image')){
                $dir = "images/employees";
                if(!is_dir(public_path($dir))){ // create folder
                    mkdir(public_path($dir), 0770, true);
                }

                $fileName = time().'.'.$file->getClientOriginalExtension();
                $file->move(public_path($dir), $fileName); // fill upload
                $employee->image = $dir.'/'. $fileName;
            }
            $employee->save();
            return to_route('employee.index', ['data' => "sjdbfjdsb fdsbfsb fjdsjfb djfdfjd dfg dfg"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
