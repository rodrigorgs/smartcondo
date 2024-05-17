import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Condo } from "./condo.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class CondoToUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAdmin: boolean;

  @ManyToOne(() => Condo, (condo) => condo.condoToUsers)
  condo: Condo;

  @ManyToOne(() => User, (user) => user.condoToUsers)
  user: User;

}