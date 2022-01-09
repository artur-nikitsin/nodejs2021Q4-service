FROM postgres:14.1

EXPOSE 8080


#FROM dockerhub-docker-remote.artifactory.platform.vwfs.io/node:14-buster-slim
#
#WORKDIR /opt/app
#
#RUN chown -R node:node /opt/app
#
#COPY --chown=node:node . /opt/app/
#
#RUN yarn --silent install --no-progress --frozen-lockfile
#
#RUN yarn run tsc
#
## clean up the node_modules
#RUN apt-get update -y && apt-get upgrade -y
#RUN apt-get install -y jq
#RUN cp ./yarnclean ./.yarnclean
#RUN ["/bin/bash", "-c", "/opt/app/autocleaner.sh dep devDep"]
#
#RUN apt-get remove -y jq
#
#RUN apt-get autoremove -y && \
#    apt-get clean -y && \
#    rm -rf /var/lib/apt/lists/*
#
#ENV NODE_ENV=production
#USER node
#EXPOSE 8080
#CMD [ "node", "dist/main.js" ]
