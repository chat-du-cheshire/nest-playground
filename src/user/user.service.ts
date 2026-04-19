import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponse } from './types/user-response';

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

    private generateJwt(user: UserEntity) {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, JWT_SECRET)
    }
}
