## SIMPLE DISCORD TICKET BOT
This discord bot does not use any databases to track data or in any other way store data, that is why it's so simple.
It is extendable and easy to understand.

### Setup

#### Pre-requirements
    NodeJS - v12.0 or later
    Git
    Notepad++ - or better code edittor

#### Initial setup
    1. Edit line 70 in server.js and paste your dicord bot token
    2. Run the bot via node server.js
    3. The bot should launch
    4. Invite bot to your discord server and add required permissions.


#### Advanced setup to fully utilize the bot this is required.
    1. On line 9 of server.js replace id for your Ticket-log file, this will be used as a backlog for all closed tickets.
    2. On line 11 add all roles of your discord server that should not be able to see tickets (Unless you have configured that no roles can see newly created channels.)
    3. On line 13 add main admin role name, yes full name of the role no need to mess around with IDs
    4. On line 14 add moderator role that will also see tickets and be able to use command !notify in the ticket to notify user.



### Commands

    !ticket - Creates a new channel and invites required roles to the ticket channel.
    !notify @User - Will send a DM to the user that their presence has been requested in the specific Ticket-# channel.
    !resolve @User message - Will resolve the ticket, delete channel, DM mentioned person with the message as to why ticket was closed, and in the end will log the ticket to the previously set log channel.
