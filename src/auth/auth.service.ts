import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/users.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new BadRequestException('Credentiales incorrectas');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException('Credentiales incorrectas');

    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario logueado',
      token,
    };
  }
  getAuth() {
    throw new Error('Method not implemented.');
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser) throw new BadGatewayException('Email ya esta registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
