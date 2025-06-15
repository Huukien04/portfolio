import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../.././environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private webhookUrl = environment.webhookUrl;

  constructor(private http: HttpClient) {}
  
  sendMessage(userQuestion: string) {

	const context = environment.KIEN_INFO_CONTEXT;
	const prompt = `${context}\n\nCâu hỏi của người dùng là:\n${userQuestion}`;
	const body = {
        contents: [
			{
			  parts: [
				{
				  text: prompt
				}
			]
		}
	]
}
      
    return this.http.post<any>(this.webhookUrl, body);
  }
}
