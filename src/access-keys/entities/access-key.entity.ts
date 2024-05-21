import { Condo } from "condos/entities/condo.entity";
import { User } from "users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['keyString', 'condo'])
export class AccessKey {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Condo, (condo) => condo.accessKeys)
  condo: Condo;

  @Column()
  keyString: string;

  @Column({ nullable: true })
  description?: string;

  /**
   * User who created this access key.
   */
  @ManyToOne(() => User, (user) => user.accessKeys)
  user?: User;

  @Column({ nullable: true })
  validFrom?: Date;

  @Column({ nullable: true })
  validTo?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  isValid(): boolean {
    const now = new Date();
    return (this.deletedAt == null)
        && (this.validFrom == null || now >= this.validFrom)
        && (this.validTo == null || now <= this.validTo);
  }
}
