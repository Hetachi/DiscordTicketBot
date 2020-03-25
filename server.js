const Discord = require('discord.js')

let ticketId = 0

const client = new Discord.Client({
  fetchAllMembers: true
})

const logChannelId = '689054146128642123'

const blockedRoleIds = ['440902183391723520']

const administratorRoleName = "CSGO: Head Admin"
const moderatorRoleName = "CSGO: Admins"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', message => {
  const exileGuild = client.guilds.first()
  const logChannel = exileGuild.channels.find(channel => channel.id === logChannelId)

  const ticketCategory = client.channels.find( channel => (channel.type === 'category' && channel.name === 'Tickets'))
  if(!ticketCategory) {
    exileGuild.createChannel('Tickets', 'category').then( channel => ticketCategory = channel)
  }

  if(!message.author.bot && message.channel != message.author.dmChannel && message.content === '!ticket') {
    ticketId++
    exileGuild.createChannel(`Ticket-#${ticketId}`, 'text').then(channel => {
      channel.setParent(ticketCategory)
      channel.overwritePermissions(channel.guild.roles.find(role => role.name === administratorRoleName), {SEND_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true})
      channel.overwritePermissions(channel.guild.roles.find(role => role.name === moderatorRoleName), {SEND_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true})

      blockedRoleIds.map(blockedRoleID => {
        channel.overwritePermissions(channel.guild.roles.find(role => role.id === blockedRoleID), {SEND_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false})
      })

      channel.overwritePermissions(message.author, {SEND_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true})
      channel.send(`<@${message.author.id}> this is your ticket with ID #${ticketId}, please write below your issue and an admin will shortly reply.`)
      message.delete()
    })
  }

  if(!message.author.bot && message.channel != message.author.dmChannel && message.content.includes('!resolve') && message.channel.name.includes('ticket')) {
    if(message.member.roles.find(r => r.name === administratorRoleName)) {
      let messageList = ''
      message.channel.messages.map(message => {
        messageList = `${messageList}\n---\n<@${message.author.username}>: ${message.content}`
      })

      if(message.mentions.members.first()) {
        message.mentions.members.first().send(`Admin ${message.author.username} has resolved your ticket with the following message: \n\n ${message.content}`)
      }

      logChannel.send('```'+messageList+'```')
      message.channel.delete()
    }
  }

  if(!message.author.bot && message.channel != message.author.dmChannel && message.content.includes('!notify') && message.channel.name.includes('ticket')) {
    if(message.member.roles.find(r => r.name === administratorRoleName) || message.member.roles.find(r => r.name === moderatorRoleName)) {
      const messageChannelName = message.channel.name
      message.mentions.members.first().send(`Your presence has been requested from ${message.guild.name} in ticket channel: ${messageChannelName}`);
    }
  }
})

client.login('')
