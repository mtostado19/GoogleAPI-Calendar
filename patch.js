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

// Date
const eventStartTime = new Date();

eventStartTime.setDate(eventStartTime.getDate() + 3);

const eventEndTime = new Date();

eventEndTime.setDate(eventEndTime.getDate() + 3);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

// Event
const event = {
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Merida',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Merida'
  },
}

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Merida',
      items: [{id: 'primary'}],
    },
}, 
(err, res) => {
  if(err) return console.error('Free Busy Query error: ', err);

  const eventsArr = res.data.calendars.primary.busy;
  if (eventsArr.length === 0)
    return calendar.events.patch(
      { 
        calendarId: 'primary', 
        eventId: process.env.PATCHID,
        resource: event,
        conferenceDataVersion: 1,
      }, 
      err => {
        if (err) return console.error('Calendar Event Patch Error: ', err)
        return console.log('Calendar Event Updated!')
      }
    )
    return console.log('Busy Calendar :(');
  }
)
