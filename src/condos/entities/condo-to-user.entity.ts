import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Condo } from "./condo.entity";
import { User } from "users/entities/user.entity";

@Entity()
@Unique(['condo', 'user'])
export class CondoToUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isManager: boolean;

  @ManyToOne(() => Condo, (condo) => condo.condoToUsers, { nullable: false })
  condo: Condo;

  @ManyToOne(() => User, (user) => user.condoToUsers, { nullable: false })
  user: User;
}