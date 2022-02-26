const { readdirSync } = require('fs');
const { resolve, sep } = require('path');
const langDir = resolve(`${process.cwd()}${sep}Root${sep}Storage${sep}json${sep}Lang`);

module.exports = (client) => {
  const langs = readdirSync(langDir).filter(file => file.endsWith('.json'));
  for (const file of langs) {
    try {
      const lang = require(`${langDir}${sep}${file}`);
      client.langs.set(file.split('.json')[0], lang);
    } catch (e) {
      console.error(e);
    }
  }
}; 