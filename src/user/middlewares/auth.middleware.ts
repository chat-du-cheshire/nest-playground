import { JWT_SECRET } from "@app/config";
import { ExtendedRequest } from "@app/types/extended-request.type";
import {Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
constructor(@Inject() private readonly userService: UserService) {}

    async use(req: ExtendedRequest, res: Response, next: Function) {
        if (!req.headers['authorization']) {
            req.user = null;
            next();
            return;
        }

        const [, token] = req.headers['authorization'].split(' ');

        try {
            const decoded = verify(token, JWT_SECRET);
            req.user = await this.userService.getUserById(decoded.id);
        } catch (err) {
            req.user = null;
        }

        next();
    }
}