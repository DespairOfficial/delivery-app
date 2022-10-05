import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationExeption } from 'src/exeptions/validaiton.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToInstance(metadata.metatype, value); // request to class

        if (typeof obj !== 'object') {
            return value;
        }
        const errors = await validate(obj, { whitelist: true, forbidNonWhitelisted: true });

        if (errors.length) {
            let messages = errors.map((err) => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
            });
            throw new ValidationExeption(messages);
        }
        return value;
    }
}
