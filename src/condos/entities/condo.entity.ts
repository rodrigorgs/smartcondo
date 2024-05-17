import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CondoToUser } from "./condo-to-user.entity";
import { Device } from "src/devices/entities/device.entity";
import { AccessKey } from "src/access-keys/entities/access-key.entity";

@Entity()
export class Condo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @OneToMany(() => CondoToUser, (condoToUser) => condoToUser.condo)
  condoToUsers: CondoToUser[];

  @OneToMany(() => Device, (device) => device.condo)
  devices: Device[];

  @OneToMany(() => AccessKey, (accessKey) => accessKey.condo)
  accessKeys: AccessKey[];
}
