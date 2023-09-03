import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1692954484446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                { 
                    name: "first_name",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "last_name",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "age",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "text",
                    isNullable: false,
                },
            ],
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
