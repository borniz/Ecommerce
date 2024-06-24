import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/users.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async findAll(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  findOne(id: string) {
    return this.usersRepository.getUsersById(id);
  }

  async update(id: string, updateUserDto: any) {
    const updateUser = await this.usersRepository.updateUser(id, updateUserDto);
    return updateUser;
  }

  async remove(id: string) {
    const deleteUser = await this.usersRepository.deleteUser(id);
    return deleteUser;
  }
}
