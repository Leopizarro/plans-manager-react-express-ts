"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/api", (req, res) => {
    res.json({ "users": ["user1", "user2", "user3"] });
});
app.listen(5000, () => { console.log("Server started on port 5000! :)"); });
