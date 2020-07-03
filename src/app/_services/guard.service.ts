 
import { map } from 'rxjs/operators';
 
import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class GuardService implements CanActivate {

    constructor(
        private loginService: LoginService,

        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const helper = new JwtHelperService();
        let rpta = this.loginService.estaLogeado();

        if (!rpta) {
            //SI ESTA LOGUEADO
            this.loginService.cerrarSesion();
            return false;
        } else {
            //SI EL TOKEN ESTA EXPIRADO
            let token = sessionStorage.getItem(environment.TOKEN_NAME);
            if (!helper.isTokenExpired(token)) {
                //SI TIENES EL ROL NECESARIO
                let url = state.url;
                const decodedToken = helper.decodeToken(token);
                return true;
            } else {
                this.loginService.cerrarSesion();
                return false;
            }
        }
    }
}