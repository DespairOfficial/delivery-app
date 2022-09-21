import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Calendar app API')
        .setDescription('Simple calendar API on nestJs with express')
        .setVersion('1.0.1')
        .addTag('APP')
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, swaggerDocument);

    const PORT = process.env.PORT || 5000;
    await app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}
bootstrap();
