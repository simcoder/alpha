import { BehaviorSubject } from 'rxjs';

export const resident$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
export const selectedTab$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
export const disablePayments$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
