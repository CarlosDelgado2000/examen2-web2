import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroeService } from './heroe.service';
import { HeroeController } from './heroe.controller';  // Cambiado a Controller
import { Heroe } from './entities/heroe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Heroe])],
  providers: [HeroeService],
  controllers: [HeroeController],  // Agregado el controlador
  exports: [HeroeService],
})
export class HeroeModule {}
