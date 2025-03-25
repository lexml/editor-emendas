// não retirar esse caractere ' _' depois do )
@Library('senado-build-library') _
dockerBuildStandardPipeline {
    email = 'ls_sesap@senado.leg.br'
    jdk = 'java11lts'
    environmentToCI = 'desenvolvimento'
    helmDeliveryJobName = 'lexml/helm-leg-editor-emendas/main'
    skipIntegrationTestOnIC=true
    skipUnitTestOnIC=true
    buildNpmFrontend=true
    npmFrontendDirs = ['jsapp']
    nodejs = 'nodejs16-lts'
    productionBranch = 'main'
}
