export interface Property {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  image: string;
  status: 'available' | 'sold' | 'rented' | 'funding';
  type: 'sale' | 'rent' | 'crowdfunding';
  tags: string[];
  details: {
    bedrooms?: number;
    bathrooms?: number;
    area: number; // en metros cuadrados
    yearBuilt?: number;
    amenities?: string[];
  };
}

export const demoProperties: Property[] = [
  // Propiedades en México (25)
  {
    id: 1,
    name: "Casa Moderna en Polanco",
    description: "Elegante residencia en una de las zonas más exclusivas de la Ciudad de México. Diseño contemporáneo con acabados de lujo.",
    price: 25000000,
    location: "Polanco, Ciudad de México",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["lujo", "moderno", "exclusivo"],
    details: {
      bedrooms: 5,
      bathrooms: 6,
      area: 450,
      yearBuilt: 2020,
      amenities: ["gimnasio", "alberca", "jardín", "seguridad 24/7"]
    }
  },
  {
    id: 2,
    name: "Departamento en Condesa",
    description: "Acogedor departamento en el corazón de la Condesa. Perfecto para inversión o vivienda.",
    price: 8500,
    location: "Condesa, Ciudad de México",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["renta", "centro", "inversión"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      yearBuilt: 2015,
      amenities: ["estacionamiento", "seguridad"]
    }
  },
  {
    id: 3,
    name: "Desarrollo Residencial en Cancún",
    description: "Oportunidad de inversión en desarrollo de condominios frente al mar. Crowdfunding disponible.",
    price: 5000000,
    location: "Cancún, Quintana Roo",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["playa", "inversión", "desarrollo"],
    details: {
      area: 120,
      amenities: ["playa privada", "alberca", "gimnasio"]
    }
  },
  {
    id: 4,
    name: "Casa Colonial en San Miguel de Allende",
    description: "Hermosa casa colonial restaurada en el centro histórico de San Miguel de Allende.",
    price: 15000000,
    location: "San Miguel de Allende, Guanajuato",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    status: "available",
    type: "sale",
    tags: ["colonial", "histórico", "centro"],
    details: {
      bedrooms: 4,
      bathrooms: 4,
      area: 300,
      yearBuilt: 1800,
      amenities: ["jardín", "terraza", "vistas panorámicas"]
    }
  },
  {
    id: 5,
    name: "Oficinas en Santa Fe",
    description: "Espacios de oficinas modernos en el centro financiero de la Ciudad de México.",
    price: 12000,
    location: "Santa Fe, Ciudad de México",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    status: "available",
    type: "rent",
    tags: ["oficinas", "corporativo", "moderno"],
    details: {
      area: 150,
      amenities: ["estacionamiento", "seguridad", "aire acondicionado central"]
    }
  },
  {
    id: 6,
    name: "Desarrollo Turístico en Tulum",
    description: "Oportunidad de inversión en desarrollo de villas ecológicas en Tulum.",
    price: 3000000,
    location: "Tulum, Quintana Roo",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["ecológico", "turismo", "inversión"],
    details: {
      area: 200,
      amenities: ["playa", "spa", "restaurante"]
    }
  },
  {
    id: 7,
    name: "Casa en Valle de Bravo",
    description: "Espectacular casa con vista al lago en Valle de Bravo.",
    price: 18000000,
    location: "Valle de Bravo, Estado de México",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    status: "available",
    type: "sale",
    tags: ["lago", "montaña", "lujo"],
    details: {
      bedrooms: 6,
      bathrooms: 7,
      area: 500,
      yearBuilt: 2018,
      amenities: ["muelle", "alberca", "bodega"]
    }
  },
  {
    id: 8,
    name: "Loft en Roma Norte",
    description: "Moderno loft en una de las zonas más trendy de la Ciudad de México.",
    price: 9500,
    location: "Roma Norte, Ciudad de México",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    status: "available",
    type: "rent",
    tags: ["loft", "moderno", "centro"],
    details: {
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      yearBuilt: 2019,
      amenities: ["terraza", "estacionamiento"]
    }
  },
  {
    id: 9,
    name: "Desarrollo Industrial en Monterrey",
    description: "Oportunidad de inversión en parque industrial en crecimiento.",
    price: 8000000,
    location: "Monterrey, Nuevo León",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["industrial", "inversión", "desarrollo"],
    details: {
      area: 1000,
      amenities: ["oficinas", "bodegas", "área de carga"]
    }
  },
  {
    id: 10,
    name: "Casa en Puerto Vallarta",
    description: "Hermosa casa frente al mar en Puerto Vallarta.",
    price: 22000000,
    location: "Puerto Vallarta, Jalisco",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    status: "available",
    type: "sale",
    tags: ["playa", "lujo", "vistas"],
    details: {
      bedrooms: 5,
      bathrooms: 6,
      area: 400,
      yearBuilt: 2021,
      amenities: ["playa privada", "alberca", "jacuzzi"]
    }
  },
  // ... Continuaré con más propiedades en el siguiente bloque
];

