#!/bin/bash

VERSION=$1
if [[ -z "$VERSION" ]]; then
  VERSION="latest"
fi

function getExtraParameters {
  if [[ ! -z "$http_proxy" ]]; then
    PROXY="http://"$(ip addr list docker0 |grep "inet " |cut -d' ' -f6|cut -d/ -f1)":3128"
    echo "--build-arg http_proxy=$PROXY --build-arg https_proxy=$PROXY"
  else
    echo ""
  fi
}
EXTRA_PARAMS=$(getExtraParameters)
echo "Extra parameters: $EXTRA_PARAMS"

docker build ${EXTRA_PARAMS} --build-arg uid=2000 --build-arg gid=2000 . -t registry.senado.leg.br/leg/editor-emendas:${VERSION}
