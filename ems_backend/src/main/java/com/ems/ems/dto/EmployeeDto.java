package com.ems.ems.dto;


import lombok.*;



@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class EmployeeDto {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
}

