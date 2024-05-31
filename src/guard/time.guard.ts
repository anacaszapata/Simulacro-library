import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TimeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      throw new UnauthorizedException('Orders cannot be processed between 6 PM and 6 AM');
    }
    return true;
  }
}
