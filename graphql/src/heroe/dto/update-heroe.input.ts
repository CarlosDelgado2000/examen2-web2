import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHeroeDto } from './create-heroe.input';

@InputType()
export class UpdateHeroeInput extends PartialType(CreateHeroeDto) {
  @Field(() => Int)
  id: number;
}
