import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // ✅ Create a new employee
  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return await this.employeeRepository.save(employee);
  }

  // ✅ Find all employees
  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  // ✅ Find one employee by ID
  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  // ✅ Update an existing employee
  async update(id: number, updateData: Partial<Employee>): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    Object.assign(employee, updateData);
    return await this.employeeRepository.save(employee);
  }

  // ✅ Delete an employee
  async delete(id: number): Promise<{ message: string }> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return { message: `Employee with id ${id} deleted successfully` };
  }

  // ✅ Search employees using QueryBuilder
  async search(filters: Partial<Employee>): Promise<Employee[]> {
    const query = this.employeeRepository.createQueryBuilder('employee');

    if (filters.name) {
      query.andWhere('employee.name ILIKE :name', { name: `%${filters.name}%` });
    }

    if (filters.position) {
      query.andWhere('employee.position ILIKE :position', { position: `%${filters.position}%` });
    }

    if (filters.department) {
      query.andWhere('employee.department ILIKE :department', { department: `%${filters.department}%` });
    }

    return await query.getMany();
  }
}
