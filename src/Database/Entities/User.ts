import { Entity, BaseEntity, Column, ManyToMany, PrimaryColumn, OneToMany } from "typeorm";
import { User as DUser } from "discord.js";
import { Guild } from "./Guild";
import { Message } from "./Message";

@Entity()
export class User extends BaseEntity {
    public static async CreateOrUpdate(discordUser: DUser) {
        let user = await User.findOne({ where: { Id: discordUser.id } });
        if (!user) {
            user = new User();
            user.Id = discordUser.id;
        }
        user.Discriminator = discordUser.discriminator;
        user.Username = discordUser.username;

        return user.save();
    }
    @PrimaryColumn()
    public Id: string;

    @Column()
    public Username: string;

    @Column()
    public Discriminator: string;

    @ManyToMany((type) => Guild, (guild) => guild.Users)
    public Guilds: Guild[];

    @OneToMany((type) => User, (user) => user.Messages)
    public Messages: Message[];
}
