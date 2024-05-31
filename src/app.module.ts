import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './books/entities/book.entity';
import { Author } from './authors/entities/author.entity';
import { Sale } from './sales/entities/sale.entity';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { SalesModule } from './sales/sales.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Book, Author, Sale, User],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    BooksModule,
    AuthorsModule,
    SalesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
