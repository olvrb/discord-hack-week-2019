import { Message } from "discord.js";
import { Application } from "./Application";

export class BaseCommand {
    public Application: Application;

    constructor(app: Application) {
        this.Application = app;
    }
}
export interface IBaseCommand {
    Name: string;
    Description: string;
    HasPermission(message: Message): boolean;
    Run(message: Message): any;
}
