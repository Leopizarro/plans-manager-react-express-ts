import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToMany, JoinTable, OneToMany, ManyToOne, Relation } from "typeorm"
import { ProjectCategory } from "./ProjectCategory"
import { ProjectMilestone } from "./ProjectMilestone"
import { User } from "./User"

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    projectTitle: string

    @Column()
    description: string

    @Column()
    completionRate: number

    @Column({ type: 'timestamptz'})
    createdAt: Date

    @Column({ type: 'timestamptz'})
    updatedAt: Date

    @ManyToMany(() => ProjectCategory, (projectCategory) => projectCategory.projects)
    @JoinTable()
    projectCategories: Relation<ProjectCategory[]>

    @OneToMany(() => ProjectMilestone, (projectMilestone) => projectMilestone.project)
    projectMilestones: Relation<ProjectMilestone[]>

    @ManyToOne(() => User, (user) => user.projects)
    user: Relation<User>

}