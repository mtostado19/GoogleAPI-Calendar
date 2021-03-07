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

calendar.events.list({
  calendarId: 'primary'
}, (err, res) => {
  if (err) return console.log("API Failure, err: ", err);
  const allEvents = res.data.items;
  if (allEvents.length) {
    console.log("Events!:");
    allEvents.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.id} - ${event.summary} - ${event.conferenceData.conferenceId}`);
    });
  } else {
    console.log("No events found :(");
  }
});