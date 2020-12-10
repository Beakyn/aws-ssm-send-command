import * as core from '@actions/core';

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

export default getInputs;