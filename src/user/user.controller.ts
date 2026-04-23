import { Body, Controller, Get, Inject, Post, Req, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { type ExtendedRequest } from '@app/types/extended-request.type';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') dto: CreateUserDto) {
        const user = await this.userService.createUser(dto);
        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') dto: LoginUserDto) {
        const user = await this.userService.login(dto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    async currentUser(@Request() req: ExtendedRequest) {
        return this.userService.buildUserResponse(req.user!);
    }
}
