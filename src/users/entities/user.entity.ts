import { AccessKey } from "src/access-keys/entities/access-key.entity";
import { CondoToUser } from "src/condos/entities/condo-to-user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAdmin: boolean;
  
  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  givenName?: string;

  @Column({ type: 'text' })
  familyName?: string;

  @Column({ type: 'text' })
  picture?: string;

  @OneToMany(() => CondoToUser, (condoToUser) => condoToUser.user)
  condoToUsers: CondoToUser[];

  @OneToMany(() => AccessKey, (accessKey) => accessKey.user)
  accessKeys: AccessKey[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
