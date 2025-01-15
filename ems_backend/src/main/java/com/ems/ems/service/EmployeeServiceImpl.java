package com.ems.ems.service;

import com.ems.ems.dto.EmployeeDto;
import com.ems.ems.entity.Employee;
import com.ems.ems.exception.ResourceNotFoundException;
import com.ems.ems.mapper.EmployeeMapper;
import com.ems.ems.repository.EmployeeRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepo employeeRepo;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee createEmployee = employeeRepo.save(employee);
        return EmployeeMapper.mapToEmployeeDto(createEmployee);
    }
    @Override
    public EmployeeDto getEmployeeById(long employeeId) {
        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with id " + employeeId + " not found"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepo.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with id " + employeeId + " not found"));
        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());
        Employee updateEmployee1 = employeeRepo.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updateEmployee1);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with id " + employeeId + " not found"));
        employeeRepo.deleteById(employeeId);

    }
}






