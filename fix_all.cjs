const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}
walk('src').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let initial = content;
  content = content.replace(/type:\s*['"`]spring['"`]/g, 'type: "spring" as any');
  if (initial !== content) {
    fs.writeFileSync(file, content);
    console.log('fixed', file);
  }
});
