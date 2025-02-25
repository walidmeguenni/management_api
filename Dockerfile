FROM node:20.17.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
COPY start.sh .
RUN chmod +x start.sh
EXPOSE 4000 
CMD ["./start.sh"]