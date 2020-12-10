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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const core = __importStar(require("@actions/core"));
const send_command_1 = __importDefault(require("./utils/send-command"));
const check_status_1 = __importDefault(require("./utils/check-status"));
const get_inputs_1 = __importDefault(require("./utils/get-inputs"));
try {
    // Variables
    const { accessKeyId, secretAccessKey, region, instanceId, command, workingDirectory, timeout, interval, } = get_inputs_1.default();
    // AWS Configure
    aws_sdk_1.default.config.update({
        accessKeyId,
        secretAccessKey,
        region,
    });
    const ssm = new aws_sdk_1.default.SSM();
    // Send command to SSM
    send_command_1.default(ssm, instanceId, workingDirectory, command)
        .then((commandId) => __awaiter(void 0, void 0, void 0, function* () {
        // Retry check status function
        const begin = Date.now();
        let status = '';
        do {
            // Check status from command
            status = yield check_status_1.default(ssm, instanceId, commandId, interval);
        } while (status == '' && Date.now() - begin < timeout);
        // Check failed status 
        if (status === '' || status === 'Failed') {
            console.error('ERROR FAILED');
            core.setFailed("Failed command");
            return;
        }
        console.log('SUCCESS');
        core.setOutput("command-id", commandId);
    }))
        .catch((error) => {
        console.error(error, error.stack);
        core.setFailed(error);
    });
}
catch (error) {
    console.error(error, error.stack);
    core.setFailed(error);
}
