require("dotenv").config();

const path = require("path");
const fs = require("fs");
const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE);

function fetchBase(name, view = "Grid view", fileName) {
  console.log(`Fetching: "${name}"...`);
  return new Promise((resolve, reject) => {
    base(name)
      .select({
        view
      })
      .all(
        (_, records) => {
          const data = records.map(item => {
            return Object.entries(item.fields).reduce(
              (acc, [field, content]) => {
                const key = field.toLowerCase();
                const value = key === "cover" ? content[0].url : content;
                switch (typeof value) {
                  case "string": {
                    return {
                      ...acc,
                      [key]: String(
                        key === "cover" ? content[0].url : content
                      ).trim()
                    };
                  }
                  default: {
                    return {
                      ...acc,
                      [key]: content
                    };
                  }
                }
              },
              {
                id: item.id
              }
            );
          });

          const output = `../src/data/${fileName}.json`;
          fs.writeFileSync(
            path.join(__dirname, output),
            JSON.stringify(data, null, 2)
          );
          console.log(`Content for "${name}" saved at ${output} \n`);
          resolve({});
          return;
        },
        err => {
          if (err) {
            reject(err);
          }
        }
      );
  });
}

async function run() {
  await fetchBase("Artists", "Grid view", "artists");
  await fetchBase("Albums", "Grid view", "albums");
  await fetchBase("Tracks", "Grid view", "tracks");
}

run();
