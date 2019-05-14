import { Configuration } from "../Config";
import { Application } from "../Utils/Application";
import { join } from "path";

const App = new Application({
    avatarUrl: "",
    commandDirectory: join(__dirname, "..", "Database", "Entities")
});

export async function StartBot(): Promise<Application> {
    console.log(App.CommandDirectory);

    return App.login(Configuration.Bot.Token).then(() => App);
}
