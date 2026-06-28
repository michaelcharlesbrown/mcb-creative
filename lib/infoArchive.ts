/**
 * Info page archive — the masonry images that scroll up behind the pinned
 * typography. Local test set; drop files in /public/images/info-archive/ and
 * append an entry here. width/height are intrinsic pixel dimensions so
 * next/image reserves the correct aspect ratio. Order interleaves portrait /
 * landscape / square so the two-column masonry stays ragged.
 */

export interface ArchiveImage {
  src: string;
  width: number;
  height: number;
  /** Decorative archive — alt intentionally empty. */
  alt: string;
}

const DIR = "/images/info-archive";

export const INFO_ARCHIVE_IMAGES: ArchiveImage[] = [
  { src: `${DIR}/image 13.jpg`, width: 474, height: 845, alt: "" },
  { src: `${DIR}/alluvial-sign 2.jpg`, width: 1006, height: 719, alt: "" },
  { src: `${DIR}/image 204.jpg`, width: 710, height: 710, alt: "" },
  { src: `${DIR}/IMG_4290 1.jpg`, width: 390, height: 596, alt: "" },
  { src: `${DIR}/image 166.jpg`, width: 1030, height: 579, alt: "" },
  { src: `${DIR}/image 329.jpg`, width: 930, height: 930, alt: "" },
  { src: `${DIR}/Gemini_Generated_Image_i39boki39boki39b.jpg`, width: 536, height: 585, alt: "" },
  { src: `${DIR}/image 207.jpg`, width: 1149, height: 742, alt: "" },
  { src: `${DIR}/thumb_IMG_1738_1024 1.jpg`, width: 459, height: 459, alt: "" },
  { src: `${DIR}/Macbook_Air_M2_Mockup_2 1.jpg`, width: 1126, height: 776, alt: "" },
  { src: `${DIR}/image 271.jpg`, width: 1231, height: 1119, alt: "" },
  { src: `${DIR}/avid5.jpg`, width: 871, height: 701, alt: "" },
  { src: `${DIR}/image 206.jpg`, width: 776, height: 555, alt: "" },
  { src: `${DIR}/image 205.jpg`, width: 1855, height: 1208, alt: "" },
  { src: `${DIR}/avid2 3.jpg`, width: 930, height: 678, alt: "" },
  { src: `${DIR}/image 328.jpg`, width: 1062, height: 593, alt: "" },
  { src: `${DIR}/project image grid.jpg`, width: 910, height: 606, alt: "" },
];
