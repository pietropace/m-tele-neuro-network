import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  return builder?.image(source);
}
