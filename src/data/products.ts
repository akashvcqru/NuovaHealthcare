import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod-rc-gastro",
    name: "Royal Canin Vet Gastrointestinal Low Fat Dry Dog Food",
    description: "Formulated for dogs with digestive sensitivities. This dry kibble supports gastrointestinal health with highly digestible proteins, prebiotics, and low fat levels to assist with lipid metabolism.",
    price: 7199,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600",
    category: "food",
    subcategory: "dog-food",
    petType: "dog",
    rating: 4.8,
    reviewsCount: 124,
    brand: "Royal Canin",
    isFeatured: true,
    isHealthcare: true,
    inStock: true,
    sizes: ["3.5kg", "8kg", "12kg"],
    tags: ["Vet Approved", "Low Fat", "Sensitive Stomach"],
    specs: {
      "Lifestage": "Adult",
      "Special Diet": "Veterinary Diet, Gastrointestinal, Low Fat",
      "Main Ingredient": "Brewers Rice, Chicken By-Product Meal",
      "Manufacturer": "Royal Canin",
      "Origin": "USA"
    },
    reviews: [
      { id: "rev-1", userName: "Sarah Jenkins", rating: 5, comment: "My Golden Retriever has pancreatic issues, and this is the only food that works. Truly a lifesaver!", date: "2026-05-12", verified: true },
      { id: "rev-2", userName: "Dr. David Vance", rating: 5, comment: "As a veterinarian, I frequently prescribe this for acute pancreatitis and lipid absorption issues. Highly digestible.", date: "2026-05-01", verified: true }
    ]
  },
  {
    id: "prod-orijen-six-fish",
    name: "Orijen Six Fish Grain-Free Dry Cat Food",
    description: "Packed with 85% quality fish ingredients, including wild-caught pilchard, hake, mackerel, flounder, rockfish, and sole. Mimics a natural wild diet with nutrient-dense whole prey ratios.",
    price: 4399,
    originalPrice: 4799,
    image: "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&q=80&w=600",
    category: "food",
    subcategory: "cat-food",
    petType: "cat",
    rating: 4.9,
    reviewsCount: 88,
    brand: "Orijen",
    isFeatured: true,
    inStock: true,
    sizes: ["1.8kg", "5.4kg"],
    tags: ["Grain Free", "High Protein", "Wild Caught"],
    specs: {
      "Lifestage": "All Lifestages",
      "Special Diet": "Grain-Free, High-Protein",
      "Main Ingredient": "Whole Mackerel, Whole Herring, Flounder",
      "Manufacturer": "Champion Petfoods",
      "Origin": "Canada"
    },
    reviews: [
      { id: "rev-3", userName: "Emily R.", rating: 5, comment: "My cats have gorgeous, shiny coats now! They absolute adore the taste, even the picky one.", date: "2026-05-20", verified: true }
    ]
  },
  {
    id: "prod-greenies-dental",
    name: "Greenies Original Dental Dog Treats (Regular size)",
    description: "Cleans teeth down to the gumline while fighting plaque and tartar. Formulated for easy digestion, these treats carry the Veterinary Oral Health Council (VOHC) seal of acceptance.",
    price: 2639,
    originalPrice: 2879,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600",
    category: "treats",
    subcategory: "chews",
    petType: "dog",
    rating: 4.7,
    reviewsCount: 230,
    brand: "Greenies",
    isFeatured: true,
    inStock: true,
    sizes: ["18 Treats", "36 Treats"],
    tags: ["Dental Health", "Vet Approved", "VOHC Sealed"],
    specs: {
      "Lifestage": "Adult (6+ months)",
      "Treatment Type": "Dental plaque & tartar control",
      "Calorie Content": "91 kcal per treat",
      "Manufacturer": "Mars Petcare",
      "Origin": "USA"
    },
    reviews: [
      { id: "rev-4", userName: "Marcus T.", rating: 5, comment: "Her breath went from horrible to fresh in a week. Plus, she begs for one every morning.", date: "2026-05-18", verified: true }
    ]
  },
  {
    id: "prod-frontline-plus",
    name: "Frontline Plus Flea and Tick Prevention for Large Dogs",
    description: "Vets' #1 choice for flea and tick prevention. Rapidly kills adult fleas, ticks, flea eggs, and larvae. Provides 30 days of continuous waterproof protection for dogs weighing 45-88 lbs.",
    price: 5199,
    originalPrice: 5839,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600",
    category: "healthcare",
    subcategory: "flea-tick",
    petType: "dog",
    rating: 4.6,
    reviewsCount: 312,
    brand: "Frontline",
    isFeatured: true,
    isHealthcare: true,
    inStock: true,
    sizes: ["3 Doses", "6 Doses"],
    tags: ["Flea & Tick", "Vet Prescribed", "Waterproof"],
    specs: {
      "Pet Weight": "45 to 88 lbs (Large)",
      "Active Ingredients": "Fipronil (9.8%), (S)-methoprene (8.8%)",
      "Duration": "30 days per dose",
      "Manufacturer": "Boehringer Ingelheim",
      "Origin": "France"
    },
    reviews: [
      { id: "rev-5", userName: "Jessica Miller", rating: 5, comment: "I live in a heavily wooded area, and Frontline keeps the ticks away completely. Never failed me.", date: "2026-04-28", verified: true }
    ]
  },
  {
    id: "prod-furminator-deshed",
    name: "FURminator Undercoat De-shedding Tool for Dogs",
    description: "Reduces loose hair shedding by up to 90% with regular use. The stainless steel de-shedding edge reaches deep beneath your dog's topcoat to gently remove undercoat hair without scratching skin.",
    price: 3199,
    image: "https://images.unsplash.com/photo-1597843798120-fc10911fe93f?auto=format&fit=crop&q=80&w=600",
    category: "grooming",
    subcategory: "brushes",
    petType: "dog",
    rating: 4.8,
    reviewsCount: 410,
    brand: "FURminator",
    isFeatured: true,
    inStock: true,
    sizes: ["Small Dog", "Medium Dog", "Large Dog"],
    tags: ["De-shedding", "Premium Tool", "Ergonomic"],
    specs: {
      "Blade Type": "Stainless steel undercoat edge",
      "Handle Type": "Ergonomic rubber grip",
      "Special Feature": "FURejector button for quick hair release",
      "Manufacturer": "Spectrum Brands",
      "Origin": "Germany"
    },
    reviews: [
      { id: "rev-6", userName: "Robert K.", rating: 5, comment: "The amount of hair this brushes off is unbelievable. Incredible build quality.", date: "2026-05-15", verified: true }
    ]
  },
  {
    id: "prod-catit-flower",
    name: "Catit Flower Automatic Water Fountain",
    description: "Provides three water flow settings to encourage picky cats to drink more. Includes a dual-action water softening filter that purifies tap water and prevents urinary tract crystals.",
    price: 2399,
    originalPrice: 2799,
    image: "https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=600",
    category: "accessories",
    subcategory: "feeding-supplies",
    petType: "cat",
    rating: 4.5,
    reviewsCount: 175,
    brand: "Catit",
    isNew: true,
    inStock: true,
    sizes: ["3L Capacity"],
    tags: ["Hydration", "Quiet Motor", "Triple Filtered"],
    specs: {
      "Capacity": "3 Liters (100 fl oz)",
      "Material": "BPA-Free Plastic",
      "Power Source": "Low-voltage USB pump",
      "Dimensions": "8.3 x 8.3 x 7.3 inches",
      "Manufacturer": "Rolf C. Hagen"
    },
    reviews: [
      { id: "rev-7", userName: "Clara S.", rating: 4, comment: "My cat was fascinated from day one. Quiet motor, very easy to clean.", date: "2026-05-22", verified: true }
    ]
  },
  {
    id: "prod-ortho-bed",
    name: "SoothePup Orthopedic Memory Foam Pet Bed",
    description: "Premium therapeutic memory foam relieves joint pain and arthritis in senior pets. Wrapped in an ultra-soft, washable plush cover with a non-slip waterproof base.",
    price: 6399,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=600",
    category: "accessories",
    subcategory: "beds-collars",
    petType: "dog",
    rating: 4.9,
    reviewsCount: 154,
    brand: "SoothePup",
    isFeatured: true,
    inStock: true,
    sizes: ["Medium", "Large", "Extra Large"],
    tags: ["Orthopedic", "Washable Cover", "Memory Foam"],
    specs: {
      "Foam Density": "Medical-grade orthopedic memory foam",
      "Cover Material": "Removable micro-velvet plush",
      "Base Type": "Waterproof, non-slip rubber dots",
      "Manufacturer": "SoothePup Co.",
      "Origin": "USA"
    },
    reviews: [
      { id: "rev-8", userName: "Linda H.", rating: 5, comment: "My 10-year-old lab sleeps so peacefully on this. He rises with much less stiffness. Highly recommended!", date: "2026-05-19", verified: true }
    ]
  },
  {
    id: "prod-nutrivet-joint",
    name: "Nutri-Vet Glucosamine Hip & Joint Soft Chews",
    description: "Contains 500mg of Glucosamine, 100mg of Chondroitin, and MSM per serving. Formulated by veterinarians to support joint function, cartilage health, and mobility in dogs of all sizes.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600",
    category: "healthcare",
    subcategory: "supplements",
    petType: "dog",
    rating: 4.7,
    reviewsCount: 96,
    brand: "Nutri-Vet",
    isHealthcare: true,
    inStock: true,
    sizes: ["120 Soft Chews"],
    tags: ["Vet Formulated", "Joint Relief", "MSM & Chondroitin"],
    specs: {
      "Active Ingredients": "Glucosamine HCL, Chondroitin Sulfate, MSM",
      "Lifestage": "Adult / Senior",
      "Chew Taste": "Savory liver flavor",
      "Manufacturer": "Nutri-Vet LLC",
      "Origin": "USA"
    },
    reviews: [
      { id: "rev-9", userName: "Brian O.", rating: 5, comment: "He eats them like treats! We've seen a noticeable spring in his step after about 3 weeks.", date: "2026-05-09", verified: true }
    ]
  },
  {
    id: "prod-oxbow-hay",
    name: "Oxbow Western Timothy Hay for Rabbits & Guinea Pigs",
    description: "High-fiber, low-protein Timothy grass hay, hand-selected to ensure long-strand fibers. Promotes healthy digestion, dental wear, and overall urinary health for rabbits, guinea pigs, and chinchillas.",
    price: 1519,
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600",
    category: "food",
    subcategory: "small-pet-food",
    petType: "small-pet",
    rating: 4.8,
    reviewsCount: 145,
    brand: "Oxbow",
    inStock: true,
    sizes: ["1.1kg", "4kg"],
    tags: ["High Fiber", "100% Natural", "Dental Wear"],
    specs: {
      "Pet Type": "Rabbit, Guinea Pig, Chinchilla",
      "Fiber Content": "Min 32.00% crude fiber",
      "Treatment": "Sun-cured, dust-free packaging",
      "Manufacturer": "Oxbow Animal Health"
    },
    reviews: [
      { id: "rev-10", userName: "Amanda L.", rating: 5, comment: "Fresh, green, and fragrant. My rabbits won't eat any other brand of hay.", date: "2026-04-12", verified: true }
    ]
  },
  {
    id: "prod-zupreem-fruit",
    name: "ZuPreem FruitBlend Premium Pellets for Medium Birds",
    description: "Provides healthy and delicious nutrition for daily feeding of Cockatiels, Quakers, Lovebirds, and Conures. Fortified with essential vitamins, minerals, and amino acids.",
    price: 1759,
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=600",
    category: "food",
    subcategory: "bird-food",
    petType: "bird",
    rating: 4.6,
    reviewsCount: 76,
    brand: "ZuPreem",
    inStock: true,
    sizes: ["0.9kg", "1.8kg"],
    tags: ["Fruit Flavors", "Vitamins & Minerals", "Balanced Diet"],
    specs: {
      "Pet Type": "Cockatiels, Conures, Lovebirds",
      "Flavor": "Fruit Blend (Banana, Apple, Grape, Orange)",
      "Main Ingredient": "Ground Corn, Soybean Meal",
      "Manufacturer": "ZuPreem Inc."
    },
    reviews: [
      { id: "rev-11", userName: "Paul W.", rating: 4, comment: "My Quaker parrot loves the banana shapes. Great nutritional base food.", date: "2026-04-30", verified: true }
    ]
  },
  {
    id: "prod-tetramin-flakes",
    name: "TetraMin Tropical Flakes Goldfish & Community Food",
    description: "Cleans water formulation with ProCare for optimal health. Includes high-quality ingredients, antioxidants, vitamins, and minerals that support immune health and enhance natural colors.",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600",
    category: "food",
    subcategory: "fish-food",
    petType: "fish",
    rating: 4.7,
    reviewsCount: 198,
    brand: "Tetra",
    inStock: true,
    sizes: ["100g", "200g"],
    tags: ["Color Enhancing", "Clean Water", "ProCare BioActive"],
    specs: {
      "Pet Type": "Tropical Fish, Community Aquariums",
      "Main Feature": "Will not cloud water when used as directed",
      "Key Ingredients": "Fish meal, dried yeast, shrimp meal",
      "Manufacturer": "Tetra GmbH"
    },
    reviews: [
      { id: "rev-12", userName: "Toby G.", rating: 5, comment: "Classic fish food, fish are colorful and water stays crystal clear. Great value.", date: "2026-05-14", verified: true }
    ]
  },
  {
    id: "prod-vetsbest-shampoo",
    name: "Vet's Best Hypoallergenic Shampoo for Sensitive Skin",
    description: "A soothing, soap-free formula that cleanses and moisturizes dry, sensitive skin. Formulated with natural ingredients including aloe vera, oatmeal, and vitamin E to relieve itching.",
    price: 1279,
    image: "https://images.unsplash.com/photo-1535268647977-a403b69fc756?auto=format&fit=crop&q=80&w=600",
    category: "grooming",
    subcategory: "shampoos",
    petType: "dog",
    rating: 4.7,
    reviewsCount: 110,
    brand: "Vet's Best",
    isHealthcare: true,
    inStock: true,
    sizes: ["470ml Bottle"],
    tags: ["Soap Free", "Oatmeal & Aloe", "Itch Relief"],
    specs: {
      "Skin Type": "Dry, Sensitive, Allergen-prone",
      "Ingredients": "All-natural Key Actives (Oatmeal, Aloe Vera, Chamomile)",
      "Cruelty Free": "Yes",
      "Manufacturer": "Dallas Manufacturing Co."
    },
    reviews: [
      { id: "rev-13", userName: "Megan K.", rating: 5, comment: "Smells wonderful and doesn't irritate my pitbull's sensitive skin. Stopped his constant scratching.", date: "2026-05-24", verified: true }
    ]
  },
  {
    id: "prod-kong-extreme",
    name: "KONG Extreme Ultra-Durable Rubber Chew Toy",
    description: "Designed for the toughest chewers. The ultra-durable, all-natural black rubber formula is built to withstand power chewers. Can be stuffed with kibble or peanut butter for mental stimulation.",
    price: 1359,
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600",
    category: "accessories",
    subcategory: "toys",
    petType: "dog",
    rating: 4.9,
    reviewsCount: 540,
    brand: "KONG",
    isFeatured: true,
    inStock: true,
    sizes: ["Medium", "Large", "XL"],
    tags: ["Power Chewer", "Natural Rubber", "Stuffable"],
    specs: {
      "Material": "KONG Extreme natural black rubber",
      "Special Use": "Fetch, Chew, Enrichment, Crate training",
      "Safety": "Vet recommended and BPA-free",
      "Manufacturer": "KONG Company"
    },
    reviews: [
      { id: "rev-14", userName: "Derek H.", rating: 5, comment: "The only toy my Rottweiler hasn't destroyed. Lasts for months. Absolute beast of a toy.", date: "2026-05-21", verified: true }
    ]
  },
  {
    id: "prod-feliway-calm",
    name: "Feliway Classic Calming Diffuser & Refill Kit",
    description: "Voted #1 clinically proven calming solution for cats. Replicates natural feline facial pheromones to help reduce scratching, urine spraying, and stress behaviors during transitions.",
    price: 3599,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    category: "healthcare",
    subcategory: "first-aid",
    petType: "cat",
    rating: 4.4,
    reviewsCount: 162,
    brand: "Feliway",
    isHealthcare: true,
    isNew: true,
    inStock: true,
    sizes: ["30-Day Starter Kit"],
    tags: ["Clinically Proven", "Drug-Free Calming", "Urinary Control"],
    specs: {
      "Coverage": "Up to 700 sq. ft.",
      "Treatment Type": "Pheromone diffuser",
      "Duration": "Refill lasts up to 30 days",
      "Manufacturer": "Ceva Animal Health"
    },
    reviews: [
      { id: "rev-15", userName: "Anna Perez", rating: 4, comment: "Helped immensely when we introduced a new kitten. Our older cat stopped hiding in two days.", date: "2026-05-11", verified: true }
    ]
  },
  {
    id: "prod-cat-tree",
    name: "FelineHeights 60-inch Multi-Level Cat Tree & Condo",
    description: "A luxury activity tower with sisal-covered scratching posts, dual hanging toys, plush hammocks, and a cozy private condo. Ideal for households with multiple climbing cats.",
    price: 9599,
    originalPrice: 11199,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=600",
    category: "accessories",
    subcategory: "toys",
    petType: "cat",
    rating: 4.8,
    reviewsCount: 92,
    brand: "FelineHeights",
    isNew: true,
    inStock: true,
    sizes: ["60\" Height"],
    tags: ["Multi-Level", "Sisal Scratching", "Sturdy Base"],
    specs: {
      "Height": "60 inches",
      "Material": "Engineered wood, plush fabric, natural sisal rope",
      "Max Load": "40 lbs",
      "Manufacturer": "FelineHeights Co."
    },
    reviews: [
      { id: "rev-16", userName: "Kate V.", rating: 5, comment: "Very sturdy and fairly easy to assemble. My orange cat practically lives in the top perch.", date: "2026-05-02", verified: true }
    ]
  },
  {
    id: "prod-fluval-tank",
    name: "Fluval Spec V 5-Gallon Desktop Aquarium Kit",
    description: "A sleek, contemporary styled nano aquarium designed for small spaces. Includes a powerful 3-stage filtration system and a brilliant 37 LED illumination system to support plant growth.",
    price: 8799,
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600",
    category: "accessories",
    subcategory: "feeding-supplies",
    petType: "fish",
    rating: 4.6,
    reviewsCount: 64,
    brand: "Fluval",
    inStock: true,
    sizes: ["5 Gallon"],
    tags: ["Nano Tank", "LED Lighting", "3-Stage Filter"],
    specs: {
      "Volume": "5 Gallons (19L)",
      "Lighting": "37 High-output LEDs (7500K)",
      "Filter Flow": "Pump with adjustable flow (68 GPH)",
      "Dimensions": "20.5 x 7.5 x 11.6 inches",
      "Manufacturer": "Rolf C. Hagen"
    },
    reviews: [
      { id: "rev-17", userName: "Jeremy Peterson", rating: 5, comment: "Best desktop tank on the market. The filtration compartment is hidden away beautifully.", date: "2026-04-15", verified: true }
    ]
  },
  {
    id: "prod-oxbow-critical",
    name: "Oxbow Critical Care Herbivore Nutrient Powder",
    description: "A premium recovery food that can be syringe-fed to herbivores that are unable to eat due to illness or surgery. Formulated with high-fiber Timothy hay and essential vitamins.",
    price: 1839,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600",
    category: "healthcare",
    subcategory: "supplements",
    petType: "small-pet",
    rating: 4.9,
    reviewsCount: 112,
    brand: "Oxbow",
    isHealthcare: true,
    inStock: true,
    sizes: ["141g Bag"],
    tags: ["Recovery Food", "Syringe Feedable", "High Fiber"],
    specs: {
      "Target Animals": "Rabbit, Guinea Pig, Chinchilla, Tortoise",
      "Active Nutrients": "Timothy grass meal, soy hulls, vitamins C & E",
      "Format": "Water-soluble powder",
      "Manufacturer": "Oxbow Animal Health"
    },
    reviews: [
      { id: "rev-18", userName: "Dr. Lisa White", rating: 5, comment: "Essential item for rabbit gut stasis recovery. Literally saves herbivore lives on a daily basis in clinic.", date: "2026-05-17", verified: true }
    ]
  },
  {
    id: "prod-inaba-churu",
    name: "Inaba Churu Lickable Grain-Free Puree Cat Treats",
    description: "Delicious, lickable purees made from farm-raised chicken and wild-caught tuna. High in moisture cats need for health, with no grains, preservatives, or artificial colors.",
    price: 919,
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=600",
    category: "treats",
    subcategory: "dried-treats",
    petType: "cat",
    rating: 4.9,
    reviewsCount: 380,
    brand: "Inaba Churu",
    isFeatured: true,
    inStock: true,
    sizes: ["20 Pack", "40 Pack"],
    tags: ["Lickable", "Hydrating", "Tuna & Chicken"],
    specs: {
      "Pack Count": "20 tube pouches",
      "Lifestage": "All Lifestages",
      "Moisture Content": "91.00% max",
      "Manufacturer": "Inaba Foods Co."
    },
    reviews: [
      { id: "rev-19", userName: "Rochelle F.", rating: 5, comment: "Feline crack! My cats recognize the crinkle of the package immediately and lose their minds.", date: "2026-05-18", verified: true }
    ]
  },
  {
    id: "prod-earthrated-wipes",
    name: "Earth Rated Compostable Lavender Pet Wipes",
    description: "Compostable, thick, and gentle pet wipes designed to wipe down paws, faces, and bottoms. Made with aloe, shea butter, and chamomile to soothe irritated coats. Alcohol-free.",
    price: 1039,
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600",
    category: "grooming",
    subcategory: "wipes",
    petType: "dog",
    rating: 4.7,
    reviewsCount: 215,
    brand: "Earth Rated",
    inStock: true,
    sizes: ["100 Wipes"],
    tags: ["Compostable", "Lavender Scented", "Hypoallergenic"],
    specs: {
      "Wipe Count": "100 count",
      "Material": "100% USDA Certified Biobased (Compostable)",
      "Ingredients": "Aloe Vera, Shea Butter, Chamomile, Cucumber",
      "Manufacturer": "Earth Rated"
    },
    reviews: [
      { id: "rev-20", userName: "James L.", rating: 4, comment: "Large enough to clean muddy golden paws after a hike. Mild lavender scent is very pleasant.", date: "2026-04-18", verified: true }
    ]
  }
];
