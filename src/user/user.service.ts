import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponse } from './types/user-response';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

    async createUser(dto: CreateUserDto) {
        const userByEmail = await this.userRepo.findOneBy({email: dto.email});
        if (userByEmail) {
            throw new HttpException('Email already in use', HttpStatus.UNPROCESSABLE_ENTITY);
        }
 
        const userByUsername = await this.userRepo.findOneBy({username: dto.username});
        if (userByUsername) {
            throw new HttpException('Username already in use', HttpStatus.UNPROCESSABLE_ENTITY);
        }


        const user = new UserEntity();
        Object.assign(user, dto);

        return this.userRepo.save(user);
    }

    buildUserResponse(user: UserEntity): UserResponse {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }

    async login(dto: LoginUserDto)  {
        const userByEmail = await this.userRepo.findOne(
            {
                where: {email: dto.email},
                select: ['id', 'username', 'email', 'password', 'bio', 'image']
            }, 
        );
        
        if (!userByEmail) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const isCorrectPassword = await compare(dto.password, userByEmail.password);

        if (!isCorrectPassword) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        
        const {password, ...user} = userByEmail;

        return user as UserEntity;
    }

    async getUserById(id: number) {
        return this.userRepo.findOneBy({id});
    }

    private generateJwt(user: UserEntity) {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, JWT_SECRET)
    }
}
