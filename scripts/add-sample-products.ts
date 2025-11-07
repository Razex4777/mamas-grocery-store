import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/lib/database.types';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables. Please check your .env file.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function addSampleProducts() {
  console.log('🚀 Starting to add sample products...\n');

  // First, get all categories
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name');

  if (catError) {
    console.error('❌ Error fetching categories:', catError);
    return;
  }

  console.log('📂 Available categories:', categories?.map(c => c.name).join(', '));

  // Find category IDs (or use the first one if specific names don't exist)
  const categoryId = categories?.[0]?.id || null;

  const products = [
    {
      title: 'Premium Moroccan Argan Oil',
      slug: 'premium-moroccan-argan-oil',
      description: 'Pure, cold-pressed argan oil from Morocco. Rich in vitamin E and essential fatty acids, perfect for culinary and cosmetic use.',
      category_id: categoryId,
      origin: 'Morocco',
      in_stock: true,
      sku: 'ARG-001',
      image_url: '/products/moroccan-argan-oil.png',
      featured: true,
      new_arrival: true,
      benefits: [
        ' 100% pure and organic',
        'Cold-pressed extraction',
        'Rich in antioxidants',
        'Versatile culinary and cosmetic use'
      ],
      specifications: {
        'Volume': '250ml',
        'Type': 'Cold-pressed',
        'Certification': 'Organic'
      },
      is_active: true,
      display_order: 1
    },
    {
      title: 'Algerian Deglet Nour Dates',
      slug: 'algerian-deglet-nour-dates',
      description: 'Premium quality Deglet Nour dates from Algeria. Known as the "Queen of Dates" for their exceptional sweetness and soft texture.',
      category_id: categoryId,
      origin: 'Algeria',
      in_stock: true,
      sku: 'DAT-001',
      image_url: '/products/algerian-dates.png',
      featured: true,
      new_arrival: true,
      benefits: [
        'Natural sweetener alternative',
        'High in fiber and minerals',
        'No added sugar or preservatives',
        'Perfect for snacking and baking'
      ],
      specifications: {
        'Weight': '500g',
        'Grade': 'Premium',
        'Origin': 'Biskra Region'
      },
      is_active: true,
      display_order: 2
    },
    {
      title: 'Tunisian Extra Virgin Olive Oil',
      slug: 'tunisian-extra-virgin-olive-oil',
      description: 'First cold-pressed extra virgin olive oil from Tunisia. Smooth, fruity flavor with a peppery finish, perfect for Mediterranean cuisine.',
      category_id: categoryId,
      origin: 'Tunisia',
      in_stock: true,
      sku: 'OLV-001',
      image_url: '/products/tunisian-olive-oil.png',
      featured: true,
      new_arrival: false,
      benefits: [
        'First cold-pressed',
        'Low acidity (< 0.8%)',
        'Rich in polyphenols',
        'Ideal for cooking and dressing'
      ],
      specifications: {
        'Volume': '750ml',
        'Acidity': '< 0.8%',
        'Harvest': '2024'
      },
      is_active: true,
      display_order: 3
    },
    {
      title: 'Middle Eastern Za\'atar Spice Blend',
      slug: 'middle-eastern-zaatar-spice',
      description: 'Authentic za\'atar blend combining wild thyme, sumac, sesame seeds, and sea salt. A staple in Middle Eastern cuisine.',
      category_id: categoryId,
      origin: 'Orient',
      in_stock: true,
      sku: 'SPC-001',
      image_url: '/products/zaatar-spice.png',
      featured: false,
      new_arrival: true,
      benefits: [
        'Traditional recipe',
        'No artificial additives',
        'Versatile seasoning',
        'Rich in antioxidants'
      ],
      specifications: {
        'Weight': '200g',
        'Ingredients': 'Thyme, Sumac, Sesame, Salt',
        'Shelf Life': '12 months'
      },
      is_active: true,
      display_order: 4
    },
    {
      title: 'Moroccan Premium Couscous',
      slug: 'moroccan-premium-couscous',
      description: 'Traditional Moroccan couscous made from durum wheat semolina. Quick-cooking and perfect for authentic North African dishes.',
      category_id: categoryId,
      origin: 'Morocco',
      in_stock: true,
      sku: 'COU-001',
      image_url: '/products/moroccan-couscous.png',
      featured: false,
      new_arrival: false,
      benefits: [
        'Quick cooking (5 minutes)',
        'Made from durum wheat',
        'Versatile side dish',
        'High in protein'
      ],
      specifications: {
        'Weight': '1kg',
        'Grain Size': 'Medium',
        'Cooking Time': '5 minutes'
      },
      is_active: true,
      display_order: 5
    },
    {
      title: 'Turkish Delight (Lokum)',
      slug: 'turkish-delight-lokum',
      description: 'Authentic Turkish delight in assorted flavors including rose, lemon, and pistachio. Soft, chewy, and dusted with powdered sugar.',
      category_id: categoryId,
      origin: 'Orient',
      in_stock: true,
      sku: 'SWT-001',
      image_url: '/products/turkish-delight.png',
      featured: true,
      new_arrival: false,
      benefits: [
        'Traditional recipe',
        'Natural flavors',
        'Individually wrapped',
        'Perfect gift item'
      ],
      specifications: {
        'Weight': '400g',
        'Flavors': 'Rose, Lemon, Pistachio',
        'Shelf Life': '6 months'
      },
      is_active: true,
      display_order: 6
    }
  ];

  console.log(`\n📦 Adding ${products.length} products...\n`);

  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) {
      console.error(`❌ Error adding ${product.title}:`, error.message);
    } else {
      console.log(`✅ Added: ${product.title} (${product.origin})`);
    }
  }

  console.log('\n🎉 Done adding sample products!');
}

addSampleProducts().catch(console.error);
