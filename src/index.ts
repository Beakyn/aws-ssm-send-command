import AWS from 'aws-sdk';
import * as core from '@actions/core';

import sendCommand from './utils/send-command';
import checkStatus from './utils/check-status';
import getInputs from './utils/get-inputs';

try {
  // Variables
  const {
    accessKeyId,
    secretAccessKey,
    region,
    instanceId,
    command,
    workingDirectory,
    timeout,
    interval,
  } = getInputs();

  // AWS Configure
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
  });
  const ssm = new AWS.SSM();

  // Send command to SSM
  sendCommand(ssm, instanceId, workingDirectory, command)
  .then(async (commandId: string) => {
    // Retry check status function
    const begin = Date.now();
    let status = ''
    do {
      // Check status from command
      status = await checkStatus(ssm, instanceId, commandId, interval);
    } while(status == '' && Date.now() - begin < timeout)
    

    // Check failed status 
    if (status === '' || status === 'Failed') {
      console.error('ERROR FAILED');
      core.setFailed("Failed command");
      return
    }

    console.log('SUCCESS');
    core.setOutput("command-id", commandId);
  });
} catch(error) {
  console.error(error, error.stack);
  core.setFailed(error);
}