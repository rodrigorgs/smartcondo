import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: true })
  password?: string;

  @Column({ type: 'text' })
  name: string;

  createdAt: Date;
  updatedAt: Date;
}
