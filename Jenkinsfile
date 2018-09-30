node {
  def app
  stage('Clone repo'){
    checkout scm
  }
  stage('Build Docker Image'){
    app = docker.build('christiangelone/node-helloworld')          
  }
  stage('Test'){
    app.inside {
      sh 'npm test'
    }
  }
  stage('Publish to Docker Registry'){
    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
      app.push("${env.BUILD_NUMBER}")
      app.push('latest')
    }     
  }
  post {
    always {
      echo 'BUILD FINISHED ¯|_(ツ)_/¯'
      deleteDir()
    }
    success {
      echo 'BUILD SUCCEEDED (^‿^)'
      // slackSend channel: '#jenkins-ci',
      //           color: 'good',
      //           message: "Pipeline ${currentBuild.fullDisplayName}: Build ${env.BUILD_NUMBER} has completed successfully."      
    }
    failure {
      echo 'BUILD FAILED (╥_╥)'
      // slackSend channel: '#jenkins-ci',
      //           color: 'fail',
      //           message: "Pipeline ${currentBuild.fullDisplayName}: Build ${env.BUILD_NUMBER} has failed"    
    }
  }
}