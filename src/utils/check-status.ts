import SSM from "aws-sdk/clients/ssm";

import getDataByCommandId from './get-data-by-command-id';

const sleep = (interval: number) => new Promise((resolve) => {
  setTimeout(resolve, interval)
})

const STATUS_SSM = {
  PENDING: 'Pending',
  IN_PROGRESS: 'InProgress',
  SUCCESS: 'Success',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
  TIMEOUT: 'TimedOut',
  CANCELLING: 'Cancelling'
};

const checkStatus = async (ssm: SSM, instanceId: string, commandId: string, interval = 10000): Promise<string> => {
  await sleep(interval);
  const response = await getDataByCommandId(ssm, instanceId, commandId);

  console.log('response.Status => ', response.Status);

  let status = '';
  const failureStatus: (string | undefined)[] = [STATUS_SSM.CANCELLED, STATUS_SSM.TIMEOUT, STATUS_SSM.FAILED];

  if (response.Status == STATUS_SSM.SUCCESS) {
    status = 'Success'
  } else if (failureStatus.indexOf(response.Status) !== -1) {
    status = 'Failed'
  }

  return status;
}

export default checkStatus;