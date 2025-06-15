import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {
	@ViewChild('chatPopup') chatPopup!: ElementRef;
  title = 'AI Portfolio';
  isChatOpen = false;
  isResizing = false;
startX = 0;
startWidth = 0;

  // Personal info - thay đổi thông tin của bạn ở đây
  personalInfo = {
    name: 'Nguyễn Hữu Kiên',
    title: 'Fronend Developer',
    description: 'Passionate about creating intelligent solutions that bridge the gap between human needs and artificial intelligence',
    email: 'kiennguyen24062004@gmail.com',
    phone: '0359787247',
    location: '35/11 Linh Chieu, Thu Duc, Ho Chi Minh City, Vietnam',
    links: {
      cv: '#',
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com/in/kien-nguyen-huu-6828b736b/',
      aiChat: '#'
    }
  };

  ngOnInit() {
    this.initAnimations();
  }

  ngOnDestroy() {
    // Cleanup if needed
	if (this.moveListener) this.moveListener();
    if (this.upListener) this.upListener();
  }

  initAnimations() {
    // Initialize any additional animations here
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  downloadCV() {
	const link = document.createElement('a');
	link.href = 'assets/cv.pdf';
	link.download = 'NguyenHuuKien_CV.pdf';
	link.click();
  }

  private moveListener: (() => void) | null = null;
  private upListener: (() => void) | null = null;

  constructor(private renderer: Renderer2) {}

  startResize(event: MouseEvent) {
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.chatPopup.nativeElement.offsetWidth;

    // Add listeners
    this.moveListener = this.renderer.listen('window', 'mousemove', (e) =>
      this.onMouseMove(e)
    );
    this.upListener = this.renderer.listen('window', 'mouseup', () =>
      this.stopResize()
    );
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const dx = this.startX - event.clientX;
    const newWidth = Math.min(Math.max(this.startWidth + dx, 250), 600); // Clamp width
    this.chatPopup.nativeElement.style.width = `${newWidth}px`;
  }

  stopResize() {
    this.isResizing = false;
    if (this.moveListener) this.moveListener();
    if (this.upListener) this.upListener();
    this.moveListener = this.upListener = null;
  }
  onOverlayClick() {
	if (!this.isResizing) {
	  this.isChatOpen = false;
	}
  }
  
}