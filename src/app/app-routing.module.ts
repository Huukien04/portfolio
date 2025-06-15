import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { CvComponent } from './components/cv/cv.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'cv', component: CvComponent },
  { path: '', redirectTo: '/profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
