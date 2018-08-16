const { getSuggestions, sendReply } = require('./utils');

async function hello(event, context, callback) {
  try {
    const data = JSON.parse(event.body);

    const { text } = data.message;
    const { id: chatId, first_name: firstName } = data.message.chat;

    console.log(`incoming - ${firstName} wrote "${text}" in #${chatId}`);

    let response;

    // First contact, say hello
    if (text.toLowerCase().includes('start')) {
      response = `Hallo, ${firstName}. Was suchst du?`;
    }

    // Query for `what` in `where`
    if (text.toLowerCase().includes(' in ')) {
      const [what, where] = text.split(' in ');

      const suggestions = await getSuggestions(what, where);
      response = suggestions.join('\n');
    }

    // send reply
    await sendReply(response, chatId);

    // terminate lambda
    callback(null, { statusCode: 200 });
  } catch (error) {
    callback(error, { statusCode: 500 });
  }
}

module.exports = { hello };
