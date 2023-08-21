import { Users } from "src/user/entities/users.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type:'postgres',
    host:"127.0.0.1",
    port:5432,
    username:"postgres",
    password: "password",
    database:"userDB",
    synchronize:false,
    entities:[Users],
    migrations:['dist/db/migrations/*.js']
};
console.log(process.env.POSTGRES_USER,process.env.POSTGRES_PASSWORD )             //undefined undefined
const dataSource = new DataSource(dataSourceOptions);
export default dataSource