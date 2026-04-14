import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagsModule } from '@app/tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@app/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
