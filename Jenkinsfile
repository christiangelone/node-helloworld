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
    stage('Test') {
      app.inside {
        sh 'cd /usr/src/app'
        sh 'npm test'
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