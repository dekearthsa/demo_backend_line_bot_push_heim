const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const line = require("@line/bot-sdk");
const {demoFlex} = require("../struct/flex/demoFlex");
// const { Storage } =  require('@google-cloud/storage');
const {Datastore} = require('@google-cloud/datastore');

const CHANNEL_SECRET = process.env.CHANNEL_SECRET|| "a123dfdce669ad6868727b47f64415ad";
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKE || "lqHG6mhwJDMus7YLEZbXXRcQsBMSr3gaJCSwIKVBJgc/5jfCit8goM8Gu0RDCzIYsicBN1BdL+RqBkhFsDSQ+e8zwo6UTn2T35zIBwcAVT5tgu9rnu4QeTjnMCpFibp9D8aU8KR19JM0IVX9Nf9NfAdB04t89/1O/w1cDnyilFU=";

// // setup line bot api // //
const CONFIG = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
}

const datastore = new Datastore();
const LINE_CLIENT = new line.Client(CONFIG);

const controllerLinePush = async (req:any, res:any) => {
    const {plant, msgType, msg } = req.body;

    try{
        const plantQuery = datastore.createQuery("demo_line_register")
        .filter('plantName', '=', plant)

        const [plantData] = await datastore.runQuery(plantQuery);

        if(msgType === "text"){
            const echo = {type: 'text',altText: "demo message", text: msg}
            LINE_CLIENT.pushMessage(plantData[0].lineUserId,echo)
        }else if(msgType === "card"){
            const setFlex = demoFlex(msg)
            const echo = {type: 'flex',altText: "demo flex message", contents: setFlex}
            LINE_CLIENT.pushMessage(plantData[0].lineUserId,echo)
        }
    }catch(err){
        res.send("error => ", err)
    }
}

export {controllerLinePush}