FROM ubuntu AS javert-post
COPY docker/javert-setup.sh ./
RUN mkdir -p /javert-post
COPY . javert-post/
RUN chmod +x javert-setup.sh
ARG DEBIAN_FRONTEND=noninteractive
RUN ./javert-setup.sh
