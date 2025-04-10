#!/bin/bash
export TZ="America/Sao_Paulo"
java --enable-preview --add-modules java.se --add-exports java.base/jdk.internal.ref=ALL-UNNAMED --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.nio=ALL-UNNAMED  --add-opens java.base/sun.nio.ch=ALL-UNNAMED --add-opens java.management/sun.management=ALL-UNNAMED --add-opens jdk.management/com.sun.management.internal=ALL-UNNAMED -Dhazelcast.diagnostics.enabled=true -Dhazelcast.ignoreXxeProtectionFailures=true -Duser.language=pt -Duser.region=BR -jar /usr/local/editor-emendas/editor-emendas.jar
