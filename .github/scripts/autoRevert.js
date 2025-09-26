
const { execSync } = require('child_process');

try {
  const lastCommit = execSync('git log -1 --pretty=format:"%H"').toString().trim();
  console.log(`Reverting commit: ${lastCommit}`);

  execSync('git config user.name "github-actions[bot]"');
  execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');

  execSync('git clean -fd');
//   execSync('git reset --hard');

  execSync(`git revert ${lastCommit} --no-edit`);

  execSync('git push origin HEAD');

  console.log('Revert pushed successfully.');
} catch (err) {
  console.error('Auto-revert failed:', err.message);
  process.exit(1);
}
