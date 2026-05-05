const fs = require('fs');
const file = 'src/components/sections/Projects.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/type: "spring"/g, 'type: "spring" as any');
content = content.replace(/type: 'spring'/g, 'type: "spring" as any');
fs.writeFileSync(file, content);
