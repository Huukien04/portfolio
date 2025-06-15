// ai-robot.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ChatbotComponent],
  imports: [CommonModule,FormsModule,AppRoutingModule,MatFormFieldModule],
  exports: [ChatbotComponent] 
})
export class ChatBotModule {}
