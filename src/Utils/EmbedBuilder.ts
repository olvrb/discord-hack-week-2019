import { RichEmbed } from "discord.js";
import { getApp } from "../Discord/Index";
import { join } from "path";

export enum EmbedType {
    Info,
    Error,
    Warning
}

interface MessageEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export class EmbedBuilder extends RichEmbed {
    public static EmbedType = EmbedType;
    private BuildDefaultEmbed(title: string, description: string) {
        this.setTitle(title)
            .setDescription(description)
            .setFooter(getApp().user.tag, getApp().user.displayAvatarURL)
            .setTimestamp();
        return this;
    }
    private BuildInfoEmbed(title: string, description: string) {
        this.BuildDefaultEmbed(title, description).setColor("BLUE");
        return this;
    }
    private BuildErrorEmbed(title: string, description: string) {
        this.BuildDefaultEmbed(title, description).setColor("RED");
    }
    public BuildEmbed(opts: { title: string; description: string; type: EmbedType; fields?: MessageEmbedField[] }) {
        if (opts.fields) {
            for (const field of opts.fields) {
                this.addField(field.name, field.value, field.inline);
            }
        }
        switch (opts.type) {
            case EmbedType.Info: {
                this.BuildInfoEmbed(opts.title, opts.description);
                break;
            }

            case EmbedType.Error: {
                this.BuildErrorEmbed(opts.title, opts.description);
                break;
            }

            default:
                break;
        }
        return this;
    }
}
