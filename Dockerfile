FROM ubuntu AS javert-click
COPY docker/javert-setup.sh ./
RUN mkdir -p /javert-click
COPY . javert-click/
RUN chmod +x javert-setup.sh
ARG DEBIAN_FRONTEND=noninteractive
RUN ./javert-setup.sh
