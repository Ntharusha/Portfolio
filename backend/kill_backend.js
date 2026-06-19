const { execSync } = require('child_process');
try {
  const stdout = execSync('lsof -t -i:5000').toString().trim();
  if (stdout) {
    console.log(`Found processes on port 5000: ${stdout}`);
    const pids = stdout.split('\n');
    for (const pid of pids) {
      if (pid) {
        console.log(`Killing PID: ${pid}`);
        process.kill(parseInt(pid, 10), 'SIGTERM');
      }
    }
  } else {
    console.log('No process found on port 5000.');
  }
} catch (err) {
  console.error('Error or no process on port 5000:', err.message);
}
