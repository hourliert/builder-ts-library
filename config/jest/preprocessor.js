const tsc = require('typescript');
const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      const transpiledTs = tsc.transpile(
        src,
        {
          module: tsc.ModuleKind.ES2015,
          jsx: tsc.JsxEmit.Preserve,
          target: tsc.ScriptTarget.ES2015,
        },
        path,
        []
      );

      const transpiledBabel = babel.transform(transpiledTs, {
        auxiliaryCommentBefore: ' istanbul ignore next ',
        filename: path,
        presets: [jestPreset],
        retainLines: true,
      }).code;

      return transpiledBabel;
    }

    return src;
  },
};
