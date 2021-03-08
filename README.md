# Google Calendar Backend Devolepment

**THIS PROYECT IS STILL UNDERDEVELOPMENT, SOME ASPECTS ARE SUBJECT TO CHANGE**

To use this proyect you **MUST** have some basic experience using:
1. Google Cloud Plataform
2. Google Calendar
3. OAuth 2.0 Playground
4. Node js

I recommend following this tutorial first to get the basics of the following program: https://www.youtube.com/watch?v=zrLf4KMs71E&t=978s
The only correction from the video is that when you are in the "OAuth consent screen" you need to also create a test user with the same email as you account. The rest should work just as normal.

## Running the Proyect
Once you have succesfully clone the repository follow the next steps:
First make sure you have installed **Node js**, after that run this command to install *all* the node modules used in this proyect.
```
npm i
```

Now create a file named **".env"** and put the following text:
```
CLIENT_ID=''
SECRET=''
TOKEN=''
```
Inside those variables insert the client id and the secret key given to you in the "Credentials" section of Google Cloud Plataform.
In the last variable add the "Refresh token" given to you from the OAuth 2.0 Playground.

Finally, to run the program currently there are 3 options. If you want to create a new event you just need to type:
```
node ./index.js

```
If you want to get *all* the events in your primary calendar type:
```
npx nodemon ./list.js
```

If you want to delete an event in your calendar first copy the Id you obtain from the previous command, add "DELETEID=''" into the .env file and then put the id you copied in the last step. Once you do all that run the following command:
```
node ./delete.js
```
Repeat the same steps if you want to delete a different user.

Once you run the program you should see if the event was created correctly directly form the console. The program also generates a Google Meet link automatically along side the event. Make sure you have no other events schedule at the same time you are creating the event, the program schedules an event 2 days from when you ran the app, last for 45 minutes and takes place at your current time.

**Note: The proyect still works with the changes made in the February 8, 2021 update. If the program doesn´t work for you I recommend checking that your credentials were made correctly or if the calendar API hasn´t recieved any new updates. You can check the release notes in this link: https://developers.google.com/calendar/releases**