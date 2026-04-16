import { Injectable } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
constructor(@InjectRepository(TagEntity) private readonly tagRepo: Repository<TagEntity>) {}

    all(): Promise<TagEntity[]> {
        return this.tagRepo.find();
    }
}
