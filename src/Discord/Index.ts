import { join } from "path";

import { Configuration } from "../Config";
import { Application } from "../Utils/Application";

const App = new Application({
    avatarUrl: "",
    commandDirectory: join(__dirname, "..", "Discord", "Commands"),
    prefix: "!"
});

export async function StartBot(): Promise<Application> {
    await App.CacheCommands();

    return App.login(Configuration.Bot.Token).then(() => App);
}
export function getApp() {
    return App;
}
