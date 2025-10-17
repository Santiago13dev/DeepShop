import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes (opcional - comentar si no quieres borrar)
  console.log('🗑️  Limpiando datos existentes...');
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // ========================================
  // CREAR CATEGORÍAS
  // ========================================
  console.log('📁 Creando categorías...');

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electrónica',
        slug: 'electronica',
        description: 'Dispositivos electrónicos y tecnología',
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Ropa y Moda',
        slug: 'ropa-moda',
        description: 'Ropa, calzado y accesorios de moda',
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Hogar y Cocina',
        slug: 'hogar-cocina',
        description: 'Artículos para el hogar y cocina',
        isActive: true,
        displayOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Deportes',
        slug: 'deportes',
        description: 'Equipamiento deportivo y fitness',
        isActive: true,
        displayOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Libros',
        slug: 'libros',
        description: 'Libros físicos y digitales',
        isActive: true,
        displayOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Juguetes',
        slug: 'juguetes',
        description: 'Juguetes y juegos para todas las edades',
        isActive: true,
        displayOrder: 6,
      },
    }),
  ]);

  console.log(`✅ ${categories.length} categorías creadas`);

  // ========================================
  // CREAR PRODUCTOS
  // ========================================
  console.log('📦 Creando productos...');

  // ELECTRÓNICA
  const electronicsProducts = [
    {
      sku: 'ELEC-001',
      title: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      description: 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.7 pulgadas. Incluye Dynamic Island y conectividad 5G.',
      shortDescription: 'Smartphone premium con chip A17 Pro',
      priceCents: 129900,
      compareAtPriceCents: 149900,
      categoryId: categories[0].id,
      stockQuantity: 50,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'ELEC-002',
      title: 'MacBook Pro 14" M3',
      slug: 'macbook-pro-14-m3',
      description: 'Laptop profesional con chip M3, 16GB RAM, 512GB SSD. Pantalla Liquid Retina XDR de 14 pulgadas. Perfecta para desarrollo y diseño.',
      shortDescription: 'Laptop profesional con chip M3',
      priceCents: 199900,
      compareAtPriceCents: 219900,
      categoryId: categories[0].id,
      stockQuantity: 30,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'ELEC-003',
      title: 'AirPods Pro (2da Gen)',
      slug: 'airpods-pro-2gen',
      description: 'Auriculares inalámbricos con cancelación activa de ruido, audio espacial personalizado y hasta 6 horas de batería.',
      shortDescription: 'Auriculares con cancelación de ruido',
      priceCents: 24900,
      compareAtPriceCents: 27900,
      categoryId: categories[0].id,
      stockQuantity: 100,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'ELEC-004',
      title: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Smartphone Android premium con S Pen, cámara de 200MP, pantalla AMOLED de 6.8" y batería de 5000mAh.',
      shortDescription: 'Flagship Android con S Pen',
      priceCents: 119900,
      compareAtPriceCents: 139900,
      categoryId: categories[0].id,
      stockQuantity: 45,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'ELEC-005',
      title: 'iPad Air 11" M2',
      slug: 'ipad-air-11-m2',
      description: 'Tablet versátil con chip M2, compatible con Apple Pencil Pro y Magic Keyboard. Perfecta para creativos y estudiantes.',
      shortDescription: 'Tablet potente con chip M2',
      priceCents: 59900,
      compareAtPriceCents: 64900,
      categoryId: categories[0].id,
      stockQuantity: 60,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'ELEC-006',
      title: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      description: 'Auriculares over-ear con la mejor cancelación de ruido del mercado, 30 horas de batería y sonido Hi-Res.',
      shortDescription: 'Auriculares premium con ANC',
      priceCents: 39900,
      compareAtPriceCents: 44900,
      categoryId: categories[0].id,
      stockQuantity: 40,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'ELEC-007',
      title: 'Apple Watch Series 9',
      slug: 'apple-watch-series-9',
      description: 'Smartwatch con chip S9, pantalla siempre activa, monitoreo de salud avanzado y resistencia al agua.',
      shortDescription: 'Smartwatch con chip S9',
      priceCents: 42900,
      compareAtPriceCents: 46900,
      categoryId: categories[0].id,
      stockQuantity: 70,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'ELEC-008',
      title: 'Nintendo Switch OLED',
      slug: 'nintendo-switch-oled',
      description: 'Consola híbrida con pantalla OLED de 7 pulgadas, 64GB de almacenamiento y dock con puerto LAN.',
      shortDescription: 'Consola híbrida con pantalla OLED',
      priceCents: 34900,
      compareAtPriceCents: 37900,
      categoryId: categories[0].id,
      stockQuantity: 55,
      isActive: true,
      isFeatured: false,
    },
  ];

  // ROPA Y MODA
  const fashionProducts = [
    {
      sku: 'ROPA-001',
      title: 'Chaqueta de Cuero Premium',
      slug: 'chaqueta-cuero-premium',
      description: 'Chaqueta de cuero genuino estilo motociclista. Diseño atemporal con forro interior suave y múltiples bolsillos.',
      shortDescription: 'Chaqueta de cuero genuino',
      priceCents: 29900,
      compareAtPriceCents: 39900,
      categoryId: categories[1].id,
      stockQuantity: 25,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'ROPA-002',
      title: 'Zapatillas Nike Air Max 270',
      slug: 'nike-air-max-270',
      description: 'Zapatillas deportivas con tecnología Air Max, diseño moderno y comodidad excepcional para uso diario.',
      shortDescription: 'Zapatillas deportivas Nike',
      priceCents: 15900,
      compareAtPriceCents: 17900,
      categoryId: categories[1].id,
      stockQuantity: 80,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'ROPA-003',
      title: 'Jeans Levi\'s 501 Original',
      slug: 'levis-501-original',
      description: 'Jeans clásicos de corte recto, confeccionados en denim de alta calidad. El icónico modelo 501.',
      shortDescription: 'Jeans clásicos Levi\'s',
      priceCents: 8900,
      compareAtPriceCents: 9900,
      categoryId: categories[1].id,
      stockQuantity: 120,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'ROPA-004',
      title: 'Vestido Elegante Negro',
      slug: 'vestido-elegante-negro',
      description: 'Vestido negro elegante perfecto para eventos formales. Corte entallado y tela de alta calidad.',
      shortDescription: 'Vestido negro formal',
      priceCents: 12900,
      compareAtPriceCents: 15900,
      categoryId: categories[1].id,
      stockQuantity: 40,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'ROPA-005',
      title: 'Camisa de Lino Blanca',
      slug: 'camisa-lino-blanca',
      description: 'Camisa de lino 100% natural, perfecta para climas cálidos. Diseño casual y elegante.',
      shortDescription: 'Camisa de lino natural',
      priceCents: 6900,
      categoryId: categories[1].id,
      stockQuantity: 90,
      isActive: true,
      isFeatured: false,
    },
  ];

  // HOGAR Y COCINA
  const homeProducts = [
    {
      sku: 'HOGAR-001',
      title: 'Cafetera Nespresso Vertuo',
      slug: 'cafetera-nespresso-vertuo',
      description: 'Cafetera de cápsulas con tecnología Centrifusion. Prepara café y espresso de calidad barista en casa.',
      shortDescription: 'Cafetera de cápsulas premium',
      priceCents: 18900,
      compareAtPriceCents: 21900,
      categoryId: categories[2].id,
      stockQuantity: 35,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'HOGAR-002',
      title: 'Juego de Sartenes Antiadherentes',
      slug: 'sartenes-antiadherentes',
      description: 'Set de 3 sartenes con recubrimiento antiadherente de cerámica. Aptas para todo tipo de cocinas.',
      shortDescription: 'Set de 3 sartenes premium',
      priceCents: 7900,
      compareAtPriceCents: 9900,
      categoryId: categories[2].id,
      stockQuantity: 60,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'HOGAR-003',
      title: 'Aspiradora Robot iRobot Roomba',
      slug: 'roomba-robot-aspiradora',
      description: 'Aspiradora robot inteligente con mapeo avanzado, control por app y vaciado automático.',
      shortDescription: 'Robot aspiradora inteligente',
      priceCents: 49900,
      compareAtPriceCents: 59900,
      categoryId: categories[2].id,
      stockQuantity: 20,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'HOGAR-004',
      title: 'Licuadora Vitamix Professional',
      slug: 'licuadora-vitamix',
      description: 'Licuadora de alta potencia con motor de 2.2 HP. Perfecta para smoothies, sopas calientes y más.',
      shortDescription: 'Licuadora profesional potente',
      priceCents: 39900,
      compareAtPriceCents: 44900,
      categoryId: categories[2].id,
      stockQuantity: 25,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'HOGAR-005',
      title: 'Juego de Cuchillos de Chef',
      slug: 'cuchillos-chef-profesional',
      description: 'Set de 5 cuchillos de acero inoxidable alemán con bloque de madera. Calidad profesional.',
      shortDescription: 'Set de cuchillos profesionales',
      priceCents: 15900,
      compareAtPriceCents: 18900,
      categoryId: categories[2].id,
      stockQuantity: 45,
      isActive: true,
      isFeatured: false,
    },
  ];

  // DEPORTES
  const sportsProducts = [
    {
      sku: 'DEP-001',
      title: 'Bicicleta de Montaña Trek',
      slug: 'bicicleta-montana-trek',
      description: 'Bicicleta de montaña con cuadro de aluminio, suspensión delantera y 21 velocidades. Perfecta para trails.',
      shortDescription: 'MTB con suspensión delantera',
      priceCents: 89900,
      compareAtPriceCents: 99900,
      categoryId: categories[3].id,
      stockQuantity: 15,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'DEP-002',
      title: 'Mancuernas Ajustables 20kg',
      slug: 'mancuernas-ajustables-20kg',
      description: 'Par de mancuernas ajustables de 2.5kg a 20kg cada una. Sistema de ajuste rápido y compacto.',
      shortDescription: 'Mancuernas ajustables profesionales',
      priceCents: 29900,
      compareAtPriceCents: 34900,
      categoryId: categories[3].id,
      stockQuantity: 40,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'DEP-003',
      title: 'Esterilla de Yoga Premium',
      slug: 'esterilla-yoga-premium',
      description: 'Esterilla de yoga antideslizante de 6mm de grosor. Material ecológico y duradera.',
      shortDescription: 'Esterilla yoga antideslizante',
      priceCents: 4900,
      compareAtPriceCents: 5900,
      categoryId: categories[3].id,
      stockQuantity: 100,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'DEP-004',
      title: 'Pelota de Fútbol Adidas',
      slug: 'pelota-futbol-adidas',
      description: 'Balón de fútbol oficial tamaño 5, diseño térmico y certificación FIFA Quality.',
      shortDescription: 'Balón oficial Adidas',
      priceCents: 3900,
      compareAtPriceCents: 4900,
      categoryId: categories[3].id,
      stockQuantity: 75,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'DEP-005',
      title: 'Smartwatch Deportivo Garmin',
      slug: 'garmin-smartwatch-deportivo',
      description: 'Reloj deportivo con GPS, monitor cardíaco, métricas avanzadas y batería de 14 días.',
      shortDescription: 'Smartwatch GPS para deportistas',
      priceCents: 34900,
      compareAtPriceCents: 39900,
      categoryId: categories[3].id,
      stockQuantity: 30,
      isActive: true,
      isFeatured: true,
    },
  ];

  // LIBROS
  const bookProducts = [
    {
      sku: 'LIB-001',
      title: 'Cien Años de Soledad - Gabriel García Márquez',
      slug: 'cien-anos-soledad',
      description: 'Obra maestra del realismo mágico. La historia de la familia Buendía en Macondo.',
      shortDescription: 'Clásico de García Márquez',
      priceCents: 2900,
      compareAtPriceCents: 3500,
      categoryId: categories[4].id,
      stockQuantity: 150,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'LIB-002',
      title: 'El Principito - Antoine de Saint-Exupéry',
      slug: 'el-principito',
      description: 'Cuento filosófico sobre la amistad, el amor y la pérdida. Edición ilustrada.',
      shortDescription: 'Clásico universal ilustrado',
      priceCents: 1900,
      compareAtPriceCents: 2400,
      categoryId: categories[4].id,
      stockQuantity: 200,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'LIB-003',
      title: 'Sapiens - Yuval Noah Harari',
      slug: 'sapiens-harari',
      description: 'De animales a dioses: Una breve historia de la humanidad. Bestseller internacional.',
      shortDescription: 'Historia de la humanidad',
      priceCents: 3900,
      compareAtPriceCents: 4500,
      categoryId: categories[4].id,
      stockQuantity: 100,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'LIB-004',
      title: 'Clean Code - Robert C. Martin',
      slug: 'clean-code-martin',
      description: 'Guía esencial para escribir código limpio y mantenible. Imprescindible para programadores.',
      shortDescription: 'Guía de código limpio',
      priceCents: 4900,
      compareAtPriceCents: 5900,
      categoryId: categories[4].id,
      stockQuantity: 80,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'LIB-005',
      title: '1984 - George Orwell',
      slug: '1984-orwell',
      description: 'Distopía clásica sobre un futuro totalitario. Una de las novelas más influyentes del siglo XX.',
      shortDescription: 'Distopía clásica',
      priceCents: 2400,
      compareAtPriceCents: 2900,
      categoryId: categories[4].id,
      stockQuantity: 120,
      isActive: true,
      isFeatured: false,
    },
  ];

  // JUGUETES
  const toyProducts = [
    {
      sku: 'JUG-001',
      title: 'LEGO Star Wars Millennium Falcon',
      slug: 'lego-millennium-falcon',
      description: 'Set de construcción LEGO con 1351 piezas. Incluye minifiguras de Han Solo, Chewbacca y más.',
      shortDescription: 'Set LEGO Star Wars',
      priceCents: 16900,
      compareAtPriceCents: 19900,
      categoryId: categories[5].id,
      stockQuantity: 35,
      isActive: true,
      isFeatured: true,
    },
    {
      sku: 'JUG-002',
      title: 'Barbie Dreamhouse',
      slug: 'barbie-dreamhouse',
      description: 'Casa de ensueño de Barbie con 3 pisos, 8 habitaciones y más de 70 accesorios.',
      shortDescription: 'Casa de Barbie con accesorios',
      priceCents: 24900,
      compareAtPriceCents: 29900,
      categoryId: categories[5].id,
      stockQuantity: 20,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'JUG-003',
      title: 'Hot Wheels Pista Mega Looping',
      slug: 'hot-wheels-mega-looping',
      description: 'Pista de carreras con looping gigante y lanzador de alta velocidad. Incluye 2 autos.',
      shortDescription: 'Pista Hot Wheels con looping',
      priceCents: 5900,
      compareAtPriceCents: 6900,
      categoryId: categories[5].id,
      stockQuantity: 60,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'JUG-004',
      title: 'Cubo Rubik Original 3x3',
      slug: 'cubo-rubik-3x3',
      description: 'El clásico cubo de Rubik original. Desarrolla habilidades cognitivas y de resolución de problemas.',
      shortDescription: 'Cubo Rubik clásico',
      priceCents: 1900,
      compareAtPriceCents: 2400,
      categoryId: categories[5].id,
      stockQuantity: 150,
      isActive: true,
      isFeatured: false,
    },
    {
      sku: 'JUG-005',
      title: 'Monopoly Edición Clásica',
      slug: 'monopoly-clasico',
      description: 'El juego de mesa más vendido del mundo. Compra, vende y negocia propiedades.',
      shortDescription: 'Juego de mesa Monopoly',
      priceCents: 3900,
      compareAtPriceCents: 4500,
      categoryId: categories[5].id,
      stockQuantity: 80,
      isActive: true,
      isFeatured: false,
    },
  ];

  // Combinar todos los productos
  const allProducts = [
    ...electronicsProducts,
    ...fashionProducts,
    ...homeProducts,
    ...sportsProducts,
    ...bookProducts,
    ...toyProducts,
  ];

  // Crear productos en la base de datos
  for (const productData of allProducts) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log(`✅ ${allProducts.length} productos creados`);

  // ========================================
  // RESUMEN
  // ========================================
  console.log('\n🎉 Seed completado exitosamente!');
  console.log(`📊 Resumen:`);
  console.log(`   - Categorías: ${categories.length}`);
  console.log(`   - Productos: ${allProducts.length}`);
  console.log(`   - Electrónica: ${electronicsProducts.length}`);
  console.log(`   - Ropa y Moda: ${fashionProducts.length}`);
  console.log(`   - Hogar y Cocina: ${homeProducts.length}`);
  console.log(`   - Deportes: ${sportsProducts.length}`);
  console.log(`   - Libros: ${bookProducts.length}`);
  console.log(`   - Juguetes: ${toyProducts.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
