"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const getInputs = () => {
    const requiredOptions = { required: true };
    const accessKeyId = core.getInput("aws-access-key-id", requiredOptions);
    const secretAccessKey = core.getInput("aws-secret-access-key", requiredOptions);
    const region = core.getInput("aws-region", requiredOptions);
    const instanceId = core.getInput("instance-id", requiredOptions);
    const command = core.getInput("command", requiredOptions);
    const workingDirectory = core.getInput("working-directory", requiredOptions);
    const timeout = Number(core.getInput('timeout'));
    const interval = Number(core.getInput('interval'));
    return {
        accessKeyId,
        secretAccessKey,
        region,
        instanceId,
        command,
        workingDirectory,
        timeout,
        interval,
    };
};
exports.default = getInputs;
