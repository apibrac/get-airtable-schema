const axios = require("axios");

const reg = /<script>\nwindow.initData = (.*);\n<\/script>/g;

exports.fetch = async function(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).send("Missing id!");

  try {
    const { data } = await axios.get(`https://airtable.com/${id}`);
    const initData = reg.exec(data)[1];
    const { accessPolicy, sharedApplicationId: appId } = JSON.parse(initData);

    const response = await axios.get(
      `https://airtable.com/v0.3/application/${appId}/read`,
      {
        params: {
          accessPolicy
        },
        headers: {
          Connection: "keep-alive",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          "x-airtable-application-id": appId,
          "ot-tracer-sampled": "true",
          Accept: "application/json, text/javascript, */*; q=0.01",
          "x-time-zone": "Europe/Paris",
          "x-user-locale": "fr",
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "no-cache"
        }
      }
    );
    const { tableSchemas } = response.data.data;
    return res.send(tableSchemas);
  } catch (error) {
    return res.status(403).send("Something's wrong with airtable queries");
  }
};
