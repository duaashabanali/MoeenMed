import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Role" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "roleName" })
  roleName: string;

  @Column({ name: "roleConstraint" })
  roleConstraint: string;

  @Column({
    name: "createdAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "UpdatedAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  UpdatedAt: Date;
}
