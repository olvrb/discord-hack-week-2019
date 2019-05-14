import { createConnection } from "typeorm";
import { join } from "path";
import { Configuration } from "../Config";
export async function Connect() {
    return createConnection({
        entities: [join(__dirname, "Entities", "*.js")],
        ...Configuration.Database
    });
}
