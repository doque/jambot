const axios = require('axios');
const BASE_URL = `https://api.telegram.org/bot${process.env.TOKEN}`;

function hello(event, context, callback) {
  try {
    const data = ({
      message: {
        text,
        chat: { id: chatId, first_name: firstName }
      }
    } = JSON.parse(event.body));

    let response = `Please /start, ${firstName}`;

    if (text.toLowerCase().includes('hello')) {
      response = `Hello, ${firstName}`;
    }

    sendReply(response, chatId)
      .then(() => {
        callback(null, { statusCode: 200 });
      })
      .catch(e => {
        throw new Error(e);
      });
  } catch (e) {
    callback(error, { statusCode: 500 });
  }
}

function sendReply(text, chat_id) {
  const url = `${BASE_URL}/sendMessage`;
  return axios.post(url, {
    text,
    chat_id
  });
}

module.exports = { hello };
