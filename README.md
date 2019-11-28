Function to get airtable schema from the shared id

-> you can get shared id of a base in the "share" modal, after enabling read-only public access. It is the string after `https://airtable.com/`

### Code

`getSchema.js` is the generic code of the function, only relying on axios and shared id, you can use it in any node environnment where axios is available, but giving it the id

`index.js` (with the package.json etc) is google cloud function specific: it sets the environnment to be deployed as a cloud functions. (you can launch it as a dev environnement with `npm start`)

### Use

Call `http_end_point?id=ID` for example `https://us-central1-utils-functions.cloudfunctions.net/get-airtable-schema?id=ID`
