import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateHeroeDto {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;

  @Field(() => String)
  @IsString()
  @IsOptional()
  codigo: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  poderes: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  detalle_del_vestuario: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  porcentaje_de_habilidad: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  fecha_de_ultima_batalla: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  empresa: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  estado: string;
  
}
