const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verificationController = require('./Controllers/Verification');
app.get('/', verificationController);

const messageWebhookController = require("./Controllers/messageWebhook");
app.get("/", verificationController);
app.post("/", messageWebhookController);

app.listen(3000, () => console.log("Webhook server is listening, port 3000"));
//Token de messenger:
//EAAKlSXaw5tMBABemnMgh1tFXGmX2OPh5dsrAHpVn3dFK4Ll9NkYQXAWv6uIJBWgM5BNQxXwFB7Cb8EafmdrVskMnyeAGK8ogmVWcxQp5Y7aZBJPp2NBvcai6VsxjlvNQwt83COBGScQ2PkFJwZBmBtfqR2nwcWjpG4se1HZBYWXr3PRtDUo