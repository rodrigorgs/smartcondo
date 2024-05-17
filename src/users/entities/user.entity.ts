import { CondoToUser } from "src/condos/entities/condo-to-user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  givenName?: string;

  @Column({ type: 'text' })
  familyName?: string;

  @Column({ type: 'text' })
  picture?: string;

  @ManyToOne(() => CondoToUser, (condoToUser) => condoToUser.user)
  condoToUsers: CondoToUser[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
