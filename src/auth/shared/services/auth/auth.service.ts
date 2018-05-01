import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/do';

import { Store } from 'store';
import { User } from '../../../models/user.interface';


@Injectable()
export class AuthService {

  // subscribe to the firebase authState observable
  // next is the firebase user
  // NOTE. THIS NEEDS TOBE SUBSCRIBED TO, OR THE .DO CODE WILL NEVER BE CALLED.
  auth$ = this.af.authState
    // side effect
    .do(next => {
      console.log('receiving data from the firebase authState observable', next);

      if(!next) {
        console.log('user has not logged in yet. Setting the store user property to null');
        this.store.set('user', null);
        return;
      }

      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      }
      console.log('user object created, and will be added to the store', user);
      this.store.set('user', user);
    });
  
  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) {}

  createUser(email: string, password: string) {
    return this.af.auth
      .createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth
      .signInWithEmailAndPassword(email, password);
  }

}