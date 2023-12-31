import { DataSource, DataSourceOptions } from 'typeorm'
import { UserEntity } from '../users/users.entity'
import { resolve } from 'path';

export const dataSourseOptions: DataSourceOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'test',
    entities: [
        UserEntity
        // __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    migrations: ['dist/migrations/*.js'],
    migrationsRun: true,
    logging: 'all',
}

const dataSource = new DataSource(dataSourseOptions);
export default dataSource;