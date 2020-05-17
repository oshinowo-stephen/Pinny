# Pinny

[![Build Status](https://travis-ci.com/whoastonic/Pinny.svg?branch=master)](https://travis-ci.com/whoastonic/Pinny)
[![discord](https://canary.discordapp.com/api/guilds/706565700923162706/widget.png)](https://discord.gg/fyDKtAhW)


Pinny, counts as a utility bot that can pin messages! Basically...

## What can it do?

Well as stated before it can pin messages, but only when the message gets enough PinMojis, example on usage is shown below...

![The image isn't loading](assets/images/create.gif)

When the threshold arrives Pinny will pin the message! But when ever the message doesn't meet the threshold, it'll get unpinned, as shown below:

![The image isn't loading](assets/images/remove.gif)

You can force add & remove pins with the following commands:

* `p!force create MESSAGE_ID`

* `p!force remove MESSAGE_ID`

Members with **[Pinner Role]**, are able to use the `force` command, even if their not VIP, Admin, or Owner ***(The special people)***. To set the pinner role use the following command:

* `p!settings pr ROLE_ID`

Pinny also comes with few other settings like, Pin Log (Logs whenever a pin message gets created, or removed), Pin Emote (The emote to track if the message should get pinned or not),  and the Pin Threshold (How many pins should it take for the message to get pinned). These all can be set like so:

* `p!settings pinemote 📌`

* `p!settings thresh 10`

* `p!settings log CHANNEL_ID`

## Running it yourself

Now while being opensource you're free to use this for private use following under the [Apache 2.0 Licence](https://github.com/whoastonic/Pinny/blob/master/LICENSE) please mind if the licence is ever broken by your doing, consenquences will be ahead.

Other than that running this bot is as simple as following these steps:

* Install [Node](https://nodejs.org/en/)
(go ahead and install the LTS version)

* Installing / using a [database](https://www.youtube.com/watch?v=xaWlS9HtWYw)
(while I linked you a video on how to setup the postgresql database, others are allowed, if you know what you're doing)

* Installing packages by running `npm install`

* If everything is setup correctly, you can go-ahead and run `npm start` and the bot should launch up nicely

* If you run into an issue please visit the [Discord](https://discord.gg/fyDKtAh) for assistance 😄!

## Contributing

Either by [Pull Requests]() or [Bug Reporting](), these help out a-lot in and out of development!

## External Links

Follow, or leave a tweet... or both...
> [Twitter](https://twitter.com/whoastonic)

Join! You're always welcomed!
> [Discord](https://discord.gg/fyDKtAhW)

Come watch me, rage at games! If i'm online that is, if not leave a follow!
> [Twitch](https://www.twitch.tv/whoastonict)
