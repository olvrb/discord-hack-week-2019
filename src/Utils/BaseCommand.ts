import { Message } from "discord.js";

export interface IBaseCommand {
    Name: string;
    Description: string;
    HasPermission(message: Message): boolean;
    Run(message: Message): any;
}
