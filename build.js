import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildPlugin() {
  try {
    // Create dist directory
    const outputDir = path.join(__dirname, 'dist');
    await fs.mkdir(outputDir, { recursive: true });

    // Create zip file
    const output = createWriteStream(path.join(outputDir, 'jenny-ai-chat.zip'));
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log('Plugin package created successfully!');
      console.log(`Output: ${path.join('dist', 'jenny-ai-chat.zip')}`);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add all plugin files
    const pluginFiles = [
      'jenny-ai-chat.php',
      'README.md',
      'assets/**/*',
      'includes/**/*',
      'templates/**/*',
    ];

    for (const file of pluginFiles) {
      archive.glob(file, {
        cwd: path.join(__dirname, 'jenny-ai-chat'),
        dot: false
      });
    }

    await archive.finalize();
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildPlugin();