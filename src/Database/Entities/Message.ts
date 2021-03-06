import { Message as DMessage } from "discord.js";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Message extends BaseEntity {
    public static async CreateOrUpdate(discordMessage: DMessage) {
        let message = await Message.findOne({ where: { Id: discordMessage.id } });
        if (!message) {
            message = new Message();
            message.Id = discordMessage.id;
            message.Author = await User.CreateOrUpdate(discordMessage.author);
        }
        message.Content = discordMessage.content;
        return message.save();
    }

    @PrimaryColumn()
    public Id: string;

    @Column()
    public Content: string;

    @ManyToOne((type) => User, (user) => user.Messages)
    public Author: User;
}
