import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}

  // tslint:disable-next-line: typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log(state.url);
      return this.accountService.currentUser$.pipe(
        map(auth => {
          if (auth){
            return true;
          }

          this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url }});
          return false;
        })
      );
      // | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    // return true;
  }


}
