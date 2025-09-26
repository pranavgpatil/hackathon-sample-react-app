const { execSync } = require('child_process');

try {
  execSync('git checkout main');
  const lastCommit = execSync('git rev-parse HEAD').toString().trim();
  console.log(`🔁 Reverting commit: ${lastCommit}`);

  execSync('git config user.name "github-actions[bot]"');
  execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');

  // Check if there are changes to stash
  const status = execSync('git status --porcelain').toString().trim();
  let hasStash = false;

  if (status) {
    console.log('📦 Stashing local changes...');
    execSync('git stash');
    hasStash = true;
  }

  // Revert the last commit
  execSync(`git revert ${lastCommit} --no-edit`);

  // Apply stash if it existed
  if (hasStash) {
    try {
      console.log('📦 Applying stashed changes...');
      execSync('git stash apply');
      execSync('git stash drop');
    } catch (stashError) {
      console.warn('⚠️ Stash apply failed due to conflicts. Manual resolution may be required.');
    }
  }

  // Push the revert
  execSync('git push origin main');

  console.log('✅ Revert pushed successfully.');
} catch (error) {
  console.error('❌ Auto-revert failed:', error.message);
  process.exit(1);
}