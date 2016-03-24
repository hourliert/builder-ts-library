import cp from 'child_process';

export function execCmd(cmd) {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, err => {
      if (err) reject(err); // eslint-disable-line
      resolve();
    });
  });
}
