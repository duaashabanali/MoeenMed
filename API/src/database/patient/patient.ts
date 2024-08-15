import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  @Entity({ name: "Patient" })
  export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
  
    @Column({ name: "fullName" })
    fullName: string;

    @Column({ name: "date" })
    date: string;

    @Column({ name: "gender" })
    gender: string;

    @Column({ name: "phoneNumber" })
    phoneNumber: string;

    @Column({ name: "address" })
    address: string;

    @Column({ name: "streetAddress" })
    streetAddress: string;

    @Column({ name: "city" })
    city: string;

    @Column({ name: "state" })
    state: string;

    @Column({ name: "zipcode" })
    zipcode : string;
  
    @Column({ name: "userId" , type: "uuid"})
    userId: string;
    
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
  