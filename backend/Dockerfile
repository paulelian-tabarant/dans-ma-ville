FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y make && rm -rf /var/lib/apt/lists/*

COPY dependencies.lock .
COPY Makefile .

# Add a non-root user for better security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser
# Allow execution of PIP commands that were installed during the build
ENV PATH="/home/appuser/.local/bin:${PATH}"

RUN make install

COPY src/ src/.
COPY static/ static/.

ENV PORT=8000
ENV HOST=0.0.0.0

EXPOSE ${PORT}

CMD ["make", "start"]