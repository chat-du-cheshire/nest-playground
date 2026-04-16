import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tags: TagsService) {}

    @Get()
    async all() {
        const tags = await this.tags.all();

        return {tags: tags.map(({name}) => name)};
    }
}
