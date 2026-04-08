import { Controller, Get } from '@nestjs/common';

@Controller('tags')
export class TagsController {

    @Get()
    all() {
        return ['foo', 'bar', 'baz']
    }
}
