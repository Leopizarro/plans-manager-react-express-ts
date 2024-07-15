import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Project } from "./Project"

@Entity()
export class ProjectCategory {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    description: string

    @ManyToMany(() => Project, (project) => project.projectCategories)
    projects: Project[]

}