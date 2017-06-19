# prettier
yarn add --dev prettier husky lint-staged flow-bin gh-pages

	"scripts": {
	    "precommit": "lint-staged"
	  },
	"lint-staged": {
		"*.js": [
		  "prettier --write --no-semi --print-width 120",
		  "git add"
		]
	}
# sass
yarn add node-sass-chokidar

	"scripts": {
	    "build-css": "node-sass-chokidar src/ -o src/",
	    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive"
	}

# redux
yarn add redux redux-devtools-extension redux-thunk  react-redux

	import { Provider } from "react-redux"
	import { composeWithDevTools } from "redux-devtools-extension"
	import thunkMiddleware from "redux-thunk"
	import { createStore, applyMiddleware } from "redux"

	import reducers from "./reducers"

	const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

	ReactDOM.render(
	  <Provider store={store}>
	    <App />
	  </Provider>,
	  document.getElementById("root")
	)

create folders

	actions
	reducers
	components
	containers

# moment
yarn add moment

# typescript
yarn add --dev typescript @types/react-addons-update

# npm run all
run scripts in parallel

yarn add npm-run-all

	"scripts": {
	  "start": "npm-run-all -p init lint-staged"
	}

