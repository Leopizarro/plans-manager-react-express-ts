import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Project } from "./Project"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[]

}
