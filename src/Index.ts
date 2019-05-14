import { StartBot } from "./Discord/Index";
import { BindEventHandlers } from "./Discord/Events/Index";
import { Connect } from "./Database/Index";
import { Logger } from "./Utils/Logger";

Connect()
    .then(StartBot)
    .then((app) => {
        BindEventHandlers(app);
        Logger.info(`Logged in as ${app.user.tag} with ${app.users.size} users.`);
    });
