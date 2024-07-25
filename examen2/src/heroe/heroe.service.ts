import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateHeroeDto } from './dto/create-heroe.dto';
import { UpdateHeroeDto } from './dto/update-heroe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Heroe } from './entities/heroe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroeService {
  constructor(
    @InjectRepository(Heroe)
    private readonly heroeRepository: Repository<Heroe>,
  ) {}

  async create(createHeroeDto: CreateHeroeDto): Promise<Heroe> {
    const heroe = this.heroeRepository.create(createHeroeDto);
    return this.heroeRepository.save(heroe);
  }

  async findAll(): Promise<Heroe[]> {
    return this.heroeRepository.find();
  }

  async findOne(id: number): Promise<Heroe> {
    return this.heroeRepository.findOneBy({ id });
  }

  async findOneByCodigo(codigo: string): Promise<Heroe> {
    return this.heroeRepository.findOneBy({ codigo });
  }

  async findBySkillPercentage(min: number, max: number): Promise<Heroe[]> {
    // Validar los porcentajes
    if (isNaN(min) || isNaN(max) || min > max) {
      throw new BadRequestException('Invalid min or max percentage value');
    }

    try {
      const heroes = await this.heroeRepository
        .createQueryBuilder('heroe')
        .where('heroe.porcentaje_de_habilidad BETWEEN :min AND :max', { min, max })
        .getMany();
      
      // Verificar si se obtuvieron resultados
      if (heroes.length === 0) {
        throw new BadRequestException('No heroes found within the given percentage range');
      }

      return heroes;
    } catch (error) {
      throw new BadRequestException(`Error fetching heroes: ${error.message}`);
    }
  }

  async update(id: number, updateHeroeDto: UpdateHeroeDto): Promise<Heroe> {
    await this.heroeRepository.update(id, updateHeroeDto);
    return this.heroeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.heroeRepository.delete(id);
  }
}
