module.exports = (client, message, Command, IsInteraction, InteractionType) => {
    let verificationCount = 0
    if (require("./OwnerOnly")(client, message, Command, IsInteraction)) verificationCount = verificationCount + 1
    if (require("./LimitUses")(client, message, Command, IsInteraction, InteractionType)) verificationCount = verificationCount + 1
    if (require("./ExpireAfter")(client, message, Command, IsInteraction, InteractionType)) verificationCount = verificationCount + 1
    if (require("./AnyClientPermissions")(client, message, Command, InteractionType)) verificationCount = verificationCount + 1
    if (require("./AllClientPermissions")(client, message, Command, InteractionType)) verificationCount = verificationCount + 1
    if (require("./AnyUserPermissions")(client, message, Command, InteractionType)) verificationCount = verificationCount + 1
    if (require("./AllUserPermissions")(client, message, Command, InteractionType)) verificationCount = verificationCount + 1
    if (require("./OnlyChannels")(client, message, Command, InteractionType)) verificationCount = verificationCount + 1
    if (require("./OnlyUsers")(client, message, Command, IsInteraction)) verificationCount = verificationCount + 1
    if (require("./OnlyGuilds")(client, message, Command)) verificationCount = verificationCount + 1
    if (require("./Cooldown")(client, message, Command, InteractionType)) verificationCount = verificationCount + 1
    if (require("./VoiceChannel")(client, message, Command)) verificationCount = verificationCount + 1
    if (verificationCount === 12) return true;
    else return false;
}