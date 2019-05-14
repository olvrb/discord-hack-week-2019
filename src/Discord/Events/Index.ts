import { Client } from "discord.js";
import { OnMessage } from "./Message";

export function BindEventHandlers(client: Client) {
    client.on("message", OnMessage);
}
