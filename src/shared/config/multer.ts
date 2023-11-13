import { Options, diskStorage } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';
import * as fs from 'fs';

export const multerConfig = {
    dest: resolve(__dirname, '..', '..', 'uploads'),
    storage: diskStorage({
        destination: (request, file, callback) => {
            // Verificar e criar o diretório de destino, se necessário
            const destDir = resolve(__dirname, '..', '..', 'uploads');
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            callback(null, destDir);
        },
        filename: (request, file, callback) => {
            randomBytes(16, (error, hash) => {
                if (error) {
                    callback(error, '');
                } else {
                    const filename = `${hash.toString('hex')}.png`;
                    callback(null, filename);
                }
            });
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (request, file, callback) => {
        const formats = ['image/jpeg', 'image/jpg', 'image/png'];
        if (formats.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Formato não aceito'));
        }
    },
} as Options;

