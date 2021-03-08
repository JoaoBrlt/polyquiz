import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

//
import { ThemeService } from '../../../../services/theme.service';
import { Theme } from '../../../../models/theme.model';
import { Image } from '../../../../models/image.model';
import { ImageModalComponent } from '../../images/image-modal/image-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModalComponent } from '../theme-modal/theme-modal.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss'],
})
export class ThemeListComponent implements OnInit {
  /**
   * The list of themes.
   */
  private themes: Theme[];

  /**
   * The variables of the pagination.
   */
  public page ;
  public pageSize;
  public collectionSize;

  /**
   * The button icons.
   */
  public createIcon = faPlus;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private themeService: ThemeService,
  ) {
    this.page = 1;
    this.pageSize = 6;
    this.collectionSize = 0;
    this.themes = [];
  }

  ngOnInit() {
    // Get the themes.
    this.themeService
      .getThemes()
      .subscribe((themes) => {
        this.themes = themes;
        this.collectionSize = themes.length;
      });
  }

  /**
   * Returns a slice of the themes.
   */
  getThemes(): Theme[] {
    return this.themes
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  /**
   * Creates a theme.
   */
  createTheme() {
    this.router.navigate(['/admin/themes/new']);
  }

  /**
   * Edits a theme.
   */
  editTheme(theme: Theme) {
    this.router.navigate(['/admin/themes/', theme.id]);
  }

  /**
   * Selects a theme.
   * @param theme The selected theme.
   */
  selectTheme(theme: Theme) {
    this.router.navigate(['/admin/themes/', theme.id, 'quizzes']);
  }

  /**
   * Deletes a theme.
   * @param theme The theme to be deleted.
   */
  deleteTheme(theme: Theme) {
    // Confirm the deletion.
    const modal = this.modalService.open(
      ThemeModalComponent,
      { centered: true }
    );
    modal.componentInstance.theme = theme;
    modal.result.then(
      (result) => this.themeService.deleteTheme(theme.id),
      () => {}
    );
  }
}
