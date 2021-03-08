import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models and services.
import { ImageService } from '../../../../services/image.service';
import { Image } from '../../../../models/image.model';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss'],
})

export class ImageEditComponent implements OnInit {
  /**
   * The image to be edited.
   */
  public image: Image;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the image id from the route.
        const imageId = parseInt(paramMap.get('imageId'), 10);
        // Get the image.
        this.imageService
          .getImage(imageId)
          .subscribe((image) => {
            this.image = image;
          });
      });
  }

  /**
   * Edits the image.
   * @param image The image to be edited.
   */
  editImage(image: Image) {
    this.imageService.updateImage(
      image.id,
      image.name,
      image.path
    );
    this.router.navigate(['/admin/images']);
  }
}
