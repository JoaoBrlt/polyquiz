// App.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models and services.
import { Theme } from '../../../../models/theme.model';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-theme-new',
  templateUrl: './theme-new.component.html',
  styleUrls: ['./theme-new.component.scss'],
})
export class ThemeNewComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {}

  /**
   * Creates the theme.
   * @param theme The theme to be created.
   */
  createTheme(theme: Theme) {
    this.themeService.createTheme(
      theme.name,
      theme.imageId
    );
    this.router.navigate(['/admin/themes']);
  }
}
