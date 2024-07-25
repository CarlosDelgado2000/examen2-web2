import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Heroe } from './entities/heroe.entity';
import { CreateHeroeDto } from './dto/create-heroe.input';
import { UpdateHeroeInput } from './dto/update-heroe.input';

@Injectable()
export class HeroeService {
  constructor(
    @InjectRepository(Heroe)
    private readonly heroeRepository: Repository<Heroe>,
  ) {}

  async findAll(): Promise<Heroe[]> {
    return this.heroeRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Heroe | null> {
    return this.heroeRepository.findOneBy({ id, isDeleted: false });
  }

  async findOneByCodigo(codigo: string): Promise<Heroe | null> {
    return this.heroeRepository.findOneBy({ codigo, isDeleted: false });
  }

  async findAllBycosto(): Promise<Heroe[]> {
    return this.heroeRepository.find({
      where: {
        porcentaje_de_habilidad: LessThanOrEqual(1000),
        isDeleted: false,
      },
    });
  }

  async findAllBycosto_aproximado(costo_aproximado: number): Promise<Heroe[]> {
    if (costo_aproximado > 1000) {
      throw new Error('El valor de costo_aproximado no debe ser mayor a 1000');
    }
    return this.heroeRepository.find({
      where: {
        porcentaje_de_habilidad: LessThanOrEqual(costo_aproximado),
        isDeleted: false,
      },
    });
  }

  async create(createHeroeInput: CreateHeroeDto): Promise<Heroe> {
    const newHeroe = this.heroeRepository.create(createHeroeInput);
    return this.heroeRepository.save(newHeroe);
  }

  async update(updateHeroeInput: UpdateHeroeInput): Promise<Heroe | null> {
    const { id, ...updateData } = updateHeroeInput;
    await this.heroeRepository.update(id, updateData);
    return this.heroeRepository.findOneBy({ id });
  }

  async softDelete(id: number): Promise<Heroe | null> {
    const heroe = await this.heroeRepository.findOneBy({ id });
    if (heroe) {
      await this.heroeRepository.update(id, { isDeleted: true });
    }
    return heroe;
  }

  async hardDelete(id: number): Promise<Heroe | null> {
    const heroe = await this.heroeRepository.findOneBy({ id });
    if (heroe) {
      await this.heroeRepository.delete(id);
    }
    return heroe;
  }
}
