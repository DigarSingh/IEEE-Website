import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import formidable from 'formidable';
import path from 'path';

// Ensure directory exists
export async function ensureDirectoryExists(directory) {
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Generate unique filename
export function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const sanitizedName = originalName.replace(/\s/g, '_').toLowerCase();
  return `${timestamp}-${sanitizedName}`;
}

// Process file upload
export async function processFileUpload(req, fileType = 'general') {
  return new Promise((resolve, reject) => {
    // Determine upload directory based on file type
    let uploadDir;
    switch(fileType) {
      case 'profile':
        uploadDir = join(process.cwd(), 'public', 'uploads', 'profiles');
        break;
      case 'certificate':
        uploadDir = join(process.cwd(), 'public', 'uploads', 'certificates');
        break;
      case 'event':
        uploadDir = join(process.cwd(), 'public', 'uploads', 'events');
        break;
      default:
        uploadDir = join(process.cwd(), 'public', 'uploads', 'general');
    }
    
    // Create directory if it doesn't exist
    ensureDirectoryExists(uploadDir)
      .then(() => {
        // Configure formidable to handle file upload
        const form = formidable({
          uploadDir,
          keepExtensions: true,
          maxFileSize: 10 * 1024 * 1024, // 10MB limit
          filename: (name, ext, part) => {
            const timestamp = Date.now();
            const originalName = part.originalFilename || 'file';
            const sanitizedName = originalName.replace(/\s/g, '_').toLowerCase();
            return `${timestamp}-${sanitizedName}`;
          }
        });

        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }
          
          const file = files.file?.[0];
          if (!file) {
            reject(new Error('No file uploaded'));
            return;
          }
          
          // Return the file path relative to public directory
          const relativePath = path.relative(
            join(process.cwd(), 'public'),
            file.filepath
          );
          
          resolve({
            success: true,
            filePath: '/' + relativePath.replace(/\\/g, '/'),
            originalFilename: file.originalFilename,
            size: file.size,
            mimetype: file.mimetype
          });
        });
      })
      .catch(reject);
  });
}
