FROM debian:stable-slim AS runtime

# install curl
RUN apt-get update && apt-get install -y curl unzip

# install bun
ENV BUN_INSTALL /usr/local
RUN curl -fsSL https://bun.sh/install | bash

FROM runtime AS production

# install deps from package.json
COPY . /app
WORKDIR /app
RUN bun install
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# run the app
CMD ["bun", "start"]