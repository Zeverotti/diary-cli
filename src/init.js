import fs from 'fs';
import dataStructure from './dataStructure';

process.env.STORAGE_PATH = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")) + '/diary';
if (process.argv.length === 2) {
    process.argv.push('dashboard');
}
try {
    fs.readdirSync(process.env.STORAGE_PATH, 'utf-8');
} catch (error) {
    fs.mkdirSync(process.env.STORAGE_PATH);
    fs.writeFileSync(`${process.env.STORAGE_PATH}/data.json`, JSON.stringify(dataStructure));
}