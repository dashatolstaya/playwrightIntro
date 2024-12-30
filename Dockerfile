FROM node:20.18-slim
LABEL authors="user"

RUN npx -y playwright@1.49.1 install --with-deps
