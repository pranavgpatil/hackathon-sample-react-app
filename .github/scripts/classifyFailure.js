const { spawnSync } = require('child_process');
const fs = require('fs');

const log = fs.readFileSync('test-output.log', 'utf8'); // safer for large logs

const result = spawnSync('python3', ['.github/scripts/classify.py'], {
  input: log,
  encoding: 'utf-8'
});
// console.log('STDERR:', result.stderr.toString());
// console.log('STDOUT:', result.stdout.toString());

const classification = result.stdout.toString().trim();
console.log('Failure classification:', classification)


if (classification === 'critical' || classification === 'flaky') {
  console.log('Triggering auto-revert...');
  require('./autoRevert.js');
} else if (classification === 'infra') {
  console.log('Infra issue detected. Sending Slack notification...');
}