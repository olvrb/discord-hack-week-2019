import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany, ManyToMany } from "typeorm";
import { Guild as DGuild } from "discord.js";
import { GuildMember } from "./GuildMember";
import { User } from "./User";

@Entity()
export class Guild extends BaseEntity {
    public static async CreateOrUpdate(discordGuild: DGuild): Promise<Guild> {
        let guild = await Guild.findOne({ where: { Id: discordGuild.id } });

        if (!guild) {
            guild = new Guild();
            guild.Id = discordGuild.id;
        }
        guild.Name = discordGuild.name;
        return guild.save();
    }

    @PrimaryColumn()
    public Id: string;

    @Column()
    public Name: string;

    @OneToMany((type) => GuildMember, (member) => member.Guild)
    public Members: GuildMember[];

    @ManyToMany((type) => User, (user) => user.Guilds)
    public Users: User[];
}
