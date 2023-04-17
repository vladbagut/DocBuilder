import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { FloatingMenuComponent } from './components/floating-menu/floating-menu.component';
import { ExtractComponent } from './components/extract/extract.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DragDropDirective } from './directives/drag-drop.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollVisibleDirective } from './directives/scroll-visible.directive';
import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { CamelToSpacePipe } from './directives/camel-to-space.pipe';
import { TemplateDirective } from './directives/template.directive';
import { CropImageDirective } from './directives/crop-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    HeaderComponent,
    FloatingMenuComponent,
    ExtractComponent,
    DragDropDirective,
    ScrollVisibleDirective,
    CamelToSpacePipe,
    TemplateDirective,
    CropImageDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    NgxResizableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
