install:
	pip install -r dependencies.lock

install/dev:
	pip install -r dev-dependencies.lock

update:
	pip-compile --upgrade --generate-hashes --output-file=dependencies.lock --no-annotate dependencies.in
	pip-compile --upgrade --generate-hashes --output-file=dev-dependencies.lock --no-annotate dev-dependencies.in

compile:
	python -m compileall -q .
	mypy src

lint:
	ruff check src

lint/fix:
	ruff check src --fix

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