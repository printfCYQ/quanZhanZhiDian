import { Episode } from '@libs/db/models/episode.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { Get } from '@nestjs/common';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode,
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));

    return {
      title: '课时管理',
      translate: false,
      searchMenuSpan: 8, //搜索按钮一行显示
      column: [
        {
          prop: 'course',
          label: '所属课程',
          type: 'select',
          dicData: courses,
          row: true,
        },
        {
          prop: 'name',
          label: '课时名称',
          sortable: true,
          search: true,
          regex: true,
          span: 24,
          row: true,
        },
        {
          prop: 'file',
          label: '视频文件',
          type: 'upload',
          listType: 'picture-img',
          action: 'upload',
          width: '120',
          row: true,
        },
      ],
    };
  }
}
