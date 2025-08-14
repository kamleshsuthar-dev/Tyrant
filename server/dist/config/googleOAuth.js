"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth2client = void 0;
const googleapis_1 = require("googleapis");
const env_1 = require("../config/env");
const GOOGLE_CLIENT_ID = env_1.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env_1.env.GOOGLE_CLIENT_SECRET;
exports.oauth2client = new googleapis_1.google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'postmessage');
