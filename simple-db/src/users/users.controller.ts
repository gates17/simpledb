// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() body): Promise<any> {
    return await this.usersService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.usersService.findOne(id);
  }

  @Get('name/:user')
  async findOneName(@Param('user') user: string): Promise<any> {
    return await this.usersService.findOneName(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.usersService.delete(id);
  }
}
