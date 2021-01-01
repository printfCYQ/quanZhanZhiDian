import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @prop()
  // 课时名
  name: string;

  // 文件
  @prop()
  file: string;

  // 课程名-id
  @prop({ ref: 'Course' })
  course: Ref<Course>;
}
