import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../../../../services/theme.service';
import { Theme } from '../../../../models/theme.model';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.scss'],
})
export class ThemeEditComponent implements OnInit {
  /**
   * The theme to be edited.
   */
  public theme: Theme;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the theme id from the route.
        const themeId = parseInt(paramMap.get('themeId'), 10);

        // Get the theme.
        this.themeService
          .getTheme(themeId)
          .subscribe((theme) => {
            this.theme = theme;
          });
      });
  }

  /**
   * Edits the theme.
   * @param theme The theme to be edited.
   */
  editTheme(theme: Theme) {
    this.themeService.updateTheme(
      theme.id,
      theme.name,
      theme.imageId
    );
    this.router.navigate(['/admin/themes']);
  }
}
