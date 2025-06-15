// ai-robot.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { AiRobotModule } from '../ai-robot/ai-robot.module';
import { ChatBotModule } from '../chatbot/ai-robot.module';

@NgModule({
  declarations: [PortfolioComponent],
  imports: [CommonModule,AiRobotModule,ChatBotModule],
  exports: [PortfolioComponent] 
})
export class PortfolioModule {}
