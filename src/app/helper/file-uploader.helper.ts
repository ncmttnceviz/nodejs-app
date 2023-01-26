import {UploadedFile} from "express-fileupload";
import path from "path";

export class FileUploader {

    uploadSingleFile(file: UploadedFile, directory: string): string {
        const time = new Date().getTime() + Math.floor((Math.random() * 1000) + 9999);
        const ext = file.mimetype.split('/')[1]
        const newName = time + '.' + ext
        const filePath = 'uploads/' + directory + '/' + newName;
        file.mv(path.join(__dirname, `../../${filePath}`))

        return filePath;
    }

    uploadMultipleFile(files: UploadedFile[], directory: string) {
        return files.map((file: UploadedFile) => {
            const uploadedFile = this.uploadSingleFile(file, directory);
            return {src: uploadedFile}
        })
    }
}

export const fileUploader = new FileUploader();