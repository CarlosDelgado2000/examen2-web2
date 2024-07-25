import { Module } from '@nestjs/common';
import { HeroeService } from './heroe.service';
import { HeroeResolver } from './heroe.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heroe } from './entities/heroe.entity';

@Module({
  providers: [HeroeResolver, HeroeService],
  imports: [ TypeOrmModule.forFeature([Heroe]) ],
  exports: [ TypeOrmModule ],
})
export class HeroeModule {}
