import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Project } from "./entity/Project"
import { ProjectActivityImportance } from "./entity/ProjectActivityImportance"
import { ProjectCategory } from "./entity/ProjectCategory"
import { ProjectMilestone } from "./entity/ProjectMilestone"
import { AddProjectCategories1719436549224 } from "./migration/1719436549224-AddProjectCategories"
import { MilestoneStage } from "./entity/MilestoneStage"
import { AddMilestoneStages1719458101008 } from "./migration/1719458101008-AddMilestoneStages"
import { AddUser1719458111228 } from "./migration/1719458111228-AddUser"
import { AddActivitiesImportance1719465688279 } from "./migration/1719465688279-AddActivitiesImportance"
import 'dotenv/config'

const portNumber: number = Number(process.env.DB_PORT)

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: portNumber,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Project, ProjectActivityImportance, ProjectCategory, ProjectMilestone, MilestoneStage],
    migrations: [AddProjectCategories1719436549224, AddMilestoneStages1719458101008, AddUser1719458111228, AddActivitiesImportance1719465688279],
    subscribers: [],
})
