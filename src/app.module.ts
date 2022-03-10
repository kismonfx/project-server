import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.kt1rp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ProductModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
