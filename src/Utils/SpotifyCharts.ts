import csv from "csvtojson";
import fetch from "node-fetch";
export class SpotifyCharts {
    public private;
    public async GetRandomOffCharts() {
        const chart = await this.getTop();

        const selItem = chart[Math.floor(Math.random() * chart.length)];
        return { title: selItem.field2, artist: selItem.field3 };
    }
    private async getTop() {
        const chart = await this.jsonify(await this.getFile());
        chart.shift();
        return chart;
    }
    private async jsonify(text: string) {
        return csv().fromString(text);
    }
    private async getFile(): Promise<string> {
        return fetch("https://spotifycharts.com/regional/global/weekly/latest/download").then((res) => res.text()) as string;
    }
}
