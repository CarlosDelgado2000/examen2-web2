import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HeroeService } from './heroe.service';
import { Heroe } from './entities/heroe.entity';
import { CreateHeroeDto } from './dto/create-heroe.input';
import { UpdateHeroeInput } from './dto/update-heroe.input';

@Resolver(() => Heroe)
export class HeroeResolver {
  constructor(private readonly heroeService: HeroeService) {}

  @Query(() => [Heroe], { name: 'Heroes' })
  findAll() {
    return this.heroeService.findAll();
  }

  @Query(() => Heroe, { name: 'id_heroe' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.heroeService.findOne(id);
  }

  @Query(() => Heroe, { name: 'codigo_heroe' })
  findOneByCodigo(@Args('codigo', { type: () => String }) codigo: string) {
    return this.heroeService.findOneByCodigo(codigo);
  }

  @Query(() => [Heroe], { name: 'porcentaje_de_habilidad' })
  findAllBycosto() {
    return this.heroeService.findAllBycosto();
  }

  @Query(() => [Heroe], { name: 'porcentaje_de_habilidad_heroe' })
  findAllBycosto_aproximado(@Args('costo_aproximado', { type: () => Int }) costo_aproximado: number) {
    return this.heroeService.findAllBycosto_aproximado(costo_aproximado);
  }

  @Mutation(() => Heroe)
  createHeroe(@Args('createHeroeInput') createHeroeInput: CreateHeroeDto) {
    return this.heroeService.create(createHeroeInput);
  }

  @Mutation(() => Heroe)
  updateHeroe(@Args('updateHeroeInput') updateHeroeInput: UpdateHeroeInput) {
    return this.heroeService.update(updateHeroeInput);
  }

  @Mutation(() => Heroe)
  softDeleteHeroe(@Args('id', { type: () => Int }) id: number) {
    return this.heroeService.softDelete(id);
  }

  @Mutation(() => Heroe)
  hardDeleteHeroe(@Args('id', { type: () => Int }) id: number) {
    return this.heroeService.hardDelete(id);
  }
}
