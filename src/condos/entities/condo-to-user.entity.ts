import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Condo } from "./condo.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
@Unique(['condo', 'user'])
export class CondoToUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isManager: boolean;

  @ManyToOne(() => Condo, (condo) => condo.condoToUsers)
  condo: Condo;

  @ManyToOne(() => User, (user) => user.condoToUsers)
  user: User;

}