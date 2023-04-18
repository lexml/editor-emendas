#!groovy

pipeline {
    agent {
        label 'pipeline'
    }

    tools {
        jdk 'java-17-lts'
        maven 'maven'
        nodejs 'nodejs14-lts'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('jsapp') {
                    withNPM(npmrcConfig: 'a609eeee-735e-43fa-b15e-a9e30841616c') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build API') {
            steps {
                    withMaven(maven: 'maven') {
                        sh "mvn clean package -U -Dmaven.test.skip=true"
                    }
            }
        }
        stage('Generate Docker Image') {
            steps {
                script {

                    def imageVersion = ''
                    def imageTag = ''
                    if (env.TAG_NAME) {
                        imageVersion = env.TAG_NAME
                    } else {
                        def adjustedBranch = env.BRANCH_NAME.replace('/', '-')
                        imageVersion = "${adjustedBranch}-${env.BUILD_NUMBER}"
                        if (env.BRANCH_NAME == 'develop') {
                            imageTag = 'latest'
                        } else {
                            imageTag = "${adjustedBranch}-latest"
                        }
                    }
                    docker.withRegistry('https://registry.senado.leg.br', 'docker-registry-deployer') {
                        def image = docker.build("leg/editor-emendas:${imageVersion}",
                        '--build-arg uid=2000 --build-arg gid=2000 .')
                        image.push()
                        if (imageTag) {
                            image.push(imageTag)
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                build job: 'stack-leg-editor-emendas',
                        parameters: [
                                string(name: 'ambiente', value: 'desenvolvimento'),
                                imageTag(imageName: 'leg/editor-emendas', imageTag: 'latest', name: 'image')]
            }
        }
    }
}
