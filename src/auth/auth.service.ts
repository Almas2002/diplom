import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcrypt"
require("dotenv").config()
@Injectable()
export class AuthService {
  constructor( private jwtService: JwtService, private userService: UserService) {
  }

  private generationToken(user: User) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(data: UserLoginDto) {
    const user = await this.validation(data);
    const tokens = await this.generationToken(user);
    return { ...tokens };
  }

  async registration(data: UserLoginDto, admin: boolean = false, worker: boolean = false) {
    const hashPassword = await bcrypt.hash(data.password, 5);
    const candidate = await this.userService.getUserByEmail(data.email);
    if (candidate) {
      throw new HttpException('такой пользователь уже существует', 400);
    }
    let rol = admin ? 'SUPER-ADMIN' : 'USER';
    const user = await this.userService.create({ ...data, password: hashPassword }, rol);

    const tokens = await this.generationToken(user);
    return { ...tokens };

  }

  private async validation(dto: UserLoginDto): Promise<User> {
    const user = await this.userService.getUserByEmail(dto.email);
    const errors = {};
    if (!user) {
      errors['email'] = ['Некорректный телефон номер'];
      throw new HttpException({ errors }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const campfirePassword = await bcrypt.compare(dto.password, user.password);
    if (!campfirePassword) {
      errors['password'] = ['Некорректный пороль'];
      throw new HttpException({ errors }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return user;
  }



}