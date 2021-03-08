// App.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Styles.
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Models.
import { Image } from '../../../../models/image.model';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  /**
   * The image to display.
   */
  @Input()
  image: Image;

  /**
   * The event emitter to edit the image.
   */
  @Output()
  editImage: EventEmitter<Image> = new EventEmitter<Image>();

  /**
   * The event emitter to delete the image.
   */
  @Output()
  deleteImage: EventEmitter<Image> = new EventEmitter<Image>();

  /**
   * The button icons.
   */
  public editIcon = faPen;
  public deleteIcon = faTrash;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Edits the image.
   * @param event The mouse event.
   */
  edit(event: MouseEvent) {
    this.editImage.emit(this.image);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Deletes the image.
   * @param event The mouse event.
   */
  delete(event: MouseEvent) {
    this.deleteImage.emit(this.image);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }
}
