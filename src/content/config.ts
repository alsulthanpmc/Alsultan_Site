import { defineCollection, z } from 'astro:content';

const departmentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    services: z.array(z.string()),
  }),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['cosmetic-dentistry', 'general-dentistry', 'dermatology', 'orthodontics', 'general-medicine', 'laboratory', 'physiotherapy']),
    description: z.string(),
    price: z.string().optional(),
    services: z.array(z.string()),
  }),
});

export const collections = {
  departments: departmentsCollection,
  services: servicesCollection,
};
