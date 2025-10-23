FROM node:20-alpine

# Create folders

RUN mkdir /evm-bridge

# Install evm-bridge dependencies

ADD ./evm-bridge/package.json /evm-bridge/package.json
ADD ./evm-bridge/package-lock.json /evm-bridge/package-lock.json

WORKDIR /evm-bridge

RUN npm install

# Copy and build evm-bridge

COPY evm-bridge/. /evm-bridge/.

WORKDIR /evm-bridge

RUN npm run build

# Copy startup script

COPY docker-startup.sh /bin/docker-startup.sh
RUN chmod +x /bin/docker-startup.sh

# Env

ENV NODE_ENV=production

# Expose

EXPOSE 80
EXPOSE 443

# Entry

ENTRYPOINT [ "/bin/docker-startup.sh" ]
