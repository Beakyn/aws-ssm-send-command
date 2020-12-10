import SSM, { CommandId } from "aws-sdk/clients/ssm";

const sendCommand = (ssm: SSM, instanceId: string, workingDirectory: string, command: string): Promise<CommandId> => new Promise((resolve, reject) => {
    ssm.sendCommand(
      {
        InstanceIds: [instanceId],
        DocumentName: 'AWS-RunShellScript',
        Parameters: {
          workingDirectory: [workingDirectory],
          commands: [command],
        },
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
    
        console.log(`data.Command.CommandId ${data.Command?.CommandId}`);
        console.log("\n\n");
        resolve(data.Command?.CommandId)
      }
    );
  });
  
  export default sendCommand;