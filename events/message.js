module.exports = async (Bot, message) => {
  if (message.author.bot) return;

  if (message.channel.type == "dm")
    return message.channel.send("You cannot use this Bot in DMs! 🙃");
  const prefix = "show me"; // TDDO MAKE SERVER TO SERVFER CONFIG
  if (message.content.indexOf(prefix) !== 0) return;
  // Our standard argument/command name definition.
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  var cmd = Bot.commands.get(command) || Bot.aliases.get(command);
  if (cmd) {
    if (cmd == "None")
      return message.reply("That is not a valid Command.").then(m => {
        setTimeout(function() {
          m.delete();
        }, 10000);
      });
    if (cmd.command.settings.disabled === true)
      return message.reply("Command Is Disabled.").then(m => {
        setTimeout(function() {
          m.delete();
        }, 10000);
      });
    if (cmd.command.help.permission == "None") {
    } else if (cmd.command.help.permission == "OwnerBot") {
      if (message.author.id != process.env.ownerBot)
        return message.channel
          .send(
            "Only the Bot Owner can use the command... Debug: Command exited code **1**"
          )
          .then(m => {
            setTimeout(function() {
              m.delete();
            }, 10000);
          });
    } else if (
      message.member.hasPermission(cmd.command.help.permission) === false
    ) {
      return message.channel
        .send("You do not have permission to execute this command")
        .then(m => {
          setTimeout(function() {
            m.delete();
          }, 10000);
        })
        .catch(console.error);
    }
    cmd.command.run(Bot, message, args);
  }
  if (!cmd) {
    return message.reply("That is not a valid Command.").then(m => {
      setTimeout(function() {
        m.delete();
      }, 10000);
    });
  }
};
