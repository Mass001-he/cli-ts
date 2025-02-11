"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
exports.logger = {
    success: (msg) => console.log(chalk_1.default.green(`✓ ${msg}`)),
    error: (msg) => console.log(chalk_1.default.red(`✗ ${msg}`)),
    info: (msg) => console.log(chalk_1.default.blue(`ℹ ${msg}`)),
    warn: (msg) => console.log(chalk_1.default.yellow(`⚠ ${msg}`)),
    spinner: () => (0, ora_1.default)(),
};
