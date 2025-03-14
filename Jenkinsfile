// não retirar esse caractere ' _' depois do )
@Library('senado-build-library') _
dockerBuildStandardPipeline {
    email = 'ls_sesap@senado.leg.br'
    jdk = 'java-17-lts'
    environmentToCI = 'desenvolvimento'
    skipIntegrationTestOnIC=true
    skipUnitTestOnIC=true
    buildNpmFrontend=true
    npmFrontendDirs = ['jsapp']
    nodejs = 'nodejs14-lts'
}
