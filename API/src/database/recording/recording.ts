import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  @Entity({ name: "Recording" })
  export class Recording extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
  
    @Column({ name: "transcription" })
    transcription: string;
  
    @Column({ name: "soap",nullable:true })
    soap: string

    @Column({ name: "summary", nullable:true})
    summary: string

    @Column({ name: "userId" , type: "uuid"})
    userId: string;

    @Column({ name: "patient" , type: "uuid",nullable:true})
    patient: string;
    
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
  