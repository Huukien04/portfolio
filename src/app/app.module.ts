import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CvComponent } from './components/cv/cv.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PortfolioModule } from './components/portfolio/portfolio.module';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    CvComponent,
  ],
  imports: [
	HttpClientModule,
    BrowserModule,
    AppRoutingModule,
	MatFormFieldModule,
	BrowserAnimationsModule,
    FormsModule,
	PortfolioModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
