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
          sh 'npm cache clean -f'
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
    stage('Deploy to Elastic Beanstalk') {
      // when {
      //   env.BRANCH == 'development' || env.BRANCH == 'master'
      // }
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
      slackSend channel: '#jenkins-builds',
                color: 'good',
                message: "(${currentBuild.duration} ms) Pipeline ${currentBuild.fullDisplayName} from branch ${env.BRANCH_NAME}: Build has completed successfully (App tested & deployed)"
    }${env.BRANCH_NAME}
  } catch(err) {
    currentBuild.result = "FAILURE"
    stage('Failure') {
      echo 'BUILD FAILED (╥_╥)'
      throw err
      slackSend channel: '#jenkins-builds',
                color: 'danger',
                message: "(${currentBuild.duration} ms) Pipeline ${currentBuild.fullDisplayName} from branch ${env.BRANCH_NAME}: Build has failed"    
    }
  } finally {
    stage('Finished') {
      echo 'BUILD FINISHED ¯|_(ツ)_/¯'
      deleteDir()
    }
  }
}