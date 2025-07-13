FROM python:3.13-slim

WORKDIR /app

COPY src/ src/.
COPY static static/.

RUN apt-get update && apt-get install -y make && rm -rf /var/lib/apt/lists/*

COPY dependencies.lock .
COPY Makefile .

RUN make install

ENV PORT=8000
ENV HOST=0.0.0.0

EXPOSE ${PORT}

CMD ["make", "start"]