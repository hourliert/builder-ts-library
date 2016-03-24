/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import * as Tasks from './tasks';

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

export default function run(fn, options) {
  const start = new Date();
  console.log(`[${format(start)}] Starting '${fn.name}'...`); //eslint-disable-line
  return fn(options).then(() => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`[${format(end)}] Finished '${fn.name}' after ${time} ms`); //eslint-disable-line
  });
}

// if invoked via babel-node, execute the task
if (process.argv.length > 2) {
  delete require.cache[__filename];
  const taskName = process.argv[2];
  run(Tasks[taskName], process.argv[3]).catch(err => {
    console.error(err.stack); // eslint-disable-line
  });
}
