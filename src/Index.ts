import { StartBot } from "./Discord/Index";
import { BindEventHandlers } from "./Discord/Events/Index";
import { Connect } from "./Database/Index";
import { Logger } from "./Utils/Logger";

Connect()
    .then(StartBot)
    .then((app) => {
        Logger.info(`Bot started with ${app.users.size} users, tag: ${app.user.tag}`);
    });
