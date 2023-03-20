import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, AfterViewInit, OnDestroy {

  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  //@ViewChild('anchor') anchor: ElementRef<HTMLElement>;
  private observer: IntersectionObserver;
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const options = {
      root: this.isHostScrollable() ? this.elementRef.nativeElement : null,
      threshold: 1.0,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

 
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.elementRef.nativeElement.lastElementChild);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.elementRef.nativeElement);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}