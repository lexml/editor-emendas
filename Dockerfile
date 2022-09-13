FROM eclipse-temurin:17-jdk-focal
EXPOSE 8080
ARG uid
ARG gid

RUN mkdir -p /usr/local/editor-emendas/bin && \
    groupadd -g $gid -r editoremendas && \
    useradd -u $uid -r -g editoremendas -d /usr/local/editor-emendas editoremendas && \
    chown editoremendas:editoremendas /usr/local/editor-emendas && \
    apt-get -y update && \
    apt-get -y install wget dnsutils iproute2
USER editoremendas:editoremendas
WORKDIR /usr/local/editor-emendas

COPY run.sh .
COPY target/editor-emendas.jar .
COPY bin/jsonix-lexml-linux ./bin

RUN chmod 755 ./bin/jsonix-lexml-linux

CMD ["/usr/local/editor-emendas/run.sh"]
