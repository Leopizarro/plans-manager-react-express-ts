import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ProjectMilestone } from "./ProjectMilestone"

@Entity()
export class ProjectActivityImportance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    description: string

    @OneToMany(() => ProjectMilestone, (projectMilestone) => projectMilestone.projectActivityImportance)
    projectMilestones: ProjectMilestone[]

}