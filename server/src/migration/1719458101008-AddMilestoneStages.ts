import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { MilestoneStage } from "../entity/MilestoneStage";
import { milestoneStageSeeders } from "../seeders/milestoneStagesSeeders";

export class AddMilestoneStages1719458101008 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const milestoneStagesRepo = AppDataSource.getRepository(MilestoneStage);
        for await (const mStage of milestoneStageSeeders) {
            const mStageExists = await milestoneStagesRepo.findOneBy({
                code: mStage.code,
            })
            if (!mStageExists) {
                const mStageToSave = new MilestoneStage()
                mStageToSave.code = mStage.code;
                mStageToSave.description = mStage.description;
                await milestoneStagesRepo.save(mStageToSave);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const milestoneStagesRepo = AppDataSource.getRepository(MilestoneStage);
        for await (const mStage of milestoneStageSeeders) {
            const projCategToRemove = await milestoneStagesRepo.findOneBy({
                code: mStage.code,
            })
            await milestoneStagesRepo.remove(projCategToRemove);
        }
    }

}
