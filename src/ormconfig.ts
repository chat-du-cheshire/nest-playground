import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "mediumclone",
  password: "mediumclonepass",
  database: "mediumclone",
  entities: [__dirname + "/**/*.entity.{ts,js}"],
  synchronize: true,
};

export default config;