import { Directive, HostListener, HostBinding , ElementRef , Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective
{
    isOpen:boolean=false;
    constructor(private eleRef:ElementRef,private elementRef:Renderer2)
    {
 
    }
    @HostListener('click') toggleOpen(data:Event)
    {
        this.isOpen=!this.isOpen;
        if (this.isOpen)
        {
        this.elementRef.addClass(this.eleRef.nativeElement,'open');
        }
        else{
            this.elementRef.removeClass(this.eleRef.nativeElement,'open');
        }
 
    }
  }