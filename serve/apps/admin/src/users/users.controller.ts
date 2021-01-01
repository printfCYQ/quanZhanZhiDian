import { User } from '@libs/db/models/user.model';
import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';

import { ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) {}

  @Get('option')
  option() {
    return {
      title: '用户管理',
      searchMenuSpan: 8, //搜索按钮一行显示
      column: [
        {
          prop: 'username',
          label: '用户名',
          sortable: true,
          search: true,
          regex: true,
          row: true,
        },
      ],
    };
  }
}
