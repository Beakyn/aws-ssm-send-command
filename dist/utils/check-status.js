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
const get_data_by_command_id_1 = __importDefault(require("./get-data-by-command-id"));
const sleep = (interval) => new Promise((resolve) => {
    setTimeout(resolve, interval);
});
const STATUS_SSM = {
    PENDING: 'Pending',
    IN_PROGRESS: 'InProgress',
    SUCCESS: 'Success',
    CANCELLED: 'Cancelled',
    FAILED: 'Failed',
    TIMEOUT: 'TimedOut',
    CANCELLING: 'Cancelling'
};
const checkStatus = (ssm, instanceId, commandId, interval = 10000) => __awaiter(void 0, void 0, void 0, function* () {
    yield sleep(interval);
    const response = yield get_data_by_command_id_1.default(ssm, instanceId, commandId);
    console.log('response.Status => ', response.Status);
    let status = '';
    const failureStatus = [STATUS_SSM.CANCELLED, STATUS_SSM.TIMEOUT, STATUS_SSM.FAILED];
    if (response.Status == STATUS_SSM.SUCCESS) {
        status = 'Success';
    }
    else if (failureStatus.indexOf(response.Status) !== -1) {
        status = 'Failed';
    }
    return status;
});
exports.default = checkStatus;
