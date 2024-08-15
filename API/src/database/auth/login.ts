import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Login" })
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "fullName"})
  fullName: string;

  @Column({ name: "email", unique: true })
  email: string;

  @Column({ name: "countryCode", default: null })
  countryCode: string;

  @Column({ name: "gender", default: null })
  gender: string;

  @Column({ name: "phoneNumber", default: null })
  phoneNumber: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "roleId", default: null})
  roleId: string;

  @Column({ name: "resetToken", default: null })
  resetToken: string ;

  @Column({ name: "isActive", default: true })
  isActive: boolean;

  @Column({
    name: "createdAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "updatedAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
