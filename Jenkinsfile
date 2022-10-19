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
                        sh "mvn clean package -Dmaven.test.skip=true"
                    }
            }
        }
        stage('Generate Docker Image') {
            steps {
                script {
                    echo "BRANCH_NAME: ${env.BRANCH_NAME}"
                    def imageVersion = 'latest'
                    if (env.TAG_NAME || env.BRANCH_NAME == 'develop') {
                        imageVersion = env.TAG_NAME ?: 'latest'
                    } else {
                        def adjustedBranch = env.BRANCH_NAME.replace('/', '-')
                        imageVersion = 'latest-' + adjustedBranch
                    }
                    docker.withRegistry('https://registry.senado.leg.br', 'docker-registry-deployer') {
                        def image = docker.build("leg/editor-emendas:${imageVersion}",
                        '--build-arg uid=2000 --build-arg gid=2000 .')
                        image.push()
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
