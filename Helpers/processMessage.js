const API_AI_TOKEN = "8ec684f8c5a3423fad1f107d9abb6928";
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = "EAAKlSXaw5tMBABemnMgh1tFXGmX2OPh5dsrAHpVn3dFK4Ll9NkYQXAWv6uIJBWgM5BNQxXwFB7Cb8EafmdrVskMnyeAGK8ogmVWcxQp5Y7aZBJPp2NBvcai6VsxjlvNQwt83COBGScQ2PkFJwZBmBtfqR2nwcWjpG4se1HZBYWXr3PRtDUo";
const request = require("request");
const sendTextMessage = (senderId, text) => {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: "POST",
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    console.log(event);
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, { sessionId: "crowdbotics_bot" });
    apiaiSession.on("response", (response) => {
        const result = response.result.fulfillment.speech;
        console.log(result);
        sendTextMessage(senderId, result);
    });
    apiaiSession.on("error", error => console.log(error));
    apiaiSession.end();
};