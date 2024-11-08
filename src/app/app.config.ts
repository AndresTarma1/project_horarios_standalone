import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IMAGE_CONFIG, IMAGE_LOADER, provideImageKitLoader } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withViewTransitions()),
     provideHttpClient(),
      {
        provide: IMAGE_CONFIG,
        useValue: {
          disableImageSizeWarning: true,
          disableImageLazyLoadWarning: true
        }
      },
      importProvidersFrom(NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'})),
      provideAnimations(),
      importProvidersFrom(BrowserAnimationsModule)
    ]
};
