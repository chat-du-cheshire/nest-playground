import { Injectable } from '@nestjs/common';
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
