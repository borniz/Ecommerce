import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });
    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }
  async getUsersById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);
    }
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }
  async createUser(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);
    const userdb = await this.usersRepository.findOne({
      where: { id: newUser.id },
      select: [
        'id',
        'name',
        'email',
        'password',
        'country',
        'phone',
        'address',
        'city',
        'orders',
      ],
    });
    const { password, ...userNoPassword } = userdb;

    return userNoPassword;
  }

  async updateUser(id: string, userdate: Users) {
    await this.usersRepository.update(id, userdate);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }
  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }
  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
