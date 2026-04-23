import { UserEntity } from '@app/user/user.entity';
import { Request } from '@nestjs/common';

export interface ExtendedRequest extends Request {
    user?: UserEntity | null;
}