import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

    constructor(private authSvc: AuthenticationService,
        private routerSvc: RouterService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const token = this.authSvc.getBearerToken();

        const routePromise = this.authSvc.isUserAuthenticated(token);
        routePromise.then(resp => {
            if (!resp) {
                this.routerSvc.routeToLogin();
            }
            return resp;
        }).catch(err => {
            this.routerSvc.routeToLogin();
            return false;
        });

        return routePromise;

    }
}
