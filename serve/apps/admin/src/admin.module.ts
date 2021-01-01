import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

// 阿里云存储
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      // 云存储
      // storage: MAO({
      //   config: {
      //     region: '<region>',
      //     accessKeyId: '<accessKeyId>',
      //     accessKeySecret: '<accessKeySecret>',
      //     bucket: '<bucket>',
      //   },
      // }),
      // 本地存储
      dest: 'uploads',
    }),
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
