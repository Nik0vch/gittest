import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddActivatedColumn1693645807437 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'activated',
            type: 'boolean',
            isNullable: false,
            default: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'activated');
    }

}
