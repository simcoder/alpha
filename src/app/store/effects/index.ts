import { UserEffects } from './user.effect';
import { LoginEffects } from './login.effect';
import { AppEffects } from './app.effect';
import { ResidentEffects } from './resident.effect';

export const effects: any[] = [UserEffects, LoginEffects, AppEffects, ResidentEffects];

export * from './user.effect';
export * from './login.effect';
export * from './app.effect';
export * from './resident.effect';