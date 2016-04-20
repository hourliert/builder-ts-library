# builder-ts-library
[![npm version](https://badge.fury.io/js/builder-ts-library.svg)](https://badge.fury.io/js/builder-ts-library)

Typescript Library archetype for [builder][builder-link].
It brings a lot of features that help you to make a typescript library (publishable to npm).

It is used by [retax](https://github.com/hourliert/retax)
Please check this project to understand how to use these builder tasks.

## Getting started
You could check [builder][builder-link] if you want to understand how it works.

```
npm install --save-dev builder
npm install --save builder-ts-library
npm install --save-dev builder-ts-library
```

```yaml
# .builderrc
---
archetypes:
  - builder-ts-library
```

## Tasks
### Build
* `builder run build:commomjs`: Compile the library to ES5. Commonjs module compatible. The output folder is `./lib`
* `builder run build:es`: Compile the library to ES5. ES2015 module compatible. The output folder is `./es`
* `builder run build:typescript`: Compile the library to ES2015. ES2015 module compatible. The output folder is `./libTS` and generate typescript definition files
* `builder run build`: Execute the 3 previous tasks in parallel

### Build on change
* `builder run build:commomjs:watch`: Same as `builder run build:commonjs` in watch mode
* `builder run build:es:watch`: Same as `builder run build:es` in watch mode
* `builder run build:typescript:watch`: Same as `builder run build:typescript` in watch mode
* `builder run build:watch`: Execute the 3 previous tasks in parallel

### Test
* `builder run test:all`: Test the library once
* `builder run test:all:watch`: Test the library once and enter in watch mode (usefull for tdd)
* `builder run test:all:coverage`: Test the library and generate test coverage

### Typings
* `builder run typings:install`: Install type definition files

### Linters
* `builder run eslint`: Run eslint on the project
* `builder run tslint`: Run tslint on the project
* `builder run lint`: Run the 2 previous tasks

### Release the component
* `builder run release -- semverCompatibleVersion`: **Only if you are using git flow**. Create a release of the component. `semverCompatipleVersion` must be valid according to [semver][semver-link]
  This will update `package.json` and create a git flow release

## Builder Help

```
$ builder help builder-ts-library
Usage:

  builder <action> <task(s)>

Actions:

  run, concurrent, envs, help

Tasks:

  build:commonjs
    [builder-ts-library] gulp --cwd . --gulpfile node_modules/builder-ts-library/config/gulp/gulpfile.js build-es5

  build:commonjs:watch
    [builder-ts-library] gulp --cwd . --gulpfile node_modules/builder-ts-library/config/gulp/gulpfile.js watch-es5

  build:es
    [builder-ts-library] gulp --cwd . --gulpfile node_modules/builder-ts-library/config/gulp/gulpfile.js build-es2015

  build:es:watch
    [builder-ts-library] gulp --cwd . --gulpfile node_modules/builder-ts-library/config/gulp/gulpfile.js watch-es2015

  build:typescript
    [builder-ts-library] rimraf ./libTs && tsc -p .

  build:typescript:watch
    [builder-ts-library] tsc --project . --watch

  build:watch
    [builder-ts-library] builder concurrent build:typescript:watch build:commonjs:watch build:es:watch

  test:all
    [builder-ts-library] BABEL_ENV=commonjs jest --config node_modules/builder-ts-library/config/jest/config.json --colors

  test:all:coverage
    [builder-ts-library] BABEL_ENV=commonjs jest --config node_modules/builder-ts-library/config/jest/config.coverage.json --colors

  test:all:watch
    [builder-ts-library] BABEL_ENV=commonjs jest --config node_modules/builder-ts-library/config/jest/config.json --watch --watchExtensions ts,tsx,js --colors

  typings:install
    [builder-ts-library] typings install

  build
    [builder-ts-library] builder concurrent build:typescript build:commonjs build:es

  eslint
    [builder-ts-library] eslint --color 'src/**/*.{js,jsx}'

  lint
    [builder-ts-library] builder concurrent eslint tslint

  prepublish
    [builder-ts-library] npm run builder:compile

  release
    [builder-ts-library] node node_modules/builder-ts-library/lib/index release

  tslint
    [builder-ts-library] tslint -c tslint.json 'src/**/*.{ts,tsx}'
```

[builder-link]: http://builder.formidable.com/
[semver-link]: https://github.com/npm/node-semver
