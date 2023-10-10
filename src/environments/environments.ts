import { Environment } from '@angular/cli/lib/config/workspace-schema';
import { IEnvironment } from '../app/shared/interface';

export  const environment : IEnvironment = {
  production: false,
  apiKey: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  dbUrl:'https://angular-blog-eb582-default-rtdb.firebaseio.com/',
}
