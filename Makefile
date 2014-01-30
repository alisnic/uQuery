init:
	bower install

jshint:
	jshint lib/*.js

uquery:
	@ cat license.js > uQuery.js
	@ cat header.js >> uQuery.js
	@ cat lib/* >> uQuery.js
	@ cat footer.js >> uQuery.js

min: uquery
	uglifyjs uQuery.js --comments --mangle -o uQuery.min.js

test: min
	node test/node.js

.PHONY: test compare
