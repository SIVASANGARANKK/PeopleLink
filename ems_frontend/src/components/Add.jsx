
import React, { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useContext(EmployeeContext);
  const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (newEmployee.firstName && newEmployee.lastName && newEmployee.email) {
      addEmployee(newEmployee);
      setNewEmployee({ firstName: "", lastName: "", email: "" });
      toast.success("Employee added successfully!");
    } else {
      toast.error("All fields are required!");
    }
  };

  const handleEdit = (employee) => {
    setEditMode(true);
    setEditingEmployee(employee);
    setNewEmployee(employee);
  };

  const handleUpdate = () => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, newEmployee);
      setEditMode(false);
      setEditingEmployee(null);
      setNewEmployee({ firstName: "", lastName: "", email: "" });
      toast.success("Employee updated successfully!");
    }
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
    toast.success("Employee deleted successfully!");
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-white-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {editMode ? "Edit Employee" : "Add Employee"}
        </h2>
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="firstName"
            value={newEmployee.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            value={newEmployee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={newEmployee.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {editMode ? (
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Update Employee
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
            >
              Add Employee
            </button>
          )}
        </form>
      </div>
      <div className="mb-4 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Search Employee</h2>
        <div className="max-w-2xl flex items-center justify-center mx-auto mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees by name or email..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Employee List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-gray-600">Email: {employee.email}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(employee)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Add;
