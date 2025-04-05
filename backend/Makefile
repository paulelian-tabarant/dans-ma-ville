venv:
	source venv/bin/activate

install:
	pip install -r dependencies.lock

install/dev:
	pip install -r dev-dependencies.lock

update:
	pip-compile --generate-hashes --output-file=dependencies.lock dependencies.in
	pip-compile --generate-hashes --output-file=dev-dependencies.lock dev-dependencies.in

lint:
	ruff check src

type-check:
	mypy src

test:
	pytest -v

start/dev:
	uvicorn src.main:app --reload

start:
	uvicorn src.main:app --host $(HOST) --port $(PORT)

build/docker:
	docker build -t dans-ma-ville-backend .

start/docker:
	docker run -p 8000:8000 dans-ma-ville-backend