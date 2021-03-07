require('dotenv').config();

const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID, 
  process.env.SECRET,
);

oAuth2Client.setCredentials({
  refresh_token: process.env.TOKEN
});

const calendar = google.calendar( {version: 'v3', auth: oAuth2Client} );

async function DeleteEvent(deleteEventId) {
    const res = await calendar.events.delete({
        calendarId: 'primary',
        eventId: deleteEventId
    });
    
    console.log(res.data)
}

const eventid = process.env.DELETEID;

DeleteEvent(eventid);