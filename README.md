# Tallinn-Shallinn
#### A personal project to help me stay in touch with my friends, family and relatives by keeping a track of when did I last talk to them.

## Concept
There should be an application which can help a user to add all his loved-ones(friends/family/relatives) to a list and the app should take care of when was the loved-one last contacted. This will help in reminding user to "talk" to his/her loved-ones. Being an introvert, I totally understand the pain of picking up the phone and calling someone. With this, I aim to get over that reluctance and stay in touch with everyone while living far away from them.

## Features/Use Cases

App should: 
- have an option to add a relative/friend/family member with closeness factor (1-5), frequency of call, relation, name, phone number, country, preferable time to call them and call notes
- Have a list on the home screen of the app of all the contacts that the user has added and it should also show the last time when user contacted them
---------------------

## Tech

I'm using Ionic with React to build this app in order to make it available as a native application as well as a web application. This is not to cover large user base. This is just me being lazy to open Google Chrome and go to a specific website. I feel it more convenient to have an app installed on my phone which I can access instantly. This

Initially, I'm planning to process everything on device and periodically pushing data to the server. This will serve multiple purposes. 
1. I will avoid the effort of writing a server.
2. User privacy
3. I'm gonna use lowDB for this purpose and will sync the JSON file at the end of every week or so just to keep the user's data safe.

This sync thing brings up a question of authentication. Let's see, I'll add Google, Facebook SSO for login maybe.
Or I can back this up on users' Google Drives and access it from there whenever needed.

Enough Talking!!!

Now, as Harvey Specter says, 
 Let's kick some ass!!

