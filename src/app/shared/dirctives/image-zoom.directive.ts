import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageZoom]'
})
export class ImageZoomDirective {
  @Input() zoomFactor: number = 2; // Zoom level

  private img!: HTMLImageElement;
  private container!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.img = this.el.nativeElement as HTMLImageElement;
    if (!this.img.parentNode) {
      console.error('appImageZoom directive: Image has no parent node.');
      return;
    }


    // Create a wrapper container
    this.container = this.renderer.createElement('div');

    // Apply styles to keep image dimensions fixed
    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.container, 'overflow', 'hidden');
    this.renderer.setStyle(this.container, 'display', 'inline-block');
    this.renderer.setStyle(this.container, 'width', `${this.img.clientWidth}px`);
    this.renderer.setStyle(this.container, 'height', `${this.img.clientHeight}px`);

    // Apply styles to the image for zoom effect
    this.renderer.setStyle(this.img, 'position', 'absolute');
    this.renderer.setStyle(this.img, 'transition', 'transform 0.2s ease-in-out');
    this.renderer.setStyle(this.img, 'transform-origin', 'center');

    // Move the image into the container safely

    this.img.parentNode.insertBefore(this.container, this.img);
    this.container.appendChild(this.img);

  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    const rect = this.container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    this.renderer.setStyle(this.img, 'transform', `scale(${this.zoomFactor})`);
    this.renderer.setStyle(this.img, 'transform-origin', `${x}% ${y}%`);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.img, 'transform', 'scale(1)');
  }
}
