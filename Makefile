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

setup-mocks:
	curl -i -X POST -H 'Content-Type: application/json' http://localhost:2525/imposters --data $(rates_api_data)

teardown-mocks:
	curl -i -X DELETE http://localhost:2525/imposters/4545

run-mocks:
	@curl -H 'Content-Type: application/json' 'http://localhost:4545/api/latest?base=USD&symbols=AUD'
	@echo

mock-smoke-test: setup-mocks run-mocks teardown-mocks
	@echo $$?
