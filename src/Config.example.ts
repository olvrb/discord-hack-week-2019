import { ConnectionOptions } from "typeorm";
export class Configuration {
    public static Bot: any = {
        Token: "",
        Avatar: ""
    };

    public static Database: ConnectionOptions = {
        type: "postgres",
        host: "localhost",
        port: 5432,
        database: "janet",
        synchronize: true
    };
}
