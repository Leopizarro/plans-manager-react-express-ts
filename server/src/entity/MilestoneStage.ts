import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ProjectMilestone } from "./ProjectMilestone"

@Entity()
export class MilestoneStage {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    description: string

    @OneToMany(() => ProjectMilestone, (projectMilestone) => projectMilestone.milestoneStage)
    projectMilestones: ProjectMilestone[]

}