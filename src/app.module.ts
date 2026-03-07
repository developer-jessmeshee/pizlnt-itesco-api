import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerModule } from './careers/career.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule
      ],
      useFactory: async ( config: ConfigService ) => ({
        uri: config.get<string>( 'MONGO_URI' ),
        maxPoolSize: parseInt( config.get( 'MONGO_MAX_POOL', '100' ) ),
        minPoolSize: parseInt( config.get( 'MONGO_MIN_POOL', '0' ) ),
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        autoIndex: config.get('NODE_ENV') !== 'production',
      }),
      inject: [
        ConfigService
      ],
    }),
    CareerModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
