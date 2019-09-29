export type MediaTypes = "image" | "video";
export type MediaResizeMode = "cover" | "contain" | "stretch";
export type MediaOrientation = "portrait" | "landscape";
export type MediaAspectRatio =
  | "standard"
  | "classic"
  | "square"
  | "widescreen"
  | "panorama";

export interface Media<AspectRatio = MediaAspectRatio> {
  /** Media type */
  type: MediaTypes;

  /** Source url */
  source: string;

  /** Reference Id. Can be an image id or a video source id for example */
  reference?: string;

  /** Credits for media */
  credits: string;

  /** Aspect ratio of the media. */
  aspectRatio?: MediaAspectRatio;

  /** Orientation of the media */
  orientation?: MediaOrientation;
}
