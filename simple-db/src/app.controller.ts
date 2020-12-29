import { LocalAuthGuard } from './auth/local-auth.guard';
// import { AppService } from './app.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  /* updated
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
  */

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  /* constructor(private readonly appService: AppService) {}
  @Get()
  async getProducts() {
    return this.appService.getProducts();
  }
  */
}
