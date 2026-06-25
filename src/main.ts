import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.use(cookieParser('SECRET_CHUOI_KY_COOKIE'));

  
  app.use(
    session({
      secret: 'SECRET_CHUOI_MA_HOA_SESSION', 
      resave: false,                        
      saveUninitialized: false,             
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,         
        httpOnly: true,                      
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',                    
      },
    }),
  );

  // 3. Tích hợp Passport với Session làm việc
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();