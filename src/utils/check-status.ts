import SSM from "aws-sdk/clients/ssm";

import getDataByCommandId from './get-data-by-command-id';

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
  const begin = Date.now();
  console.log('== Debug params');
  console.log(`=== instance id ${instanceId}`);
  console.log(`=== command id ${commandId}`);
  console.log(`=== internval ${interval}`);
  const response = await getDataByCommandId(ssm, instanceId, commandId);
  console.log('Get data by command id end')
  const end = Date.now();
  const requestInterval = end - begin;
  const missingInterval = interval - requestInterval;

  return new Promise((resolve) => {
    console.log('response.Status => ', response.Status);

    let status = '';
    const failureStatus: (string | undefined)[] = [STATUS_SSM.CANCELLED, STATUS_SSM.TIMEOUT, STATUS_SSM.FAILED];

    if (response.Status == STATUS_SSM.SUCCESS) {
      status = 'Success'
    } else if (failureStatus.indexOf(response.Status) !== -1) {
      status = 'Failed'
    }

    setTimeout(() => {
      resolve(status);
    }, missingInterval < 0 ? 0 : missingInterval);
  });
}

export default checkStatus;