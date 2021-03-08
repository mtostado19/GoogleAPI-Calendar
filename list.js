require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const app = express();

const port = 4000;
app.listen(4000, () => {
 console.log(`App running on port ${port}`);
});

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID, 
  process.env.SECRET,
);

oAuth2Client.setCredentials({
  refresh_token: process.env.TOKEN
});

const calendar = google.calendar( {version: 'v3', auth: oAuth2Client} );

app.get('/', async (req, res) => {
  let asyncResponse = await getEvents();
  let data = createJson(asyncResponse)
  res.send(data);
})

function createJson(events){
  res = [];
  for (let i = 0; events.length > i; i++){
    res.push({
      id: events[i].id,
      summary: events[i].summary,
      start: events[i].start,
      end: events[i].end,
      hangoutLink: events[i].hangoutLink,
    })
  }
  return res;
};

async function getEvents(){
  const res = await calendar.events.list({
    calendarId: 'primary'
  });
  const allEvents = res.data.items;
    if (allEvents.length) {
      return allEvents;
    } else {
      console.log("No events found :(");
    }
  };
