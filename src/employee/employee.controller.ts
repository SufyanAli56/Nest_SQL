import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employees.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() employeeData: Partial<Employee>) {
    return await this.employeeService.create(employeeData);
  }

  // GET /employee → get all employees
  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

  // GET /employee/:id → get one employee by ID
  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employee> {
    return await this.employeeService.findOne(id);
  }
  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() updateData: Partial<Employee>,
  ) {
    return await this.employeeService.update(id, updateData);
  }
  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    const result = await this.employeeService.delete(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
