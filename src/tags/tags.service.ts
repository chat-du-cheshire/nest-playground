import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
    all() {
        return ['foo', 'bar', 'baz', 'moo']
    }
}
