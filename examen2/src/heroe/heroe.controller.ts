import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { HeroeService } from './heroe.service';
import { CreateHeroeDto } from './dto/create-heroe.dto';
import { UpdateHeroeDto } from './dto/update-heroe.dto';

@Controller('heroe')
export class HeroeController {
  constructor(private readonly heroeService: HeroeService) {}

  @Post()
  create(@Body() createHeroeDto: CreateHeroeDto) {
    return this.heroeService.create(createHeroeDto);
  }

  @Get()
  findAll() {
    return this.heroeService.findAll();
  }

  @Get('codigo/:codigo')
  findOneByCodigo(@Param('codigo') codigo: string) {
    return this.heroeService.findOneByCodigo(codigo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroeService.findOne(+id);
  }

  @Get('habilidades/rango')
  findBySkillPercentage(@Query('min') min: string, @Query('max') max: string) {
    console.log(`Received min: ${min}, max: ${max}`); // Debugging line

    const minPercentage = parseInt(min, 10);
    const maxPercentage = parseInt(max, 10);

    console.log(`Converted minPercentage: ${minPercentage}, maxPercentage: ${maxPercentage}`); // Debugging line

    if (isNaN(minPercentage) || isNaN(maxPercentage)) {
      throw new BadRequestException('Invalid min or max percentage value');
    }

    return this.heroeService.findBySkillPercentage(minPercentage, maxPercentage);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroeDto: UpdateHeroeDto) {
    return this.heroeService.update(+id, updateHeroeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroeService.remove(+id);
  }
}
