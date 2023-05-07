import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `textImage`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/text-image.svg`
      )
    );

    this.matIconRegistry.addSvgIcon(
      `download`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/download.svg`
      )
    );

    this.matIconRegistry.addSvgIcon(
      `cloudUpload`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/cloudUpload.svg`
      )
    );

    this.matIconRegistry.addSvgIcon(
      `image`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/image.svg`
      )
    );

    this.matIconRegistry.addSvgIcon(
      `drag-drop-image`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/drag-drop.svg`
      )
    );

    this.matIconRegistry.addSvgIcon(
      `signature`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/signature.svg`
      )
    );

    this.matIconRegistry.addSvgIcon(
      `pdf`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/pdf.svg`
      )
    );
  }
}
