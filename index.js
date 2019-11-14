const axios = require("axios");

const reg = /<script>\nwindow.initData = (.*);\n<\/script>/g;

exports.fetch = async function(req, res) {
  const { data } = await axios.get("https://airtable.com/shrtOxOZisVlHWq9x");
  const initData = reg.exec(data)[1];
  const { accessPolicy } = JSON.parse(initData);

  const response = await axios.get(
    "https://airtable.com/v0.3/application/apprwW5vVR4F8HP9N/read",
    {
      params: {
        accessPolicy
      },
      headers: {
        Connection: "keep-alive",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        "x-airtable-application-id": "apprwW5vVR4F8HP9N",
        "ot-tracer-sampled": "true",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "x-time-zone": "Europe/Paris",
        "x-user-locale": "fr",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "Postman-Token": "1738e350-ed77-48de-93fa-ad751dad0383"
      }
    }
  );
  const { tableSchemas } = response.data.data;

  res.send(tableSchemas);
};
