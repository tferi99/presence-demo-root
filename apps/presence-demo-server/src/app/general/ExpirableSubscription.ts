import { Subscription } from 'rxjs';

export class ExpirableSubscription {
  subscription: Subscription;
  created: number;
  validFor: number;

  constructor(validSeconds: number) {
    this.created = Date.now();
    this.validFor =  this.created + validSeconds;
  }

  isValid(): boolean {
    return this.validFor > Date.now();
  }

  checkValidity() {
    if (!this.isValid() && this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
