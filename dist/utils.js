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
exports.slugify = exports.createStep = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function createStep(stepObj, tourName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { file, description, searchString, title, offset = 0 } = stepObj;
        if (!file || !searchString)
            return stepObj;
        const filePath = path_1.default.resolve(__dirname, '../..', file);
        const fileContent = yield promises_1.default.readFile(filePath, 'utf8');
        const lines = fileContent.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(searchString)) {
                return { file, description, line: i + 1 + offset, title };
            }
        }
        console.log(`Search string "${searchString}" not found in file ${file} \nTours : ${tourName}, \nStep : ${title} \n`);
        return { file, description, line: 1, title };
    });
}
exports.createStep = createStep;
const slugify = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
exports.slugify = slugify;
