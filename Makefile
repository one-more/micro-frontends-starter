link_packages:
	rm -rf ./node_modules/@micro-frontends
	rm -f ./node_modules/.bin/micro-frontends-start.js
	ln -s $(subst $(notdir $(CURDIR)),,$(CURDIR))micro-frontends/packages ./node_modules/@micro-frontends
	ln -s $(subst $(notdir $(CURDIR)),,$(CURDIR))micro-frontends/packages/scripts/bin/micro-frontends-start-dev-server.js ./node_modules/.bin/micro-frontends-start.js
	npm --prefix $(CURDIR)/node_modules/@micro-frontends/scripts i
	npm --prefix $(CURDIR)/node_modules/@micro-frontends/core i
	npm --prefix $(CURDIR)/node_modules/@micro-frontends/config i
	npm --prefix $(CURDIR)/node_modules/@micro-frontends/framework i
	rm -rf $(CURDIR)/node_modules/@micro-frontends/framework/node_modules/@micro-frontends/core
	ln -s $(subst $(notdir $(CURDIR)),,$(CURDIR))micro-frontends/packages/core ./node_modules/@micro-frontends/framework/node_modules/@micro-frontends/core

publish_packages:
	cd $(CURDIR)/node_modules/@micro-frontends/scripts && npm publish && cd -
	cd $(CURDIR)/node_modules/@micro-frontends/core && npm publish && cd -
	cd $(CURDIR)/node_modules/@micro-frontends/config && npm publish && cd -
	cd $(CURDIR)/node_modules/@micro-frontends/framework && npm publish && cd -
	node scripts/update-versions.js

update_packages:
	git stash
	git checkout master
	npx update-by-scope @micro-frontends npm install
	git add package.json
	git diff-index --quiet HEAD || git commit -m "update @micro-frontends packages"
	git push
	git checkout demo
	git stash pop