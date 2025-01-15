import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        toast.error("Error fetching employees!");
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  const addEmployee = async (employee) => {
    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      if (!response.ok) throw new Error("Failed to add employee");
      const newEmployee = await response.json();
      setEmployees((prev) => [...prev, newEmployee]);
    } catch (error) {
      toast.error("Error adding employee!");
      console.error(error);
    }
  };

  const updateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      });
      if (!response.ok) throw new Error("Failed to update employee");
      const updatedData = await response.json();
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? updatedData : emp))
      );
    } catch (error) {
      toast.error("Error updating employee!");
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete employee");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Error deleting employee!");
      console.error(error);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

