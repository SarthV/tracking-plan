import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export class DateTimeBaseEntity {
    @CreateDateColumn({
        name: 'created_at',
    })
    public createdAt: Date = new Date();

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date = new Date();

    @Column({type : "boolean"})
    isDeleted: boolean = false;
}