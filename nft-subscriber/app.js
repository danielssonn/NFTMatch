StompJs = require('@stomp/stompjs');
const winston = require('winston');

Object.assign(global, { WebSocket: require('ws') });


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'all.log' }),
    ],
});

const client = new StompJs.Client({
    brokerURL: 'wss://api.covalenthq.com/v1/?key=ckey_b780cce192f14bf8bf37d7a5c7c',
    debug: function (str) {
        console.log(str);
        // logger.log({
        //     level: 'info',
        //     message: str
        // });

    },
    reconnectDelay: 5000,
    heartbeatIncoming: 0,
    heartbeatOutgoing: 10000
});

client.onConnect = function (frame) {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    console.log("Connected to Stomp ", frame);
    const subscription = client.subscribe('/v1/5/events/address/0x614Ca82f3126a84e853c438ef825181b21E78502/', callback);
    callback = function (message) {
        // called when the client receives a STOMP message from the server


    };

};

client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
};

client.activate();