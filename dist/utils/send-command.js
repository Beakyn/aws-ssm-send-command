"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendCommand = (ssm, instanceId, workingDirectory, command) => new Promise((resolve, reject) => {
    ssm.sendCommand({
        InstanceIds: [instanceId],
        DocumentName: 'AWS-RunShellScript',
        Parameters: {
            workingDirectory: [workingDirectory],
            commands: [command],
        },
    }, (err, data) => {
        var _a, _b;
        if (err) {
            reject(err);
            return;
        }
        console.log(`data.Command.CommandId ${(_a = data.Command) === null || _a === void 0 ? void 0 : _a.CommandId}`);
        console.log("\n\n");
        resolve((_b = data.Command) === null || _b === void 0 ? void 0 : _b.CommandId);
    });
});
exports.default = sendCommand;
