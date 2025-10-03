const fs = require('fs');
const path = require('path');
const data = require('../src/data.json');

function getSvgFiles() {
    const svgDir = path.join(__dirname, '..', 'public', 'svg');
    
    try {
        if (!fs.existsSync(svgDir)) {
            console.error(`Directory ${svgDir} does not exist`);
            return [];
        }
        const files = fs.readdirSync(svgDir);
        const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
        return svgFiles;
    } catch (error) {
        console.error('Error reading directory:', error.message);
        return [];
    }
}

function verifyItem(item, files) {
    const index = files.indexOf(item.src);
    if (index === -1) {
        throw new Error(`File ${item.src} not found (${JSON.stringify(item, null, 2)})`);
    }
    files.splice(index, 1);
    item.skintone_variants.forEach(variant => verifyItem(variant, files));
}

function main() {
    const svgFiles = getSvgFiles();
    data.forEach(item => verifyItem(item, svgFiles));
    if (svgFiles.length > 0) {
        console.log(`Files not found: ${svgFiles.length}`);
        const outputFile = path.join(__dirname, 'unfound-files.txt');
        const fileContent = svgFiles.join('\n');
        
        try {
            fs.writeFileSync(outputFile, fileContent, 'utf8');
            console.log(`Unfound files written to: ${outputFile}`);
        } catch (error) {
            console.error('Error writing file:', error.message);
        }
    } else {
        console.log('All files found in data.json!');
    }
}

module.exports = {
    getSvgFiles,
    main
};

if (require.main === module) {
    main();
}
