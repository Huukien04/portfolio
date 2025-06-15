import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../.././environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private webhookUrl = environment.webhookUrl;

  constructor(private http: HttpClient) {}
  
  sendMessage(prompt: string) {
    const body = {
      question: prompt
    };
  
    return this.http.post<any>(this.webhookUrl, body);
  }
}
