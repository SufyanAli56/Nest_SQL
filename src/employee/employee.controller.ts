import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employees.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() employeeData: Partial<Employee>) {
    return await this.employeeService.create(employeeData);
  }
}
