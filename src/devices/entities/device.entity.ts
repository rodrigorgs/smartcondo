import { Condo } from "condos/entities/condo.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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

  @ManyToOne(() => Condo, (condo) => condo.devices, { nullable: false })
  condo: Condo;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
