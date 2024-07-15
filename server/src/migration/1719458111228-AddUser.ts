import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class AddUser1719458111228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersRepo = AppDataSource.getRepository(User);
        await usersRepo.save({
            firstName: 'Leonardo',
            lastName: 'Pizarro',
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usersRepo = AppDataSource.getRepository(User);
        const userInDb = await usersRepo.findOneBy({
            firstName: 'Leonardo',
            lastName: 'Pizarro',
        })
        if (userInDb) {
            await usersRepo.remove(userInDb);
        }
    }

}
