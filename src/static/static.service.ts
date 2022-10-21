import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class StaticService {
    async getStaticFile(fileName: string) {
        const filePath = path.resolve('static', fileName);
        if (fs.existsSync(filePath)) {
            
			
			
			const pr1: string = await new Promise((resolve, reject)  => {
                fs.readFile(filePath, 'base64', (e, data) => {
                    if (e) {
                        reject(e);
                    }
                    resolve(data);
                });
            });
			return {base64: pr1}
        }
        throw new BadRequestException('Bad filename');
    }
}
