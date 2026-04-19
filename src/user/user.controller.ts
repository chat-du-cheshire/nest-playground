import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') dto: CreateUserDto) {
        const user = await this.userService.createUser(dto);
        return this.userService.buildUserResponse(user);
    }
}
