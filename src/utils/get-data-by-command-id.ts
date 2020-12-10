import SSM, { GetCommandInvocationResult } from "aws-sdk/clients/ssm";

const getDataByCommandId = (ssm: SSM, instanceId: string, commandId: string): Promise<GetCommandInvocationResult> =>
  new Promise((resolve, reject) => {
    var params = {
      CommandId: commandId,
      InstanceId: instanceId,
    };

    console.log('Get data by command id begin')
    ssm.getCommandInvocation(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });

export default getDataByCommandId;
