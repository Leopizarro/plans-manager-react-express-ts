import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne } from "typeorm"
import { Project } from "./Project"
import { ProjectActivityImportance } from "./ProjectActivityImportance"
import { MilestoneStage } from "./MilestoneStage"

@Entity()
export class ProjectMilestone {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'timestamptz'})
    createdAt: Date

    @Column({ type: 'timestamptz', nullable: true})
    completedAt: Date

    @Column()
    observation: string

    @ManyToOne(() => Project, (project) => project.projectMilestones, {onDelete: "CASCADE"})
    project: Project

    @ManyToOne(() => ProjectActivityImportance, (projectActivityImportance) => projectActivityImportance.projectMilestones)
    projectActivityImportance: ProjectActivityImportance

    @ManyToOne(() => MilestoneStage, (milestoneStage) => milestoneStage.projectMilestones)
    milestoneStage: MilestoneStage

}