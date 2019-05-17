import { Connect } from "./Database/Index";
import { BindEventHandlers } from "./Discord/Events/Index";
import { StartBot } from "./Discord/Index";
import { Logger } from "./Utils/Logger";

// tslint:disable-next-line
Connect()
    .then(StartBot)
    .then((app) => {
        BindEventHandlers(app);
        Logger.info(`Logged in as ${app.user.tag} with ${app.users.size} users.`);
    });
