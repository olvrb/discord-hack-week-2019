import { Configuration } from "../Config";
import { Application } from "../Utils/Application";
import { join } from "path";

const App = new Application({
    avatarUrl: "",
    commandDirectory: join(__dirname, "..", "Discord", "Commands"),
    prefix: "!"
});

export async function StartBot(): Promise<Application> {
    console.log(App.CommandDirectory);
    App.CacheCommands();

    return App.login(Configuration.Bot.Token).then(() => App);
}
export function getApp() {
    return App;
}
