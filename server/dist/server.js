"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
async function main() {
    try {
        await mongoose_1.default.connect(process.env.DB_URL);
        console.log("MongoDB Connected");
        app_1.default.listen(PORT, () => {
            console.log(`Server Running On ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
