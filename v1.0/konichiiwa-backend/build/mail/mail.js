"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendNotification(msg, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        let mailNotification = {
            from: 'office@konichiiwa.com',
            to: 'contact@benarmstro.ng',
            subject: subject,
            text: msg,
            html: '<p>' + msg + '</p>'
        };
        getConnection().sendMail(mailNotification, function (error, info) {
            if (error) {
                return Promise.reject(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
}
exports.sendNotification = sendNotification;
function getConnection() {
    return nodemailer_1.default.createTransport({
        host: "smtp.zoho.com",
        port: 587,
        secure: false,
        auth: {
            user: 'office@konichiiwa.com',
            pass: process.env.ZOHO_MAIL_PW,
        }
    });
}
