// App.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models.
import { Image } from '../../../../models/image.model';
import { Guest } from '../../../../models/guest.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {
  /**
   * The form of the image.
   */
  public imageForm: FormGroup;

  /**
   * The image to be displayed.
   */
  @Input()
  public image: Image;

  /**
   * The event emitter to submit the image.
   */
  @Output()
  public submitImage: EventEmitter<Image> = new EventEmitter<Image>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    // Create the form group.
    this.imageForm = this.formBuilder
      .group({
        id: [{ value: 0, disabled: true }],
        name: [
          '',
          [
            Validators.required,
            Validators.min(1)
          ]
        ],
        path: [
          '',
          [
            Validators.required,
            Validators.min(1)
          ]
        ]
      });
  }

  ngOnInit() {
    // Input the image values.
    if (this.image) {
      this.imageForm.setValue({
        id: this.image.id,
        name: this.image.name,
        path: this.image.path
      });
    }
  }

  /**
   * Submits the image.
   */
  submit() {
    const image: Image = this.imageForm.getRawValue() as Image;
    this.submitImage.emit(image);
  }
}
