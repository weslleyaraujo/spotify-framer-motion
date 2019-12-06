require("dotenv").config();

const path = require("path");
const fs = require("fs");
const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE);

base("Artists")
  .select({
    view: "Grid view"
  })
  .all(
    (_, records) => {
      const data = records.map(item => {
        return Object.entries(item.fields).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key.toLowerCase()]: value
          }),
          {
            id: item.id
          }
        );
      });

      fs.writeFileSync(
        path.join(__dirname, "../src/data/artists.json"),
        JSON.stringify(data, null, 2)
      );
    },
    err => {
      console.error(err);
    }
  );
