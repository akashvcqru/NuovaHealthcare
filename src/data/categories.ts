import { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "food",
    name: "Pet Food",
    description: "Premium, nutritional meals formulated for optimal pet energy, vitality, and longevity.",
    icon: "🍖",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800",
    subcategories: [
      {
        slug: "dog-food",
        name: "Dog Food",
        description: "Dry kibble, wet food, and raw food options for all dog breeds and ages.",
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "cat-food",
        name: "Cat Food",
        description: "Grain-free recipes, wet paté, and specialized diet formulas for feline friends.",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "bird-food",
        name: "Bird Food",
        description: "Nutritious seed blends, pellets, and nut mixes for parrots, canaries, and wild birds.",
        image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "fish-food",
        name: "Fish Food",
        description: "Flakes, floating pellets, and freeze-dried bloodworms for tropical, gold, and pond fish.",
        image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "small-pet-food",
        name: "Small Pet Food",
        description: "Timothy hay, fortified pellets, and vitamin-rich diets for rabbits, hamsters, and guinea pigs.",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    slug: "treats",
    name: "Treats & Chews",
    description: "Tasty rewards, dental chews, and training treats to keep your pets happy and engaged.",
    icon: "🍪",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    subcategories: [
      {
        slug: "chews",
        name: "Dental Chews",
        description: "Tartar-reducing and breath-freshening chews for dogs and cats.",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "biscuits",
        name: "Crunchy Biscuits",
        description: "Oatmeal, peanut butter, and fruit-infused crunchy biscuits.",
        image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "dried-treats",
        name: "Freeze-Dried Treats",
        description: "Single-ingredient beef liver, chicken breast, and salmon bites.",
        image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    slug: "healthcare",
    name: "Pet Healthcare",
    description: "Veterinarian-approved supplements, flea/tick treatments, and wellness products.",
    icon: "🩺",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    subcategories: [
      {
        slug: "supplements",
        name: "Joint & Coat Supplements",
        description: "Glucosamine chewables, salmon oil drops, and multivitamins for energy and joints.",
        image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "flea-tick",
        name: "Flea & Tick Prevention",
        description: "Topical liquids, oral chewables, and collar protections to ward off pests.",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "dental-care",
        name: "Dental Care Products",
        description: "Pet toothpastes, toothbrushes, and water additives for sparkling clean teeth.",
        image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "first-aid",
        name: "First Aid & Wellness",
        description: "Ear cleansers, wound sprays, and calming solutions for stressful times.",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    slug: "grooming",
    name: "Grooming & Hygiene",
    description: "Keep your pets clean, polished, and smelling wonderful with our premium grooming items.",
    icon: "🧼",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
    subcategories: [
      {
        slug: "shampoos",
        name: "Shampoos & Conditioners",
        description: "Hypoallergenic, oatmeal-based, and flea-control shampoos.",
        image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "brushes",
        name: "Brushes & De-shedding",
        description: "Slicker brushes, undercoat rakes, and nail clippers for home grooming.",
        image: "https://images.unsplash.com/photo-1597843798120-fc10911fe93f?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "wipes",
        name: "Cleansing Wipes & Sprays",
        description: "Eye, ear, and paw wipes to keep pets fresh between bath times.",
        image: "https://images.unsplash.com/photo-1535268647977-a403b69fc756?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    slug: "accessories",
    name: "Accessories & Toys",
    description: "Premium comfort beds, durable toys, and stylish feeding bowls.",
    icon: "🧸",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
    subcategories: [
      {
        slug: "toys",
        name: "Interactive Toys",
        description: "Teasers, fetch toys, durable chew rings, and treat dispensers.",
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "beds-collars",
        name: "Beds & Collars",
        description: "Orthopedic memory foam beds, harness sets, and adjustable collars.",
        image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "feeding-supplies",
        name: "Feeding & Bowls",
        description: "Slow-feeders, ceramic bowls, and automatic water fountains.",
        image: "https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=600"
      }
    ]
  }
];

export const petsList = [
  { id: "dog", name: "Dogs", icon: "🐕", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300" },
  { id: "cat", name: "Cats", icon: "🐈", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300" },
  { id: "bird", name: "Birds", icon: "🦜", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=300" },
  { id: "fish", name: "Fish", icon: "🐠", image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=300" },
  { id: "small-pet", name: "Small Pets", icon: "🐹", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=300" }
];
