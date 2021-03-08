// App.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models.
import { Image } from '../../../../models/image.model';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../../../../models/theme.model';
import { ImageService } from '../../../../services/image.service';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {
  /**
   * The form of the theme.
   */
  public themeForm: FormGroup;

  /**
   * The list of images.
   */
  public images: Image[];

  /**
   * The theme to be displayed.
   */
  @Input()
  public theme: Theme;

  /**
   * The event emitter to submit the theme.
   */
  @Output()
  public submitTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImageService
  ) {
    // Create the form group.
    this.themeForm = this.formBuilder
      .group({
        id: [{ value: 0, disabled: true }],
        name: ['', [Validators.required, Validators.min(1)]],
        imageId: [null],
        createdAt: [{ value: '', disabled: true }],
        updatedAt: [{ value: '', disabled: true }]
      });
  }

  ngOnInit() {
    // Get the images.
    this.imageService
      .getImages()
      .subscribe((images) => {
        this.images = images;
      });

    // The input theme is set.
    if (this.theme) {
      // Set the selected image of the theme.
      this.themeForm.setValue(this.theme);
    }
  }

  /**
   * Returns the selected image of a form group.
   * @param formGroup The form group to be checked.
   */
  getSelectedImage(formGroup: FormGroup): Image {
    const imageId = formGroup.getRawValue().imageId;
    return this.images.find((image) => image.id === imageId);
  }

  /**
   * Submits the theme.
   */
  submit() {
    const theme: Theme = this.themeForm.getRawValue() as Theme;
    this.submitTheme.emit(theme);
  }
}
