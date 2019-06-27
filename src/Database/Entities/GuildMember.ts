import { GuildMember as DGuildMember } from "discord.js";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Guild } from "./Guild";

@Entity()
export class GuildMember extends BaseEntity {
    public static async CreateOrUpdate(discordMember: DGuildMember, guild: Guild): Promise<GuildMember> {
        let member = await GuildMember.findOne({ where: { Id: discordMember.id } });
        if (!member) {
            member = new GuildMember();
            member.Id = discordMember.id;
            member.Guild = guild;
            member.Warnpoints = 0;
            member.TriviaWins = 0;
        }
        return member.save();
    }
    @PrimaryColumn()
    public Id: string;

    @ManyToOne((type) => Guild, (guild) => guild.Members)
    public Guild: Guild;

    @Column()
    public TriviaWins: number;

    @Column()
    private Warnpoints: number;

    public Warn(amount: number): Promise<GuildMember> {
        this.Warnpoints += amount;
        return this.save();
    }
}
