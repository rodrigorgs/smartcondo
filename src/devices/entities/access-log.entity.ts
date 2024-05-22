import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";
import { User } from "users/entities/user.entity";
import { AccessKey } from "access-keys/entities/access-key.entity";

@Entity()
export class DeviceActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device, { nullable: false })
  device: Device;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, { nullable: true })
  loggedInUser?: User;

  @ManyToOne(() => AccessKey, { nullable: true })
  accessKey?: AccessKey;

  @Column()
  successful: boolean;
}