// Continuación de propiedades en México
export const moreMexicanProperties: Property[] = [
  {
    id: 11,
    name: "Departamento en Guadalajara",
    description: "Moderno departamento en el centro de Guadalajara.",
    price: 7500,
    location: "Centro, Guadalajara",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["centro", "moderno", "renta"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 90,
      yearBuilt: 2018,
      amenities: ["estacionamiento", "seguridad"]
    }
  },
  {
    id: 12,
    name: "Desarrollo Residencial en Mérida",
    description: "Oportunidad de inversión en desarrollo de casas en Mérida.",
    price: 4000000,
    location: "Mérida, Yucatán",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["desarrollo", "inversión", "residencial"],
    details: {
      area: 150,
      amenities: ["alberca", "área social", "seguridad"]
    }
  },
  {
    id: 13,
    name: "Casa en Querétaro",
    description: "Hermosa casa en desarrollo residencial de lujo en Querétaro.",
    price: 12000000,
    location: "Querétaro, Querétaro",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["residencial", "lujo", "desarrollo"],
    details: {
      bedrooms: 4,
      bathrooms: 4,
      area: 280,
      yearBuilt: 2022,
      amenities: ["alberca", "gimnasio", "seguridad"]
    }
  },
  {
    id: 14,
    name: "Local Comercial en Puebla",
    description: "Local comercial en excelente ubicación en el centro de Puebla.",
    price: 15000,
    location: "Centro, Puebla",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    status: "available",
    type: "rent",
    tags: ["comercial", "centro", "renta"],
    details: {
      area: 120,
      amenities: ["bodega", "oficina", "baño"]
    }
  },
  {
    id: 15,
    name: "Desarrollo Hotelero en Los Cabos",
    description: "Oportunidad de inversión en desarrollo de hotel boutique en Los Cabos.",
    price: 15000000,
    location: "Los Cabos, Baja California Sur",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["hotel", "playa", "inversión"],
    details: {
      area: 800,
      amenities: ["playa", "spa", "restaurante", "alberca"]
    }
  },
  {
    id: 16,
    name: "Departamento en León",
    description: "Moderno departamento en zona residencial de León.",
    price: 6500,
    location: "León, Guanajuato",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["residencial", "moderno", "renta"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      yearBuilt: 2020,
      amenities: ["estacionamiento", "seguridad"]
    }
  },
  {
    id: 17,
    name: "Casa en Cuernavaca",
    description: "Espectacular casa con jardín en Cuernavaca.",
    price: 9500000,
    location: "Cuernavaca, Morelos",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["jardín", "residencial", "venta"],
    details: {
      bedrooms: 3,
      bathrooms: 3,
      area: 250,
      yearBuilt: 2015,
      amenities: ["jardín", "alberca", "terraza"]
    }
  },
  {
    id: 18,
    name: "Desarrollo Industrial en Tijuana",
    description: "Oportunidad de inversión en parque industrial en Tijuana.",
    price: 12000000,
    location: "Tijuana, Baja California",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["industrial", "inversión", "desarrollo"],
    details: {
      area: 1500,
      amenities: ["oficinas", "bodegas", "área de carga"]
    }
  },
  {
    id: 19,
    name: "Casa en Aguascalientes",
    description: "Hermosa casa en desarrollo residencial en Aguascalientes.",
    price: 8500000,
    location: "Aguascalientes, Aguascalientes",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["residencial", "desarrollo", "venta"],
    details: {
      bedrooms: 3,
      bathrooms: 3,
      area: 200,
      yearBuilt: 2021,
      amenities: ["alberca", "área social", "seguridad"]
    }
  },
  {
    id: 20,
    name: "Oficinas en Cancún",
    description: "Espacios de oficinas en zona hotelera de Cancún.",
    price: 18000,
    location: "Zona Hotelera, Cancún",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    status: "available",
    type: "rent",
    tags: ["oficinas", "turismo", "renta"],
    details: {
      area: 200,
      amenities: ["estacionamiento", "seguridad", "aire acondicionado"]
    }
  },
  {
    id: 21,
    name: "Desarrollo Residencial en San Luis Potosí",
    description: "Oportunidad de inversión en desarrollo residencial en San Luis Potosí.",
    price: 6000000,
    location: "San Luis Potosí, SLP",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["residencial", "inversión", "desarrollo"],
    details: {
      area: 180,
      amenities: ["alberca", "gimnasio", "área social"]
    }
  },
  {
    id: 22,
    name: "Casa en Chihuahua",
    description: "Elegante casa en zona residencial de Chihuahua.",
    price: 7500000,
    location: "Chihuahua, Chihuahua",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["residencial", "elegante", "venta"],
    details: {
      bedrooms: 4,
      bathrooms: 4,
      area: 300,
      yearBuilt: 2019,
      amenities: ["jardín", "alberca", "bodega"]
    }
  },
  {
    id: 23,
    name: "Departamento en Hermosillo",
    description: "Moderno departamento en el centro de Hermosillo.",
    price: 5500,
    location: "Centro, Hermosillo",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["centro", "moderno", "renta"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 75,
      yearBuilt: 2020,
      amenities: ["estacionamiento", "seguridad"]
    }
  },
  {
    id: 24,
    name: "Desarrollo Comercial en Veracruz",
    description: "Oportunidad de inversión en desarrollo comercial en Veracruz.",
    price: 20000000,
    location: "Veracruz, Veracruz",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["comercial", "inversión", "desarrollo"],
    details: {
      area: 2000,
      amenities: ["estacionamiento", "oficinas", "área comercial"]
    }
  },
  {
    id: 25,
    name: "Casa en Oaxaca",
    description: "Hermosa casa colonial en el centro histórico de Oaxaca.",
    price: 9500000,
    location: "Centro Histórico, Oaxaca",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["colonial", "histórico", "venta"],
    details: {
      bedrooms: 3,
      bathrooms: 3,
      area: 250,
      yearBuilt: 1900,
      amenities: ["patio", "terraza", "jardín"]
    }
  }
];

