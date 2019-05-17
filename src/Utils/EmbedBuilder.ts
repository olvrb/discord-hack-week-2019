import { RichEmbed, RichEmbedOptions } from "discord.js";

import { getApp } from "../Discord/Index";

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

interface EmbedOptions extends RichEmbedOptions {
    title: string;
    description: string;
}

export class EmbedBuilder extends RichEmbed {
    public static EmbedType = EmbedType;

    constructor(options: EmbedOptions) {
        super(options);
        this.BuildDefaultEmbed(options.title, options.description);
    }

    public BuildEmbed(options: { type: EmbedType; fields?: MessageEmbedField[] }) {
        if (options.fields) {
            for (const field of options.fields) {
                this.addField(field.name, field.value, field.inline);
            }
        }
        switch (options.type) {
            case EmbedType.Info: {
                this.BuildInfoEmbed();
                break;
            }

            case EmbedType.Error: {
                this.BuildErrorEmbed();
                break;
            }

            default:
                break;
        }
        return this;
    }

    private BuildDefaultEmbed(title: string, description: string) {
        this.setTitle(title)
            .setDescription(description)
            .setFooter(getApp().user.tag, getApp().user.displayAvatarURL)
            .setTimestamp();
        return this;
    }
    private BuildInfoEmbed() {
        this.setColor("BLUE");
        return this;
    }
    private BuildErrorEmbed() {
        this.setColor("RED");
        return this;
    }
}
