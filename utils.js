const axios = require('axios');

const BASE_URL = `https://api.telegram.org/bot${process.env.TOKEN}`;

async function getWhatUrl(value) {
  // {
  //   "echo": "Zahnarzt",
  //   "query": "Zahnarzt",
  //   "suggests": [
  //     {
  //       "header": "Fachbereiche & Symptome",
  //       "list": [
  //         {
  //           "score": 998,
  //           "showSelect": "Zahnarzt",
  //           "select": "gruppe=ZA&fachgebiet=",
  const { data } = await axios.get(
    `https://suche.jameda-elements.de/what-dev?query=${value}&echo=${value}`
  );

  return data.suggests[0].list[0].select;
}

async function getWhereUrl(value) {
  // {
  //   "echo": "Berlin",
  //   "suggests": [
  //     {
  //       "header": "Ort",
  //       "list": [
  //         {
  //           "score": 882,
  //           "select": "geoball=13%2E40629%2C52%2E524269%2C0%2E5&geo=52%2E524269%5F13%2E40629%5F%5F0%5FBerlin%5Fberlin%5FBerlin%5F1",
  const { data } = await axios.get(
    `https://suche.jameda-elements.de/where-dev?query=${value}&echo=${value}`
  );

  return data.suggests[0].list[0].select;
}

async function getSuggestions(what, where) {
  const whatUrl = await getWhatUrl(what);
  const whereUrl = await getWhereUrl(where);

  const url = `https://jameda.de/arztsuche/?new_search=1&${whatUrl}&${whereUrl}&output=json&version=5.0.0`;

  console.log({ whatUrl, whereUrl, url });

  const {
    data: { results }
  } = await axios.get(url);

  return results
    .slice(0, 5)
    .map(
      ({ name_nice, plz, ort, gesamt_note, tel }) =>
        `*${name_nice}* in ${plz} ${ort} _(Note ${gesamt_note})_: [${tel}]`
    );
}

function sendReply(text, chat_id) {
  const url = `${BASE_URL}/sendMessage`;
  return axios.post(url, {
    chat_id,
    text,
    parse_mode: 'markdown'
  });
}

module.exports = {
  getSuggestions,
  sendReply
};
