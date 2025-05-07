import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';

// Services
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';
import { DeliveryService } from './services/delivery.service';
import { EnterpriseService } from './services/enterprise.service';
import { PartnerService } from './services/partner.service';
import { AdminService } from './services/admin.service';
import { SubscriptionService } from './services/subscription.service';
import { ReclamationService } from './services/reclamation.service';
import { OrderService } from './services/order.service';
import { MockDataService } from './services/mock-data.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Interceptor for adding auth token to requests
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

// Fix missing imports
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    ClientService,
    DeliveryService,
    EnterpriseService,
    PartnerService,
    AdminService,
    SubscriptionService,
    ReclamationService,
    OrderService,
    MockDataService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  // Ensure CoreModule is imported only once
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
