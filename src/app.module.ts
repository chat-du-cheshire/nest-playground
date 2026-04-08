import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagsModule } from '@app/tags/tags.module';

@Module({
  imports: [TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
