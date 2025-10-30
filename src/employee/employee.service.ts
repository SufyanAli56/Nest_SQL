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

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return await this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }
}
