import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'heroe' })
export class Heroe {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id?: number;

    @Field(() => String)
    @Column()
    codigo: string;

    @Field(() => String)
    @Column()
    nombre: string;

    @Field(() => String)
    @Column()
    poderes: string;

    @Field(() => String)
    @Column()
    detalle_del_vestuario: string;

    @Field(() => Int)
    @Column()
    porcentaje_de_habilidad: number;

    @Field(() => String)
    @Column()
    fecha_de_ultima_batalla: string;

    @Field(() => String)
    @Column()
    empresa: string;

    @Field(() => String)
    @Column()
    estado: string;
}