// Propiedades internacionales
export const internationalProperties: Property[] = [
  {
    id: 26,
    name: "Apartamento en Manhattan",
    description: "Elegante apartamento en el corazón de Manhattan.",
    price: 15000,
    location: "Manhattan, Nueva York, USA",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["lujo", "centro", "renta"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      yearBuilt: 2015,
      amenities: ["portero", "gimnasio", "terraza"]
    }
  },
  {
    id: 27,
    name: "Villa en Toscana",
    description: "Hermosa villa con viñedos en la Toscana italiana.",
    price: 3500000,
    location: "Toscana, Italia",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["villa", "viñedos", "histórico"],
    details: {
      bedrooms: 6,
      bathrooms: 6,
      area: 600,
      yearBuilt: 1800,
      amenities: ["viñedos", "piscina", "jardín"]
    }
  },
  {
    id: 28,
    name: "Desarrollo en Dubai",
    description: "Oportunidad de inversión en desarrollo de lujo en Dubai.",
    price: 10000000,
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["lujo", "desarrollo", "inversión"],
    details: {
      area: 200,
      amenities: ["playa privada", "spa", "restaurantes"]
    }
  },
  {
    id: 29,
    name: "Apartamento en Londres",
    description: "Elegante apartamento en el centro de Londres.",
    price: 20000,
    location: "Mayfair, Londres, UK",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["lujo", "centro", "renta"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      yearBuilt: 2018,
      amenities: ["portero", "gimnasio", "terraza"]
    }
  },
  {
    id: 30,
    name: "Villa en Bali",
    description: "Lujosa villa con vista al mar en Bali.",
    price: 2800000,
    location: "Ubud, Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["villa", "playa", "lujo"],
    details: {
      bedrooms: 5,
      bathrooms: 5,
      area: 400,
      yearBuilt: 2020,
      amenities: ["piscina", "jardín", "spa"]
    }
  },
  {
    id: 31,
    name: "Desarrollo en Singapur",
    description: "Oportunidad de inversión en desarrollo de lujo en Singapur.",
    price: 15000000,
    location: "Marina Bay, Singapur",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["lujo", "desarrollo", "inversión"],
    details: {
      area: 300,
      amenities: ["gimnasio", "piscina", "restaurantes"]
    }
  },
  {
    id: 32,
    name: "Apartamento en París",
    description: "Encantador apartamento en el corazón de París.",
    price: 12000,
    location: "Le Marais, París, Francia",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["histórico", "centro", "renta"],
    details: {
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      yearBuilt: 1900,
      amenities: ["ascensor", "balcón"]
    }
  },
  {
    id: 33,
    name: "Casa en Sydney",
    description: "Hermosa casa con vista al puerto de Sydney.",
    price: 4500000,
    location: "Bondi Beach, Sydney, Australia",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["playa", "vistas", "lujo"],
    details: {
      bedrooms: 4,
      bathrooms: 4,
      area: 350,
      yearBuilt: 2019,
      amenities: ["piscina", "jardín", "terraza"]
    }
  },
  {
    id: 34,
    name: "Desarrollo en Tokio",
    description: "Oportunidad de inversión en desarrollo residencial en Tokio.",
    price: 25000000,
    location: "Shibuya, Tokio, Japón",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["residencial", "inversión", "desarrollo"],
    details: {
      area: 500,
      amenities: ["gimnasio", "spa", "restaurantes"]
    }
  },
  {
    id: 35,
    name: "Apartamento en Vancouver",
    description: "Moderno apartamento en el centro de Vancouver.",
    price: 10000,
    location: "Downtown, Vancouver, Canadá",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["moderno", "centro", "renta"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 90,
      yearBuilt: 2021,
      amenities: ["gimnasio", "terraza", "estacionamiento"]
    }
  },
  {
    id: 36,
    name: "Villa en Marrakech",
    description: "Exótica villa en el corazón de Marrakech.",
    price: 1800000,
    location: "Medina, Marrakech, Marruecos",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["exótico", "histórico", "venta"],
    details: {
      bedrooms: 6,
      bathrooms: 6,
      area: 450,
      yearBuilt: 1800,
      amenities: ["patio", "piscina", "jardín"]
    }
  },
  {
    id: 37,
    name: "Desarrollo en Miami",
    description: "Oportunidad de inversión en desarrollo de lujo en Miami.",
    price: 30000000,
    location: "South Beach, Miami, USA",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["lujo", "playa", "inversión"],
    details: {
      area: 1000,
      amenities: ["playa privada", "spa", "restaurantes"]
    }
  },
  {
    id: 38,
    name: "Apartamento en Hong Kong",
    description: "Elegante apartamento con vista a la bahía de Hong Kong.",
    price: 25000,
    location: "Central, Hong Kong",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "available",
    type: "rent",
    tags: ["lujo", "vistas", "renta"],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      yearBuilt: 2020,
      amenities: ["portero", "gimnasio", "piscina"]
    }
  },
  {
    id: 39,
    name: "Casa en Cape Town",
    description: "Espectacular casa con vista al océano en Cape Town.",
    price: 2200000,
    location: "Camps Bay, Cape Town, Sudáfrica",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "available",
    type: "sale",
    tags: ["playa", "vistas", "lujo"],
    details: {
      bedrooms: 5,
      bathrooms: 5,
      area: 400,
      yearBuilt: 2018,
      amenities: ["piscina", "jardín", "terraza"]
    }
  },
  {
    id: 40,
    name: "Desarrollo en Berlín",
    description: "Oportunidad de inversión en desarrollo residencial en Berlín.",
    price: 18000000,
    location: "Mitte, Berlín, Alemania",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    status: "funding",
    type: "crowdfunding",
    tags: ["residencial", "inversión", "desarrollo"],
    details: {
      area: 800,
      amenities: ["gimnasio", "spa", "área social"]
    }
  }
];

// Combinar todas las propiedades
export const allProperties = [...demoProperties, ...moreMexicanProperties, ...internationalProperties]; 