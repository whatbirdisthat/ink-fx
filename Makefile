define rates_api_data
'{ \
	"port": 4545, \
	"protocol": "http", \
	"stubs": [{ \
		"predicates": [ \
			{ \
				"equals": { \
				"method": "GET", \
				"path": "/api/latest" \
			} \
		}], \
		"responses": [ \
			{ "is": { \
				"statusCode": 200, \
				"headers": { \
					"Content-Type": "application/json" \
				}, \
				"body": \
					{"base":"USD","rates":{"AUD":1.3908435778},"date":"2020-10-09"} \
				} \
			} \
		] \
	}] \
}'
endef
start-mountebank:
	mb

# if you don't want to install mountebank locally
start-mountebank-npx:
	npx mountebank

setup-mocks:
#	curl -i -X POST -H 'Content-Type: application/json' http://localhost:2525/imposters --data $(rates_api_data)
	@echo $(rates_api_data) | http POST 'http://localhost:2525/imposters' 'Content-Type: application/json'
	@echo

teardown-mocks:
	@echo
	#curl -i -X DELETE http://localhost:2525/imposters/4545
	http DELETE http://localhost:2525/imposters/4545

run-mocks:
	@echo
	@export FAKE_RATESAPI=1
#	@curl -H 'Content-Type: application/json' 'http://localhost:4545/api/latest?base=USD&symbols=AUD'
	@http 'http://localhost:4545/api/latest?base=USD&symbols=AUD' 'Content-Type: application/json'
	@echo

ping-mountebank:
	@echo
	@echo Checking for mountebank on localhost:2525
	@nc -z localhost 2525
	@echo Greetings mountebank on localhost:2525

smoke-test: ping-mountebank setup-mocks run-mocks teardown-mocks
	@echo $$?

define HELP_TEXT
In a terminal, run `make mock-smoke-test`. This will inform you
that you now have mountebank running. This smoke test will leave mountebank running.

Running mountebank in a terminal means control-c will stop it right there.

A Fake Workflow:

run `make start-mountebank` in one terminal window.
In the second you can interact with mountebank.

When you're developing mountebank fakes, it helps to
see the mountebank logs in real time.

Another tip, try HTTPIE, and jq. They are colourful.
endef

export HELP_TEXT

help:
	$(info $(HELP_TEXT))

.PHONY: help
