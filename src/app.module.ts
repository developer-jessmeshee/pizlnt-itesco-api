import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerModule } from './modules/careers/career.module';
import { PositionModule } from './modules/position/position.module';
import { RoleModule } from './modules/roles/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    CareerModule,
    PositionModule,
    RoleModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        maxPoolSize: parseInt(config.get('MONGO_MAX_POOL', '100')),
        minPoolSize: parseInt(config.get('MONGO_MIN_POOL', '0')),
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        autoIndex: config.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
