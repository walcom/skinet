import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket>;
  currentUser$!: Observable<IUser>;

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this.basket$ = <Observable<IBasket>> this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  // tslint:disable-next-line: typedef
  logout() {
    this.accountService.logout();
  }

}
