import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
// interface Message {
// 	id: string;
// 	text: string;
// 	sender: 'user' | 'bot';
// 	timestamp: Date;
//   }
  
@Component({
  selector: 'app-chatbot',
  standalone: false,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
	// messages: Message[] = [
	// 	{
	// 	  id: '1',
	// 	  text: "Hello! I'm an AI assistant. How can I help you today?",
	// 	  sender: 'bot',
	// 	  timestamp: new Date(),
	// 	},
	//   ];
	
	//   inputValue = '';
	//   isTyping = false;
	
	//   @ViewChild('messagesEnd') messagesEnd!: ElementRef;
	
	//   ngAfterViewChecked() {
	// 	this.scrollToBottom();
	//   }
	
	//   scrollToBottom() {
	// 	try {
	// 	  this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
	// 	} catch (err) {}
	//   }
	messages: { text: string, isUser: boolean }[] = [];
	currentMessage: string = '';
	isLoading = false;
  
	constructor(private geminiService: GeminiService) {
	  this.messages.push({ text: 'Xin chào! Bạn cần thông tin gì về Kiên?', isUser: false });
	  
	}
	autoResize(event: Event): void {
		const textarea = event.target as HTMLTextAreaElement;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	  }
	

	sendMessage() {
	  const userMessage = this.currentMessage.trim();
	  if (!userMessage || this.isLoading) return;
  
	  this.messages.push({ text: userMessage, isUser: true });
	  this.isLoading = true;

	  this.geminiService.sendMessage(userMessage).subscribe({
		next: res => {
			const reply = res.answer;
		  this.messages.push({ text: reply, isUser: false });
		  this.isLoading = false;
		},
		error: err => {
		  this.messages.push({ text: 'Error: ' + err.message, isUser: false });
		  this.isLoading = false;
		}
	  });
  
	  this.currentMessage = '';
	}
}
