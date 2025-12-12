const fs = require('fs');
const path = require('path');

function readData(filePath) {
    try {
        const fullPath = path.resolve(filePath);

        if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, '[]', 'utf8');
            return [];
        }

        const data = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

function writeData(filePath, data) {
    try {
        const fullPath = path.resolve(filePath);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

module.exports = {
    readData,
    writeData
};
