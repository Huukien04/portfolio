import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

	// private readonly apiKey = 'AIzaSyDn3_25V-Rd83KYok7e8PdSxS7IBlbpUuc';
	// private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  
	// constructor(private http: HttpClient) {}
  
	// sendMessage(prompt: string) {
	//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	//   const body = {
	// 	contents: [{
	// 	  parts: [{ text: prompt }]
	// 	}]
	//   };
  
	//   return this.http.post<any>(`${this.apiUrl}?key=${this.apiKey}`, body, { headers });
	// }
	// https://kien-888.app.n8n.cloud/webhook-test/chatbot
	// https://kien-888.app.n8n.cloud/webhook/chatbot

	private webhookUrl = 'https://kien-888.app.n8n.cloud/webhook/chatbot';

	constructor(private http: HttpClient) {}
  
	sendMessage(prompt: string) {
	  const body = {
		question: prompt  // <-- Đây là {{ $json.question }} trong n8n
	  };
  
	  return this.http.post<any>(this.webhookUrl, body);
	}
}
