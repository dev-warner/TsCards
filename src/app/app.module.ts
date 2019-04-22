import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxMdModule } from 'ngx-md';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule, MediaMatcher } from '@angular/cdk/layout';

import { StoreModule } from '@ngrx/store';

import { MatSidenavModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MarkdownPostComponent } from './markdown-post/markdown-post.component';

import { ThemeService } from './core/services/theme-service/theme.service';
import { PostsService } from './core/services/post-service/posts.service';
import { FilterService } from './core/services/filter-service/filter.service';
import { StorageService } from './core/services/storage-service/storage.service';

import { environment } from '../environments/environment';

import { FILTER_POSTS, filterPosts } from './core/store/filter.reducer';
import { DARK_THEME, darkTheme} from './core/store/dark-theme.reducer';
import { SIDE_NAV, sideNav } from './core/store/sidenav.reducer';

import 'prismjs/components/prism-javascript';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PostComponent,
    SidenavComponent,
    MarkdownPostComponent,
  ],
  imports: [
    NgxMdModule.forRoot(),
    StoreModule.forRoot({}),
    StoreModule
      .forFeature('darkTheme', DARK_THEME),
    StoreModule
      .forFeature('sideNav', SIDE_NAV),
    StoreModule
      .forFeature('filterPosts', FILTER_POSTS),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatGridListModule,
    DragDropModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  entryComponents: [
  ],
  providers: [
    ThemeService,
    PostsService,
    StorageService,
    FilterService,
    LayoutModule,
    MediaMatcher,
    Platform,
    darkTheme,
    sideNav,
    filterPosts
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
