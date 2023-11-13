import {Options, diskStorage } from 'multer'
import path from 'path'
import { randomBytes } from 'crypto'

export const multerConfig = {
    storage: diskStorage({
    destination: (request, file, callback) =>{
        callback(null, path.join(__dirname, '..', '..',  'tmp',  'uploads'))
        
    },
    filename: (request, file, callback) =>{
        randomBytes(16, (error, hash) =>{
            if(error) {
                callback(error, file.filename)
            }
            const filename = `${hash.toString('hex')}.png`
            callback(null, filename)
        })
    }
    }),
    limits:{
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (request, file, callback) =>{
        const formats = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];
        if(formats.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error('Formato não aceito'))
        }
    }
} as Options