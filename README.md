# SSM Command Status Tracker action

This action helps you to execute remote bash command for AWS EC2 instance and to get the feedback/status from it.

(This action internally uses AWS SSM Send-Command and AWS SSM Check-Status.)

## Requirements

1. To use this action, you have to set AWS IAM Role `AmazonSSMFullAccess` to your IAM user.
2. Also your EC2 Instance must have IAM Role including `AmazonSSMFullAccess`.

## Inputs

`access-key-id`: AWS access key id. (**required**)

`secret-access-key`: AWS secret access key. (**required**)

`region`: Where EC2 instance is. (**required**)

`instance-id`: AWS EC2 Instance id. (**required**)

`command`: Bash command you want to execute. (**required**)

`working-directory`: Command execution location. (**required**)

`timeout`: Max time running. (default: 600000 = 10 minutes)

`interval`: Time between each check status function. (default: 10000 = 10 seconds)

## Outputs

`command-id`: Command id for ssm send-command.

## Example

```yaml
- name: AWS SSM Send-Command
  uses: Beakyn/aws-ssm-send-command@main
  id: ssm
  with:
    aws-region: ${{ secrets.AWS_REGION }}
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

    instance-id: ${{ secrets.INSTANCE_ID }}
    working-directory: /home/ubuntu/application
    command: echo "Hello World"

    timeout: 100000
    interval: 6000
```

## Error Handling

### AccessDeniedException

This error occurs when you are not set AWS IAM role about SSM. Please set the IAM permission `AmazonSSMFullAccess` (recommended)

### InvalidInstanceId: null

This error occurs when you are not attach AWS IAM role to your EC2 instance. Please set the IAM role `AmazonSSMFullAccess` (recommended)

> In almost error cases, those issues would be resolved when you set IAM Role to your `AWS Account` and `EC2 IAM Role`.
