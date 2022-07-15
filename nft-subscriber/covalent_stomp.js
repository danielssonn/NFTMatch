let Stomp = require('stompjs');

function successCallback() {

    console.log("Subscribed");
    let sub1 = client.subscribe("/v1/5/events/address/0x614ca82f3126a84e853c438ef825181b21e78502/", function (message) {
        // user can do anything with message.body because it is the log event object returned
        console.log("This is sub1 data: " + message.body)
    });

}
let url = "wss://api.covalenthq.com/v1/?key=ckey_b780cce192f14bf8bf37d7a5c7c";
let client = Stomp.overWS(url);
client.heartbeat.incoming = 0;
client.heartbeat.outgoing = 10000;

let timeout = 5000;
client.connect({}, function (frame) {
    console.log("Connected: " + frame);
    successCallback();

}, function (error) {
    console.log("You disconnected: " + error);
    client.disconnect(function () {
        setTimeout(() => {
            reconnect("wss://api.covalenthq.com/v1/", successCallback);
        }, timeout);

    });
});

let mytimeOut;
function reconnect(socketUrl, successCallback) {

    if (client.connected) {
        client.disconnect();
        return;
    }

    clearTimeout(mytimeOut);
    console.log("Trying to reconnect...");
    let connected = false;

    client = Stomp.overWS(socketUrl);
    client.heartbeat.incoming = 0;
    client.heartbeat.outgoing = 10000;
    client.connect({}, (frame) => {
        connected = true;
        successCallback();
        timeout = 5000;
        clearTimeout(mytimeOut);
    }, () => {
        if (connected) {
            setTimeout(() => {
                reconnect(socketUrl, successCallback);
            }, timeout);
        }
    });
    if (!client.connected) {
        mytimeOut = setTimeout(() => {
            reconnect(socketUrl, successCallback);
        }, timeout += 1000);
    }

}