import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
// Create an image URL builder using the client
const builder = createImageUrlBuilder({ projectId, dataset });

// Export a function that can be used to get image URLs
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
