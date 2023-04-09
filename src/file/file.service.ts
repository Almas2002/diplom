import { HttpException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async createFile(file): Promise<string> {
    try {
      const fileName = v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      console.log(e);
      throw new HttpException('ошибка в созданий файла', 500);
    }
  }
}