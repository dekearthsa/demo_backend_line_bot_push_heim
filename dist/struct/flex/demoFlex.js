"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoFlex = void 0;
function demoFlex(msg) {
    return {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
            "type": "image",
            "url": "https://i.ibb.co/99R001r/02.png",
            "size": "full",
            "aspectRatio": "1.51:1",
            "aspectMode": "fit"
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": msg,
                    "align": "center",
                    "contents": []
                },
            ]
        },
        "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                    "type": "button",
                    "action": {
                        "type": "message",
                        "label": "ฉันทราบแล้ว",
                        "text": "รับทราบ"
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                }
            ]
        }
    };
}
exports.demoFlex = demoFlex;
