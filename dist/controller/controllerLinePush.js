"use strict";
// const path = require("path");
// require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerLinePush = void 0;
const line = require("@line/bot-sdk");
const { demoFlex } = require("../struct/flex/demoFlex");
// const { Storage } =  require('@google-cloud/storage');
const { Datastore } = require('@google-cloud/datastore');
const CHANNEL_SECRET = "";
const CHANNEL_ACCESS_TOKEN = "";
// // setup line bot api // //
const CONFIG = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
};
const datastore = new Datastore();
const LINE_CLIENT = new line.Client(CONFIG);
const controllerLinePush = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plant, msgType, msg } = req.body;
    try {
        const plantQuery = datastore.createQuery("demo_line_register")
            .filter('plantName', '=', plant);
        const [plantData] = yield datastore.runQuery(plantQuery);
        if (msgType === "text") {
            const echo = { type: 'text', altText: "demo message", text: msg };
            LINE_CLIENT.pushMessage(plantData[0].lineUserId, echo);
        }
        else if (msgType === "card") {
            const setFlex = demoFlex(msg);
            const echo = { type: 'flex', altText: "demo flex message", contents: setFlex };
            LINE_CLIENT.pushMessage(plantData[0].lineUserId, echo);
        }
    }
    catch (err) {
        res.send("error => ", err);
    }
});
exports.controllerLinePush = controllerLinePush;
