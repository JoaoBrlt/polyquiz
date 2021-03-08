import { Component, OnInit } from '@angular/core';
import { Image } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image.service';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss']
})
export class ImageSelectComponent implements OnInit {
  /**
   * The parent form group.
   */
  @Input()
  public parentFormGroup: FormGroup;

  /**
   * The list of images.
   */
  public images: Image[];

  /**
   * Whether the images are loading, or not.
   */
  public imageLoading: boolean;

  constructor(private imageService: ImageService) {
    this.imageLoading = false;
  }

  ngOnInit() {
    this.imageLoading = true;
    // Get the sorted images.
    this.imageService
      .getSortedImages()
      .subscribe((images) => {
        this.images = images;
        this.imageLoading = false;
      });
  }

}
