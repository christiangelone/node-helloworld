node {
  currentBuild.result = "SUCCESS"
  try {
    def app
    stage('Clone repo') {
      checkout scm
    }   
    stage('Build Docker Image') {
      app = docker.build('node-helloworld')
    }
    stage('Build app & Test') {
      app.inside {
        withEnv(['HOME=.', 'npm_config_cache=npm-cache']) {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
    stage('Deploy to Elastic Beanstalk') {
      withCredentials([
        string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
        string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'),
        string(credentialsId: 'docker-registry-uri', variable: 'DOCKER_REGISTRY_URI'),
        string(credentialsId: 's3-bucket', variable: 'S3_BUCKET')
      ]) {
        sh 'chmod +x deploy.sh'
        sh """
          ./deploy.sh "$AWS_ACCESS_KEY_ID" \
                      "$AWS_SECRET_ACCESS_KEY" \
                      "$DOCKER_REGISTRY_URI" \
                      'us-east-1' \
                      "$S3_BUCKET" \
                      'development' \
                      "development-${env.BUILD_NUMBER}" \
                      'node-helloworld'
        """
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