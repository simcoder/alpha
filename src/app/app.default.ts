import { BehaviorSubject } from 'rxjs';
import {  Menu } from './app.component.interfaces';

//current using
export const loggedInUser$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const  sideMenu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);

