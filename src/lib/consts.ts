type CountryPhoneCode = {
  [key: string]: {
    code: string;
    aliases: string[];
  };
};

export const psychologistId = 28;

export const examplePatients = [
  {
    first_name: 'Ana',
    last_name: 'García',
    email: 'ana.garcia@example.com',
    phone: '123456789',
    role: 'patient',
    nationality: 'Española',
    gender: 'female',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Carlos',
    last_name: 'Rodríguez',
    email: 'carlos.rodriguez@example.com',
    phone: '987654321',
    role: 'patient',
    nationality: 'Mexicano',
    gender: 'male',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'María',
    last_name: 'López',
    email: 'maria.lopez@example.com',
    phone: '456789123',
    role: 'patient',
    nationality: 'Argentina',
    gender: 'female',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Juan',
    last_name: 'Martínez',
    email: 'juan.martinez@example.com',
    phone: '789123456',
    role: 'patient',
    nationality: 'Colombiano',
    gender: 'male',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Laura',
    last_name: 'Fernández',
    email: 'laura.fernandez@example.com',
    phone: '321654987',
    role: 'patient',
    nationality: 'Chilena',
    gender: 'female',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Pedro',
    last_name: 'Sánchez',
    email: 'pedro.sanchez@example.com',
    phone: '654987321',
    role: 'patient',
    nationality: 'Peruano',
    gender: 'male',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Sofía',
    last_name: 'Gómez',
    email: 'sofia.gomez@example.com',
    phone: '147258369',
    role: 'patient',
    nationality: 'Uruguaya',
    gender: 'female',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Diego',
    last_name: 'Torres',
    email: 'diego.torres@example.com',
    phone: '369258147',
    role: 'patient',
    nationality: 'Ecuatoriano',
    gender: 'male',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Valentina',
    last_name: 'Ruiz',
    email: 'valentina.ruiz@example.com',
    phone: '258369147',
    role: 'patient',
    nationality: 'Venezolana',
    gender: 'female',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
  {
    first_name: 'Javier',
    last_name: 'Herrera',
    email: 'javier.herrera@example.com',
    phone: '963852741',
    role: 'patient',
    nationality: 'Boliviano',
    gender: 'male',
    birth_day: new Date(new Date().getFullYear() - (18 + Math.floor(Math.random() * 50)), new Date().getMonth(), new Date().getDate()).toISOString()
  },
];

export const countryPhoneCodes: CountryPhoneCode = {
  // América del Norte
  'united states': {
    code: '+1',
    aliases: ['usa', 'us', 'estados unidos', 'eeuu', 'american', 'americano', 'americana', 'estadounidense']
  },
  'canada': {
    code: '+1',
    aliases: ['ca', 'can', 'canadá', 'canadian', 'canadiense']
  },
  'mexico': {
    code: '+52',
    aliases: ['mx', 'mex', 'méxico', 'mexican', 'mexicano', 'mexicana']
  },

  // América Central
  'costa rica': {
    code: '+506',
    aliases: ['cr', 'cri', 'costarricense', 'costa rican']
  },
  'el salvador': {
    code: '+503',
    aliases: ['sv', 'slv', 'salvadoreño', 'salvadoreña', 'salvadorian']
  },
  'guatemala': {
    code: '+502',
    aliases: ['gt', 'gtm', 'guatemalteco', 'guatemalteca', 'guatemalan']
  },
  'honduras': {
    code: '+504',
    aliases: ['hn', 'hnd', 'hondureño', 'hondureña', 'honduran']
  },
  'nicaragua': {
    code: '+505',
    aliases: ['ni', 'nic', 'nicaragüense', 'nicaraguan']
  },
  'panama': {
    code: '+507',
    aliases: ['pa', 'pan', 'panamá', 'panameño', 'panameña', 'panamanian']
  },

  // América del Sur
  'argentina': {
    code: '+54',
    aliases: ['ar', 'arg', 'argentino', 'argentina', 'argentinian']
  },
  'bolivia': {
    code: '+591',
    aliases: ['bo', 'bol', 'boliviano', 'boliviana', 'bolivian']
  },
  'brazil': {
    code: '+55',
    aliases: ['br', 'bra', 'brasil', 'brasileño', 'brasileña', 'brazilian']
  },
  'chile': {
    code: '+56',
    aliases: ['cl', 'chl', 'chileno', 'chilena', 'chilean']
  },
  'colombia': {
    code: '+57',
    aliases: ['co', 'col', 'colombiano', 'colombiana', 'colombian']
  },
  'ecuador': {
    code: '+593',
    aliases: ['ec', 'ecu', 'ecuatoriano', 'ecuatoriana', 'ecuadorian']
  },
  'paraguay': {
    code: '+595',
    aliases: ['py', 'pry', 'paraguayo', 'paraguaya', 'paraguayan']
  },
  'peru': {
    code: '+51',
    aliases: ['pe', 'per', 'perú', 'peruano', 'peruana', 'peruvian']
  },
  'uruguay': {
    code: '+598',
    aliases: ['uy', 'ury', 'uruguayo', 'uruguaya', 'uruguayan']
  },
  'venezuela': {
    code: '+58',
    aliases: ['ve', 'ven', 'venezolano', 'venezolana', 'venezuelan']
  },

  // Europa
  'spain': {
    code: '+34',
    aliases: ['es', 'esp', 'españa', 'español', 'española', 'spanish', 'spaniard']
  },
  'france': {
    code: '+33',
    aliases: ['fr', 'fra', 'francia', 'francés', 'francesa', 'french']
  },
  'germany': {
    code: '+49',
    aliases: ['de', 'deu', 'alemania', 'alemán', 'alemana', 'german']
  },
  'italy': {
    code: '+39',
    aliases: ['it', 'ita', 'italia', 'italiano', 'italiana', 'italian']
  },
  'united kingdom': {
    code: '+44',
    aliases: ['uk', 'gbr', 'reino unido', 'gran bretaña', 'británico', 'británica', 'british', 'english']
  },
  'portugal': {
    code: '+351',
    aliases: ['pt', 'prt', 'portugués', 'portuguesa', 'portuguese']
  },
  'netherlands': {
    code: '+31',
    aliases: ['nl', 'nld', 'países bajos', 'holanda', 'holandés', 'holandesa', 'dutch', 'nederlander']
  },

  // Asia-Pacífico
  'japan': {
    code: '+81',
    aliases: ['jp', 'jpn', 'japón', 'japonés', 'japonesa', 'japanese']
  },
  'south korea': {
    code: '+82',
    aliases: ['kr', 'kor', 'corea del sur', 'coreano', 'coreana', 'korean']
  },
  'australia': {
    code: '+61',
    aliases: ['au', 'aus', 'australiano', 'australiana', 'australian']
  },
  'new zealand': {
    code: '+64',
    aliases: ['nz', 'nzl', 'nueva zelanda', 'neozelandés', 'neozelandesa', 'new zealander', 'kiwi']
  }
};