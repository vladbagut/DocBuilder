import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar-resizer',
    template: `
        <div class="d-flex flex-row h-100 w-100" (mousemove)="changeLeftContainerWidth($event)">
            <div class="left-container" [style.flex-basis]="leftContainerWidth">
                <ng-content select="left-container,[left-container]"></ng-content>
            </div>
            <div
                class="resize-handle d-flex flex-row align-content-center position-relative"
                [class.resizing]="resizing"
                (mousedown)="changeResizeMode(true)"
                (mouseup)="changeResizeMode(false)">
                <div class="position-absolute h-100 top-0"></div>
                <div></div>
            </div>
            <div class="right-container">
                <ng-content select="right-container,[right-container]"></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./sidebar-resizer.component.scss'],
})
export class SidebarResizerComponent {
    @Input() leftContainerWidth = '50%';
    @Input() minLeft; // number or string format "...px" or "...%""
    @Input() minRight;

    resizing = false;

    changeResizeMode(value: boolean): void {
        this.resizing = value;
    }

    changeLeftContainerWidth(event): void {
        if (this.resizing && event.buttons != 1) this.resizing = false;
        if (this.resizing) {
            if (window.getSelection()?.toString()) window.getSelection()?.removeAllRanges();

            const rect = event.currentTarget.getBoundingClientRect();
            const newLeftWidth = event.clientX - rect.left;
            if (
                newLeftWidth > this.getPxFromString(this.minLeft, rect.width) &&
                rect.width - newLeftWidth > this.getPxFromString(this.minRight, rect.width)
            )
                this.leftContainerWidth = newLeftWidth - 10 + 'px';
        }
    }

    getMousePosX(evt) {
        const rect = evt.currentTarget.getBoundingClientRect();
        return evt.clientX - rect.left;
    }

    getPxFromString(str, width): number {
        if (!str) return 0;
        if (typeof str == 'string') {
            if (str.endsWith('%')) {
                const percent = +str.split('%')[0];
                return this.isNumeric(percent) ? (percent * width) / 100 : 0;
            } else {
                const pixels = +str.split('px')[0];
                return this.isNumeric(pixels) ? pixels : 0;
            }
        } else {
            return str;
        }
    }

    isNumeric(str) {
        return !isNaN(str) && !isNaN(parseFloat(str));
    }
}
