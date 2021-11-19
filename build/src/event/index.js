"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const node_events_1 = __importDefault(require("node:events"));
class EventEmitter extends node_events_1.default {
    constructor() {
        super();
    }
}
exports.EventEmitter = EventEmitter;
