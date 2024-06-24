import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryConfig } from '../config/cloudinary';
import { CloudinaryRepository } from './cloudinary.repository';
import { CloudinaryService } from './cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig, CloudinaryRepository],
})
export class CloudinaryModule {}
