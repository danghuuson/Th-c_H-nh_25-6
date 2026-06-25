import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return { 
      message: 'Đăng nhập thành công!', 
      user: req.user 
    };
  }
  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'Đây là dữ liệu bí mật nằm trong vùng an toàn',
      user: req.user,
    };
  }

  @Post('logout')
  logout(@Request() req) {
    req.logout((err) => {
      if (err) return { status: 'error', message: err };
    });
    return { message: 'Đăng xuất thành công, session đã bị hủy!' };
  }
}