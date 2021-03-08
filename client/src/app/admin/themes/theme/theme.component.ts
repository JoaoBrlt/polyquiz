// App.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Styles.
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Models and services.
import { Theme } from '../../../../models/theme.model';
import { Image } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image.service';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  /**
   * The theme to display.
   */
  @Input()
  public theme: Theme;

  /**
   * Whether the theme is editable or not.
   */
  @Input()
  public editable: boolean;

  /**
   * The image of the theme.
   */
  public image: Image;

  /**
   * The event emitter to select the theme.
   */
  @Output()
  public selectTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  /**
   * The event emitter to edit the theme.
   */
  @Output()
  public editTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  /**
   * The event emitter to delete the theme.
   */
  @Output()
  public deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  /**
   * The button icons.
   */
  public editIcon = faPen;
  public deleteIcon = faTrash;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    // Get the image of the theme.
    this.imageService
      .getImage(this.theme.imageId)
      .subscribe((image) => {
        if (image) {
          // Set the image.
          this.image = image;
        } else {
          // Set the default image.
          this.image = {
            id: 0,
            name: this.theme.name,
            path: 'https://via.placeholder.com/640x360?text=' + this.theme.name
          };
        }
      });
  }

  /**
   * Selects the theme.
   */
  select(event) {
    this.selectTheme.emit(this.theme);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Edits the theme.
   */
  edit(event) {
    this.editTheme.emit(this.theme);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Deletes the theme.
   */
  delete(event) {
    this.deleteTheme.emit(this.theme);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }
}
