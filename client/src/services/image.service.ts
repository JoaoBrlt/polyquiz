// App.
import { Injectable } from '@angular/core';

// Communication.
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models and services.
import { Image } from '../models/image.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends DataService {
  /**
   * The list of images.
   */
  private images: Image[];

  /**
   * The observable list of images.
   */
  private images$: BehaviorSubject<Image[]>;

  /**
   * Constructs the image service.
   * @param http The HTTP client.
   */
  constructor(private http: HttpClient) {
    super();
    this.images = [];
    this.images$ = new BehaviorSubject<Image[]>(this.images);
    this.findAllImages();
  }

  /**
   * Returns the observable list of images.
   */
  getImages(): Observable<Image[]> {
    return this.images$.asObservable();
  }

  /**
   * Returns the sorted observable list of images.
   * The images are sorted alphabetically.
   */
  getSortedImages(): Observable<Image[]> {
    return this.getImages()
      .pipe(
        map((images) => images.slice().sort((firstImage, secondImage) => {
          const firstName = firstImage.name.toUpperCase();
          const secondName = secondImage.name.toUpperCase();
          if (firstName < secondName) {
            return -1;
          }
          if (firstName > secondName) {
            return 1;
          }
          return 0;
        }))
      );
  }

  /**
   * Returns an observable image by id.
   * @param id The id of the image.
   */
  getImage(id: number): Observable<Image> {
    return this.getImages()
      .pipe(
        map((images) => images.find((image) => image.id === id))
      );
  }

  /**
   * Finds all the images.
   */
  findAllImages() {
    this.http
      .get<Image[]>(`${this.serverURL}/images`)
      .subscribe((images: Image[]) => {
        this.images = images;
        this.images$.next(this.images);
      });
  }

  /**
   * Creates an image.
   * @param name The name of the image.
   * @param path The path of the image.
   */
  createImage(name: string, path: string) {
    this.http
      .post<Image>(
        `${this.serverURL}/images`,
        {
          name,
          path
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllImages();
      });
  }

  /**
   * Updates an image.
   * @param id The id of the image.
   * @param name The name of the image.
   * @param path The path of the image.
   */
  updateImage(id: number, name: string, path: string) {
    this.http
      .put<Image>(
        `${this.serverURL}/images/${id}`,
        {
          name,
          path
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllImages();
      });
  }

  /**
   * Deletes an image.
   * @param id The id of the image.
   */
  deleteImage(id: number) {
    this.http
      .delete<Image>(`${this.serverURL}/images/${id}`)
      .subscribe(() => {
        this.findAllImages();
      });
  }
}
