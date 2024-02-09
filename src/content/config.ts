// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});

const collageCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        pubDate: z.string(),
        description: z.string(),
        link: z.string(),
        image: z.object({
            url: z.string(),
            alt: z.string()
          }),
        src: z.string(),
        tags: z.array(z.string())
    })
});

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    pageName: z.string(),
    pubDate: z.string(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  collages: collageCollection,
  projects: projectsCollection
};