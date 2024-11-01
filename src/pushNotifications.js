import webPush from "web-push";

const vapidKeys = webPush.generateVAPIDKeys();
console.log("VAPID Public Key:", vapidKeys.publicKey);
console.log("VAPID Private Key:", vapidKeys.privateKey);

webPush.setVapidDetails();
