import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Noir from '../../public/styles/app-theme';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { CustomTranslateService } from './shared/services/custom-translate.service';

// Factory for the TranslateHttpLoader
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './i18n/', '.json');
export function TranslatePreload(customTranslateService: CustomTranslateService) {
  return customTranslateService.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimize zone change detection
    provideAnimationsAsync(), // Enable asynchronous animations
    provideAnimationsAsync(),
        providePrimeNG({
          theme: Noir
        }),
        provideAppInitializer(() => TranslatePreload(inject(CustomTranslateService))),
        provideHttpClient(), // Provide the HTTP client
        importProvidersFrom(BrowserAnimationsModule, ToastModule),
        importProvidersFrom(
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpLoaderFactory,
              deps: [HttpClient],
            },
          })
        ),



  ]
};
