import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGORUL), JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
