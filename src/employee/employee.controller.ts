import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employees.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() employeeData: Partial<Employee>) {
    return await this.employeeService.create(employeeData);
  }

  
  @Get('search')
  async searchEmployee(
    @Query('name') name?: string,
    @Query('position') position?: string,
    @Query('department') department?: string,
  ): Promise<Employee[]> {
    return await this.employeeService.search({ name, position, department });
  }

@UseGuards(SupabaseAuthGuard)
  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

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
    return { success: true, message: result.message };
  }
}
