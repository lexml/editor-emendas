#!/bin/bash

inicializar_ssh_agent() {
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  echo "=> SSH agent iniciado e chave privada adicionada."
}

sincronizar_branch() {
  local remote=$1
  local branch=$2

  # Obtém o hash do último commit local sincronizado com o remote 'origin' na branch 'develop'
  origin_hash=$(git rev-parse "$branch")

  # Obtém o hash do último commit no remote especificado na variável 'remote' para a branch 'develop'
  remote_hash=$(git ls-remote "$remote" refs/heads/"$branch" | awk '{print $1}')

  if [ "$origin_hash" == "$remote_hash" ]; then
    echo "===> Não há commits para sincronizar entre $branch e '$remote/$branch'." #: '$origin_hash' e '$remote_hash'."
  else
    echo "=> Os commits estão diferentes entre $branch e $remote/$branch." #: '$origin_hash' e '$remote_hash'."
    git push -f $remote $branch
    echo "===> Sincronização $remote $branch concluída."
  fi
}

remote="senado"

# Verifica se o parâmetro foi informado; se não, utiliza remote "senado"
if [ -n "$1"  ]; then
  remote=$1
fi

inicializar_ssh_agent
echo ""

git checkout develop
echo "=> Verificando sincronização do remote '$remote', branch develop"

sincronizar_branch "$remote" "develop"
echo ""

# Verifica se a branch existe na lista de branches locais
if ! git branch --list | grep -q "^  $remote-main$"; then
  echo "=> Criando branch '$remote-main'."
  git checkout -b "$remote-main" "$remote"/main
else
  echo "=> Checkout da branch '$remote-main'."
  git checkout "$remote-main"
fi
git pull -f

echo ""
echo "=> Verificando sincronização do origin, branch main"

sincronizar_branch "origin" "main"

echo ""
echo "=> Sincronização finalizada. Retornando para a branch origin/develop."
git checkout develop
