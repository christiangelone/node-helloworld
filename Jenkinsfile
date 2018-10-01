node {
  currentBuild.result = "SUCCESS"
  try {
    def app
    stage('Clone repo') {
      checkout scm
    }
    stage('Add AWS account id & Tag version') {
      withCredentials([string(credentialsId: 'aws-account-id', variable: 'id')]) {
        sh "sed -i 's|<AWS_ACCOUNT_ID>|$id' Dockerrun.aws.json"
      }
      sh "sed -i 's|<VERSION_TAG>|latest' Dockerrun.aws.json"
      sh 'cat Dockerrun.aws.json'
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
    stage('Publish to Docker Registry') {
      docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
        app.push("${env.BUILD_NUMBER}")
        app.push('latest')
      }  
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