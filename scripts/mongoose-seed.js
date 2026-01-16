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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// MongoDB connection URI (update as needed)
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb";
// Example schema definitions
var MapSchema = new mongoose_1.default.Schema({
    round: { type: String, required: true, unique: false },
    slot: { type: String, required: true, unique: false },
    name: { type: String, required: true, unique: false },
    difficulty: { type: String, required: true, unique: false },
    mapper: { type: String, required: true, unique: false },
});
var PlayerSchema = new mongoose_1.default.Schema({
    osuName: { type: String, required: true, unique: false },
    discordName: { type: String, required: true, unique: false },
    country: { type: String, required: true, unique: false },
    profilePicture: { type: String, required: true, unique: false },
    rank: { type: Number, required: true, unique: false },
});
var TeamSchema = new mongoose_1.default.Schema({
    teamName: { type: String, required: true, unique: false },
    teamPicture: { type: String, required: true, unique: false },
    player1: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Player', required: true },
    player2: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Player', required: true },
    player3: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Player', required: true },
});
var StaffSchema = new mongoose_1.default.Schema({
    osuName: { type: String, required: true, unique: false },
    discordName: { type: String, required: true, unique: false },
    role: { type: String, required: true, unique: false },
    county: { type: String, required: true, unique: false },
    profilePicture: { type: String, required: true, unique: false },
});
var ScheduleSchema = new mongoose_1.default.Schema({});
// Example models
var Map = mongoose_1.default.model("Map", MapSchema);
var Staff = mongoose_1.default.model("Staff", StaffSchema);
var Player = mongoose_1.default.model("Player", PlayerSchema);
var Team = mongoose_1.default.model("Team", TeamSchema);
var Schedule = mongoose_1.default.model("Schedule", ScheduleSchema);
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("Seeding database...");
                    return [4 /*yield*/, mongoose_1.default.connect(MONGODB_URI)];
                case 1:
                    _d.sent();
                    console.log("Connected to MongoDB");
                    // Optional: Clear collections before seeding
                    // await User.deleteMany({});
                    // await Post.deleteMany({});
                    // Example: Insert initial db values to generate collections
                    return [4 /*yield*/, Map.create({
                            round: "temp",
                            slot: "NM1",
                            name: "Harumachi Clover",
                            difficulty: "Insane",
                            mapper: "Sotarks"
                        })];
                case 2:
                    // Optional: Clear collections before seeding
                    // await User.deleteMany({});
                    // await Post.deleteMany({});
                    // Example: Insert initial db values to generate collections
                    _d.sent();
                    return [4 /*yield*/, Player.create({
                            osuName: "Convex",
                            discordName: "convex",
                            country: "US",
                            profilePicture: "https://a.ppy.sh/11292327",
                            rank: 25000,
                        })];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, Player.create({
                            osuName: "Accnome",
                            discordName: "accnome",
                            country: "US",
                            profilePicture: "https://a.ppy.sh/10976433",
                            rank: 4000,
                        })];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, Player.create({
                            osuName: "Valene",
                            discordName: "valene",
                            country: "US",
                            profilePicture: "https://a.ppy.sh/8316080",
                            rank: 10000,
                        })];
                case 5:
                    _d.sent();
                    _b = (_a = Team).create;
                    _c = {
                        teamName: "Example Team",
                        teamPicture: "https://example.com/team.png"
                    };
                    return [4 /*yield*/, Player.findOne({ osuName: "Convex" }).then(function (p) { return p === null || p === void 0 ? void 0 : p._id; })];
                case 6:
                    _c.player1 = _d.sent();
                    return [4 /*yield*/, Player.findOne({ osuName: "Accnome" }).then(function (p) { return p === null || p === void 0 ? void 0 : p._id; })];
                case 7:
                    _c.player2 = _d.sent();
                    return [4 /*yield*/, Player.findOne({ osuName: "Valene" }).then(function (p) { return p === null || p === void 0 ? void 0 : p._id; })];
                case 8: return [4 /*yield*/, _b.apply(_a, [(_c.player3 = _d.sent(),
                            _c)])];
                case 9:
                    _d.sent();
                    return [4 /*yield*/, Staff.create({
                            osuName: "Convex",
                            discordName: "convex",
                            role: "Web Dev",
                            county: "US",
                            profilePicture: "https://a.ppy.sh/11292327",
                        })];
                case 10:
                    _d.sent();
                    return [4 /*yield*/, Schedule.create({})];
                case 11:
                    _d.sent();
                    console.log("Database seeded!");
                    return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 12:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
seed().catch(function (err) {
    console.error(err);
    process.exit(1);
});
