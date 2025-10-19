FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y make && rm -rf /var/lib/apt/lists/*

COPY dependencies.lock .
COPY Makefile .

RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser
CMD "export PATH=/home/appuser/.local/bin:$PATH"

RUN make install

COPY src/ src/.
COPY static/ static/.

ENV PORT=8000
ENV HOST=0.0.0.0

EXPOSE ${PORT}

CMD ["make", "start"]