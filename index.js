const getSchema = require("./getSchema");

exports.fetch = async function(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");

  const { id } = req.query;
  if (!id) return res.status(400).send("Missing id!");

  try {
    const schema = await getSchema(id);
    return res.send(schema);
  } catch (error) {
    console.log(error);
    return res.status(403).send("Something's wrong with airtable queries");
  }
};
