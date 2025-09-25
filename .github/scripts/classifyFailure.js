const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

const log = execSync('cat test-output.log').toString(); // Replace with actual log file path
const result = spawnSync('python3', ['.github/scripts/classify.py', log]);

const classification = result.stdout.toString().trim();
console.log('Failure classification:', classification);

if (classification === 'critical' || classification === 'flaky' || !classification) {
  console.log('Triggering auto-revert...');
  require('./autoRevert.js');
} else if (classification === 'infra') {
  console.log('Infra issue detected. Sending Slack notification...');
  require('./notifySlack.js');
}