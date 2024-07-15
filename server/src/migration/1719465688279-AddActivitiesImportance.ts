import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProjectActivityImportance } from "../entity/ProjectActivityImportance";
import { activityImportanceSeeders } from "../seeders/activityImportancesSeeders";

export class AddActivitiesImportance1719465688279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const actImportanceRepo = AppDataSource.getRepository(ProjectActivityImportance);
        for await (const actImpSeeder of activityImportanceSeeders) {
            const categoryExists = await actImportanceRepo.findOneBy({
                code: actImpSeeder.code,
            })
            if (!categoryExists) {
                const actImportanceToSave = new ProjectActivityImportance()
                actImportanceToSave.code = actImpSeeder.code;
                actImportanceToSave.description = actImpSeeder.description;
                await actImportanceRepo.save(actImportanceToSave);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const actImportanceRepo = AppDataSource.getRepository(ProjectActivityImportance);
        for await (const actImpSeeder of activityImportanceSeeders) {
            const actImportanceToRemove = await actImportanceRepo.findOneBy({
                code: actImpSeeder.code,
            })
            await actImportanceRepo.remove(actImportanceToRemove);
        }
    }

}
