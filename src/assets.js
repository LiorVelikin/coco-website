// ─────────────────────────────────────────────────────────────────
// COCO Asset Map — single source of truth for all image paths.
// Uses import.meta.env.BASE_URL so paths work both locally (/)
// and on GitHub Pages (/coco-website/).
// ─────────────────────────────────────────────────────────────────

const base = import.meta.env.BASE_URL;

export const ASSETS = {
  // Product — transparent background versions
  heroCan:      `${base}can-nobg.png`,
  iceBucket:    `${base}ice-bucket-nobg.png`,

  // Product — with background (used as fallback / secondary)
  heroCanBg:    `${base}hero-can.png`,
  iceBucketBg:  `${base}ice-bucket.png`,

  // Can detail macro shot
  canDetail:    `${base}can-detail.png`,

  // Can with water splash + coconut elements (transparent bg)
  canElements:  `${base}can-elements-nobg.png`,

  // Original lifestyle set
  poolModel:    `${base}pool-model.png`,
  tennisModel:  `${base}tennis-model.png`,
  beachModel:   `${base}beach-model.png`,

  // New lifestyle / campaign set
  beachChair:   `${base}beach-chair.png`,
  telAvivBeach: `${base}tel-aviv-beach.png`,
  tennisWoman:  `${base}tennis-woman.png`,
  poolVilla:    `${base}pool-villa.png`,
  padelMan:     `${base}padel-man.png`,
  pilatesWoman: `${base}pilates-woman.png`,
};
