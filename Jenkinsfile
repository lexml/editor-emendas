// não retirar esse caractere ' _' depois do )
@Library('senado-build-library') _
withEnv(['CYPRESS_INSTALL_BINARY=0']) {
    dockerBuildStandardPipeline {
        email = 'ls_sesap@senado.leg.br'
        jdk = 'java-17-lts'
        environmentToCI = 'desenvolvimento'
        skipIntegrationTestOnIC=true
        skipUnitTestOnIC=true
        buildNpmFrontend=true
        npmFrontendDirs = ['jsapp']
        nodejs = 'nodejs16-lts'
        productionBranch = 'main'
    }
}
