"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Campaign_1 = require("./Campaign");
const Submission_1 = require("./Submission");
let Application = class Application extends sequelize_typescript_1.Model {
};
exports.Application = Application;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Application.prototype, "creatorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Application.prototype, "creator", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Campaign_1.Campaign),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Application.prototype, "campaignId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Campaign_1.Campaign),
    __metadata("design:type", Campaign_1.Campaign)
], Application.prototype, "campaign", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM('PENDING', 'APPROVED', 'REJECTED')),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Application.prototype, "submittedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Submission_1.Submission),
    __metadata("design:type", Submission_1.Submission)
], Application.prototype, "submission", void 0);
exports.Application = Application = __decorate([
    sequelize_typescript_1.Table
], Application);
//# sourceMappingURL=Application.js.map