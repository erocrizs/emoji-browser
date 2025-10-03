const fs = require('fs');
const path = require('path');

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

function isTextSymlink(filePath) {
    try {
        const stats = fs.lstatSync(filePath);
        // Check if it's a regular file (not a directory or actual symlink)
        if (!stats.isFile()) {
            return false;
        }
        
        // Read the file content
        const content = fs.readFileSync(filePath, 'utf8').trim();
        
        // Check if content looks like a filename (no newlines, reasonable length, has .svg extension)
        if (content.includes('\n') || content.length > 255 || !content.endsWith('.svg')) {
            return false;
        }
        
        // Check if the referenced file exists
        const referencedPath = path.resolve(path.dirname(filePath), content);
        return fs.existsSync(referencedPath);
    } catch (error) {
        return false;
    }
}

function getReferencedFilename(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8').trim();
        return content;
    } catch (error) {
        console.error(`Error reading file content ${filePath}:`, error.message);
        return null;
    }
}

function copyFileContent(sourcePath, targetPath) {
    try {
        // Delete the original symlink file
        fs.unlinkSync(targetPath);
        console.log(`  → Deleted symlink: ${path.basename(targetPath)}`);
        
        // Copy the target file to the new location
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`  → Copied file: ${path.basename(sourcePath)} → ${path.basename(targetPath)}`);
        
        return true;
    } catch (error) {
        console.error(`Error copying file from ${sourcePath} to ${targetPath}:`, error.message);
        return false;
    }
}

function resolveSvgSymlinks() {
    const svgDir = path.join(__dirname, '..', 'public', 'svg');
    const svgFiles = getSvgFiles();
    
    console.log(`Found ${svgFiles.length} SVG files`);
    
    let textSymlinkCount = 0;
    let resolvedCount = 0;
    let errorCount = 0;
    
    svgFiles.forEach(fileName => {
        const filePath = path.join(svgDir, fileName);
        
        if (isTextSymlink(filePath)) {
            textSymlinkCount++;
            console.log(`\nFound text symlink: ${fileName}`);
            
            const referencedFilename = getReferencedFilename(filePath);
            if (referencedFilename) {
                console.log(`  → References: ${referencedFilename}`);
                
                // Check if referenced file exists
                const fullTargetPath = path.resolve(path.dirname(filePath), referencedFilename);
                
                if (fs.existsSync(fullTargetPath)) {
                    console.log(`  → Target exists: ${path.basename(fullTargetPath)}`);
                    
                    // Create backup of original text symlink
                    const backupPath = filePath + '.backup';
                    try {
                        fs.copyFileSync(filePath, backupPath);
                        console.log(`  → Backup created: ${path.basename(backupPath)}`);
                    } catch (backupError) {
                        console.error(`  → Error creating backup:`, backupError.message);
                    }
                    
                    // Replace text symlink with actual content
                    if (copyFileContent(fullTargetPath, filePath)) {
                        resolvedCount++;
                        console.log(`  ✅ Resolved: ${fileName}`);
                        
                        // Remove backup file after successful resolution
                        try {
                            fs.unlinkSync(backupPath);
                            console.log(`  → Backup removed`);
                        } catch (unlinkError) {
                            console.warn(`  → Warning: Could not remove backup:`, unlinkError.message);
                        }
                    } else {
                        errorCount++;
                        console.error(`  ❌ Failed to resolve: ${fileName}`);
                    }
                } else {
                    errorCount++;
                    console.error(`  ❌ Referenced file does not exist: ${path.basename(fullTargetPath)}`);
                }
            } else {
                errorCount++;
                console.error(`  ❌ Could not read file content: ${fileName}`);
            }
        }
    });
    
    console.log(`\n=== Summary ===`);
    console.log(`Total SVG files: ${svgFiles.length}`);
    console.log(`Text symlinks found: ${textSymlinkCount}`);
    console.log(`Successfully resolved: ${resolvedCount}`);
    console.log(`Errors: ${errorCount}`);
    
    if (textSymlinkCount === 0) {
        console.log(`\n✅ No text symlinks found. All SVG files are regular files.`);
    } else if (resolvedCount === textSymlinkCount) {
        console.log(`\n✅ All text symlinks have been successfully resolved!`);
    } else {
        console.log(`\n⚠️  Some text symlinks could not be resolved. Check the errors above.`);
    }
}

function main() {
    console.log('Resolving SVG text symlinks...\n');
    console.log(`Working directory: ${process.cwd()}`);
    console.log(`SVG directory: ${path.join(__dirname, '..', 'public', 'svg')}\n`);
    resolveSvgSymlinks();
}

module.exports = {
    getSvgFiles,
    isTextSymlink,
    getReferencedFilename,
    copyFileContent,
    resolveSvgSymlinks,
    main
};

if (require.main === module) {
    main();
}
