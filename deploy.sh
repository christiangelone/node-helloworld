#!/bin/bash

# usage: ./deploy.sh "aws_access_key_id" "aws_secret_access_key" "aws_account_id" "us-east-1" "aws-s3-bucket-to-hold-application-versions" "development-1.0.0" "node-helloworld"

if [[ -z $1 || -z $2 || -z $3 || -z $4 || -z $5 || -z $6 || -z $7 ]]; then
  echo 'deploy.sh: One or more parameters are empty/undefined'
  exit 1
fi

AWS_ACCESS_KEY_ID=$1
AWS_SECRET_ACCESS_KEY=$2

AWS_ACCOUNT_ID=$3 # eg: 12345678900
REGION=$4 # eg: us-east-1
EB_BUCKET=$5 # eg: aws-s3-bucket-to-hold-application-versions

VERSION_TAG=$6 # eg: development-1.0.0
ZIP="$VERSION_TAG.zip"

NAME=$7 # eg: node-helloworld

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set output 'json'
aws configure set default.region $REGION

# Replace the <AWS_ACCOUNT_ID> with the real ID
sed -i "s|<AWS_ACCOUNT_ID>|$AWS_ACCOUNT_ID|" Dockerrun.aws.json
# Replace the <NAME> with the real name
sed -i "s|<NAME>|$NAME|" Dockerrun.aws.json
# Replace the <TAG> with the real version number
sed -i "s|<VERSION_TAG>|$VERSION_TAG|" Dockerrun.aws.json

# Zip up the Dockerrun file (feel free to zip up an .ebextensions directory with it)
zip -r $ZIP Dockerrun.aws.json

aws s3 cp $ZIP "s3://$EB_BUCKET/$ZIP"

# Create a new application version with the zipped up Dockerrun file
aws elasticbeanstalk create-application-version --application-name "$NAME" \
    --version-label $VERSION_TAG --source-bundle S3Bucket=$EB_BUCKET,S3Key=$ZIP

# Update the environment to use the new application version
aws elasticbeanstalk update-environment --environment-name $NAME \
      --version-label $VERSION_TAG
