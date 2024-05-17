import { Condo } from "src/condos/entities/condo.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['identifier', 'condo'])
@Unique(['slug', 'condo'])
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;
  
  @Column()
  name: string;

  @Column()
  @Index()
  slug: string;

  @ManyToOne(() => Condo, (condo) => condo.devices)
  condo: Condo;
}
