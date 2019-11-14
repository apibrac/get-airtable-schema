const axios = require("axios");

function extractInitData(data) {
  const reg = /<script>\nwindow.initData = (.*);\n<\/script>/g;
  const initData = reg.exec(data)[1];
  return JSON.parse(initData);
}

function getApplicationRead(appId, accessPolicy) {
  return axios.get(`https://airtable.com/v0.3/application/${appId}/read`, {
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
  });
}

module.exports = async function(publicTableId) {
  const { data } = await axios.get(`https://airtable.com/${publicTableId}`);

  const { accessPolicy, sharedApplicationId } = extractInitData(data);

  const { data: applicationRead } = await getApplicationRead(
    sharedApplicationId,
    accessPolicy
  );

  const { tableSchemas } = applicationRead.data;
  return tableSchemas;
};
