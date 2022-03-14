import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  createFile(file): string {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = uuid.v4() + '.' + fileExtension;
    const filePath = path.resolve(__dirname, '..', 'static');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
    return fileName;
  }

  removeFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', 'static');
    fs.unlinkSync(path.resolve(filePath, fileName));
  }
}
