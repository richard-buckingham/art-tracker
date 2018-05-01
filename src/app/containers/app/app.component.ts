import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from 'store';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';
import { User } from '../../../auth/models/user.interface';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  // setup our user property
  user$: Observable<User>;
  userSubscription: Subscription;

  constructor(private store: Store,
              private authService: AuthService) {}

  ngOnInit() {
    // initiate the dataflow for the auth$ observable
    this.authService.auth$.subscribe();

    // As the user has been saved in the store, we can get theuser from there
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
