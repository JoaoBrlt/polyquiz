// App.
import { Component, Input, OnInit} from '@angular/core';

// Styles.
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Models.
import { Theme } from '../../../../models/theme.model';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent implements OnInit {
  /**
   * The theme to be deleted.
   */
  @Input()
  public theme: Theme;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
