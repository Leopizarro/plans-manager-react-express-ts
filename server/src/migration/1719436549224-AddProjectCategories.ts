import { MigrationInterface, QueryRunner } from "typeorm";
import { ProjectCategory } from "../entity/ProjectCategory";
import { AppDataSource } from "../data-source";
import { pCatSeeders } from "../seeders/projectCategoriesSeeders";

export class AddProjectCategories1719436549224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const projectCategoriesRepo = AppDataSource.getRepository(ProjectCategory);
        for await (const projectCategory of pCatSeeders) {
            const categoryExists = await projectCategoriesRepo.findOneBy({
                code: projectCategory.code,
            })
            if (!categoryExists) {
                const projectCategoryToSave = new ProjectCategory()
                projectCategoryToSave.code = projectCategory.code;
                projectCategoryToSave.description = projectCategory.description;
                await projectCategoriesRepo.save(projectCategoryToSave);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const projectCategoriesRepo = AppDataSource.getRepository(ProjectCategory);
        for await (const pC of pCatSeeders) {
            const projCategToRemove = await projectCategoriesRepo.findOneBy({
                code: pC.code,
            })
            await projectCategoriesRepo.remove(projCategToRemove);
        }
    }

}
