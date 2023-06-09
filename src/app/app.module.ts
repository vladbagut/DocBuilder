import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
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
import { EditorComponent } from './components/editor/editor.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollVisibleDirective } from './directives/scroll-visible.directive';
import { CamelToSpacePipe } from './directives/camel-to-space.pipe';
import { TemplateDirective } from './directives/template.directive';
import { CropImageDirective } from './directives/crop-image.directive';
import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FunctionPipe } from './directives/function.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidebarResizerComponent } from './directives/sidebar-resizer/sidebar-resizer.component';
import { MatRadioModule } from '@angular/material/radio';
import { DropImageDirective } from './directives/drop-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FloatingMenuComponent,
    EditorComponent,
    DropImageDirective,
    ScrollVisibleDirective,
    CamelToSpacePipe,
    TemplateDirective,
    CropImageDirective,
    FunctionPipe,
    SidebarResizerComponent,
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
    BrowserAnimationsModule,
    MatExpansionModule,
    NgxResizableModule,
    SignaturePadModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatRadioModule,
  ],
  providers: [FunctionPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
