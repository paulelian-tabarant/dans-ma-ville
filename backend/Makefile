install-deps:
	pip install -r dependencies.lock

install-dev-deps:
	pip install -r dev-dependencies.lock

lock-deps:
	pip-compile --generate-hashes --output-file=dependencies.lock dependencies.in
	pip-compile --generate-hashes --output-file=dev-dependencies.lock dev-dependencies.in