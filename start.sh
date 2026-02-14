docker build \
  --build-arg NEXT_PUBLIC_AUTH_URL=http://localhost:3000 \
  --build-arg NEXT_PUBLIC_API_URL=https://dummyjson.com \
  -t nextjs-app .

docker run -p 3000:3000 nextjs-app

docker-compose up --build
