### 全局安装
```
npm i -g @nestjs/cli
```

### 新建一个nest框架的服务器server
```
nest new server
```

### 在server文件目录下（cd server）新建一个名为admin的子目录
admin作为后台接口，server作为app端接口
```
nest g app admin
```

### 启动项目运行admin
```
nest start -w admin
```

### 创建一个库lib，它独立于apps模块，lib中包含一个db模块，默认的前缀是@app,此处为了方便，更改为@libs
```
nest g lib db
```

### 安装针对ts的数据库typegoose
```
yarn add nestjs-typegoose @typegoose/typegoose
```

### 因为typegoose依赖于mongoose，所以安装 mongoose
```
yarn add mongoose @types/mongoose
```

### db.module 连接数据库
```
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([User]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/quanzhan', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}

```

### 在libs目录下创建一个新的文件夹models，用来存放所有的数据库模型
然后在models文件夹下创建一个user.model.ts文件，假设user模块中有两个属性：username和password，文件内容
```
import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  username: string;

  @prop()
  password: string;
}

```

### 将user模型与db.module.ts相关联
```
import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([User])


@Global()
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/test',{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }),
    models,
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}

```

### 现在admin就可以直接使用user
但是为了解耦和代码清晰，我们不将user放入app层级，而是在admin的src目录下新建一个子模块
```
nest g mo -p admin users 
```
此处-p admin 用于指定user新建于admin子项目下
同时新建一个UserController
```
nest g co -p admin users co（控制器）
```
### 添加模块的 crud，crud这个接口可以实现增删查改
```
yarn add nestjs-mongoose-crud
```
### 安装接口文档依赖
```
yarn add @nestjs/swagger swagger-ui-express
````