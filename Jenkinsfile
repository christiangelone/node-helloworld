node {
  currentBuild.result = "SUCCESS"
  try {
    def app
    stage('Clone repo') {
      checkout scm
    }   
    stage('Build Docker Image') {
      app = docker.build('christiangelone/node-helloworld')
    }
    stage('Build app & Test') {
      app.inside {
        withEnv(['HOME=.', 'npm_config_cache=npm-cache']) {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
    stage('Publish to Docker Registry (ECR)') {
      docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
        app.push("${env.BUILD_NUMBER}")
        app.push('latest')
      }  
    }
    stage('Deploy to Elastic Beanstalk') {
      withCredentials([string(credentialsId: 'aws-account-id', variable: 'id')]) {
        sh 'chmod +x deploy.sh'
        // usage: ./deploy.sh "aws_access_key_id" \
        //                  "aws_secret_access_key" \
        //                  "aws_account_id" \
        //                  "us-east-1" \
        //                  "aws-s3-bucket-to-hold-application-versions" \
        //                  "development-1.0.0" \
        //                  "node-helloworld"
        sh "./deploy.sh $id"
      }
      echo 'Deployed!'
    }
    stage("Success") {
      echo 'BUILD SUCCEEDED (^‿^)'
      // slackSend channel: '#jenkins-ci',
      //           color: 'good',
      //           message: "Pipeline ${currentBuild.fullDisplayName}: Build ${env.BUILD_NUMBER} has completed successfully."      
    }
  } catch(err) {
    currentBuild.result = "FAILURE"
    stage('Failure') {
      echo 'BUILD FAILED (╥_╥)'
      throw err
      // slackSend channel: '#jenkins-ci',
      //           color: 'fail',
      //           message: "Pipeline ${currentBuild.fullDisplayName}: Build ${env.BUILD_NUMBER} has failed"    
    }
  } finally {
    stage('Finished') {
      echo 'BUILD FINISHED ¯|_(ツ)_/¯'
      deleteDir()
    }
  }
}