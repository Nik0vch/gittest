import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1692954484446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "firstName",
                    type: "text",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "lastName",
                    type: "text",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "age",
                    type: "int",
                    length: "3",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "text",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "text",
                    length: "50",
                    isNullable: false,
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
