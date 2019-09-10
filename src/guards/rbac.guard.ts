import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacService } from '../services/rbac.service';
import { IRole } from '../role/interfaces/role.interface';
import { ParamsFilter } from '../params-filter/params.filter';
import { RBAC_REQUEST_FILTER } from '../constans';

@Injectable()
export class RBAcGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RbacService,
  ) {

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: IRole = request.user;

    if (!user) {
      throw new ForbiddenException('Getting user was failed.');
    }

    const permissions = this.reflector.get<string[]>('RBAcPermissions', context.getHandler());

    if (!permissions) {
      throw new ForbiddenException('Bad permission.');
    }

    try {
      const filter = new ParamsFilter();
      filter.setParams(RBAC_REQUEST_FILTER, { ...request });
      return this.rbacService.getRole(user.role, filter).can(...permissions);
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}