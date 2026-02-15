const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'src', 'app');
const trashDir = path.join(appDir, '_trash');

if (!fs.existsSync(trashDir)) {
    try {
        fs.mkdirSync(trashDir);
        console.log('Created _trash directory');
    } catch (e) {
        console.error('Failed to create _trash:', e);
    }
}

const foldersToMove = [
    'login',
    'dashboard',
    'learning-path',
    'assessments',
    'gamification',
    'planner',
    'career',
    'onboarding',
    'roadmaps',
    'register'
];

foldersToMove.forEach(folder => {
    const srcPath = path.join(appDir, folder);
    const destPath = path.join(trashDir, folder);

    if (fs.existsSync(srcPath)) {
        try {
            fs.renameSync(srcPath, destPath);
            console.log(`Moved ${folder} to _trash`);
        } catch (e) {
            console.error(`Failed to move ${folder}:`, e.message);
            // Try recursive delete if move fails
            try {
                fs.rmSync(srcPath, { recursive: true, force: true });
                console.log(`Deleted ${folder} (forced)`);
            } catch (e2) {
                console.error(`Failed to delete ${folder}:`, e2.message);
            }
        }
    } else {
        console.log(`${folder} not found in src/app`);
    }
});

console.log('Cleanup script finished');
