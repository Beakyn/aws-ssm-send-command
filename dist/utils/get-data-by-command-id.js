"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDataByCommandId = (ssm, instanceId, commandId) => new Promise((resolve, reject) => {
    var params = {
        CommandId: commandId,
        InstanceId: instanceId,
    };
    console.log('Get data by command id begin');
    ssm.getCommandInvocation(params, function (err, data) {
        if (err)
            reject(err);
        else
            resolve(data);
    });
});
exports.default = getDataByCommandId;
