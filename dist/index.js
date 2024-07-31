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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const index_1 = require("./tours/index");
/*
 * Creates a new directory called .tours in the root directory of the project.
 * Create the json content of the tours and stores them in toursObjArray
 * Creates a new file for each tour in the .tours directory and stores the json content in the file.
*/
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const baseDir = path_1.default.resolve(__dirname, '../..');
            const newDir = path_1.default.join(baseDir, '.tours');
            yield promises_1.default.mkdir(newDir, { recursive: true });
            const toursObjArray = yield Promise.all([
                (0, index_1.rocketchatOnboarding)(),
                (0, index_1.understandingMonorepo)(),
                (0, index_1.repositoryOverview)(),
                (0, index_1.messageSentClient)(),
                (0, index_1.messageSentServer)(),
                (0, index_1.createEndPoint)(),
                (0, index_1.createDBModel)(),
                (0, index_1.useDBModel)(),
                (0, index_1.services)(),
                (0, index_1.addNewService)(),
                (0, index_1.createNewPackage)(),
            ]);
            toursObjArray.forEach((tour, index) => __awaiter(this, void 0, void 0, function* () {
                const serialNumber = (index + 1).toString().padStart(2, '0');
                const fileName = serialNumber + '---' + (0, utils_1.slugify)(tour.title) + '.tour';
                tour.title = serialNumber + ' - ' + tour.title;
                const newFile = path_1.default.join(newDir, fileName);
                yield promises_1.default.writeFile(newFile, JSON.stringify(tour, null, 2));
            }));
            console.log('Tours created successfully');
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
main();
