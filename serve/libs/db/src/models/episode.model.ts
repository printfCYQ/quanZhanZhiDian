import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @prop()
  // 课程名
  name: string;

  // 文件
  @prop()
  file: string;
}
