FROM base_env:0.1

ENV HOME=/elice

WORKDIR $HOME/node_docker

COPY package*.json yarn.lock $HOME/node_docker/

RUN yarn install --silent --progress=false

COPY . $HOME/node_docker

ENTRYPOINT ["yarn", "build"]