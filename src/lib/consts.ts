type State = {
  name: string;
  cities: string[];
}

type CountryPhoneCode = {
  name: string;
  code: string;
  aliases: string[];
  states: State[];
};

export const DAYS = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM']
export const DAYS_FULL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
export const MONTHS = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']

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

export const countryPhoneCodes: CountryPhoneCode[] = [
  // América del Norte
  {
    name: 'united states',
    code: '+1',
    aliases: ['usa', 'us', 'estados unidos', 'eeuu', 'american', 'americano', 'americana', 'estadounidense'],
    states: [
      {
        name: 'alabama',
        cities: ['Birmingham', 'Montgomery', 'Huntsville', 'Mobile', 'Tuscaloosa', 'Hoover', 'Dothan', 'Decatur', 'Auburn', 'Madison']
      },
      {
        name: 'alaska',
        cities: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan', 'Wasilla', 'Kenai', 'Kodiak', 'Bethel', 'Palmer']
      },
      {
        name: 'arizona',
        cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe', 'Peoria', 'Surprise']
      },
      {
        name: 'arkansas',
        cities: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'North Little Rock', 'Conway', 'Rogers', 'Bentonville', 'Pine Bluff']
      },
      {
        name: 'california',
        cities: ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim']
      },
      {
        name: 'colorado',
        cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Centennial']
      },
      {
        name: 'connecticut',
        cities: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'West Hartford', 'Greenwich']
      },
      {
        name: 'delaware',
        cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Elsmere', 'New Castle']
      },
      {
        name: 'florida',
        cities: ['Miami', 'Jacksonville', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral']
      },
      {
        name: 'georgia',
        cities: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs', 'South Fulton', 'Roswell', 'Johns Creek']
      },
      {
        name: 'hawaii',
        cities: ['Honolulu', 'Hilo', 'Kailua', 'Kaneohe', 'Waipahu', 'Pearl City', 'Mililani Town', 'Ewa Gentry', 'Kihei', 'Makakilo']
      },
      {
        name: 'idaho',
        cities: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Caldwell', 'Pocatello', 'Coeur d\'Alene', 'Twin Falls', 'Lewiston', 'Rexburg']
      },
      {
        name: 'illinois',
        cities: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield', 'Elgin', 'Peoria', 'Champaign', 'Waukegan']
      },
      {
        name: 'indiana',
        cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Fishers', 'Bloomington', 'Hammond', 'Gary', 'Muncie']
      },
      {
        name: 'iowa',
        cities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo', 'Ames', 'West Des Moines', 'Dubuque', 'Ankeny']
      },
      {
        name: 'kansas',
        cities: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka', 'Lawrence', 'Shawnee', 'Manhattan', 'Lenexa', 'Salina']
      },
      {
        name: 'kentucky',
        cities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington', 'Richmond', 'Georgetown', 'Florence', 'Hopkinsville', 'Nicholasville']
      },
      {
        name: 'louisiana',
        cities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Kenner', 'Bossier City', 'Monroe', 'Alexandria', 'Houma']
      },
      {
        name: 'maine',
        cities: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Saco', 'Westbrook', 'Augusta']
      },
      {
        name: 'maryland',
        cities: ['Baltimore', 'Columbia', 'Germantown', 'Silver Spring', 'Waldorf', 'Glen Burnie', 'Frederick', 'Ellicott City', 'Dundalk', 'Rockville']
      },
      {
        name: 'massachusetts',
        cities: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford', 'Brockton', 'Quincy', 'Lynn', 'Fall River']
      },
      {
        name: 'michigan',
        cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor', 'Lansing', 'Flint', 'Dearborn', 'Livonia', 'Troy']
      },
      {
        name: 'minnesota',
        cities: ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'Woodbury', 'Maple Grove', 'Eagan']
      },
      {
        name: 'mississippi',
        cities: ['Jackson', 'Gulfport', 'Southaven', 'Biloxi', 'Hattiesburg', 'Olive Branch', 'Tupelo', 'Meridian', 'Greenville', 'Horn Lake']
      },
      {
        name: 'missouri',
        cities: ['Kansas City', 'Saint Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'Saint Joseph', 'Saint Charles', 'Blue Springs']
      },
      {
        name: 'montana',
        cities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte', 'Helena', 'Kalispell', 'Havre', 'Anaconda', 'Miles City']
      },
      {
        name: 'nebraska',
        cities: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings', 'North Platte', 'Norfolk', 'Columbus']
      },
      {
        name: 'nevada',
        cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks', 'Carson City', 'Elko', 'Fernley', 'Mesquite', 'Boulder City']
      },
      {
        name: 'new hampshire',
        cities: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover', 'Rochester', 'Salem', 'Merrimack', 'Hudson', 'Londonderry']
      },
      {
        name: 'new jersey',
        cities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Lakewood', 'Edison', 'Woodbridge', 'Toms River', 'Hamilton', 'Trenton']
      },
      {
        name: 'new mexico',
        cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell', 'Farmington', 'Clovis', 'Hobbs', 'Alamogordo', 'Carlsbad']
      },
      {
        name: 'new york',
        cities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica']
      },
      {
        name: 'north carolina',
        cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Concord']
      },
      {
        name: 'north dakota',
        cities: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo', 'Williston', 'Mandan', 'Dickinson', 'Jamestown', 'Watford City']
      },
      {
        name: 'ohio',
        cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Youngstown', 'Lorain']
      },
      {
        name: 'oklahoma',
        cities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid', 'Stillwater']
      },
      {
        name: 'oregon',
        cities: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend', 'Medford', 'Springfield', 'Corvallis']
      },
      {
        name: 'pennsylvania',
        cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg', 'York']
      },
      {
        name: 'rhode island',
        cities: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Coventry', 'Cumberland', 'North Providence', 'West Warwick']
      },
      {
        name: 'south carolina',
        cities: ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville', 'Summerville', 'Sumter', 'Hilton Head Island', 'Florence']
      },
      {
        name: 'south dakota',
        cities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton', 'Huron', 'Vermillion', 'Pierre']
      },
      {
        name: 'tennessee',
        cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City', 'Bartlett']
      },
      {
        name: 'texas',
        cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo']
      },
      {
        name: 'utah',
        cities: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'St. George', 'Ogden', 'Layton', 'South Jordan']
      },
      {
        name: 'vermont',
        cities: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier', 'St. Albans', 'Winooski', 'Newport', 'Vergennes', 'Middlebury']
      },
      {
        name: 'virginia',
        cities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke', 'Portsmouth', 'Lynchburg']
      },
      {
        name: 'washington',
        cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett', 'Renton', 'Spokane Valley', 'Federal Way']
      },
      {
        name: 'west virginia',
        cities: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Weirton', 'Fairmont', 'Martinsburg', 'Beckley', 'Clarksburg']
      },
      {
        name: 'wisconsin',
        cities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Eau Claire', 'Oshkosh', 'Janesville']
      },
      {
        name: 'wyoming',
        cities: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River', 'Evanston', 'Riverton', 'Cody']
      }
    ]
  },
  {
    name: 'canada',
    code: '+1',
    aliases: ['ca', 'can', 'canadiense', 'canadian'],
    states: [
      {
        name: 'alberta',
        cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Wood Buffalo']
      },
      {
        name: 'british columbia',
        cities: ['Vancouver', 'Victoria', 'Kelowna', 'Abbotsford', 'Nanaimo']
      },
      {
        name: 'manitoba',
        cities: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie']
      },
      {
        name: 'new brunswick',
        cities: ['Fredericton', 'Saint John', 'Moncton', 'Dieppe', 'Miramichi']
      },
      {
        name: 'newfoundland and labrador',
        cities: ['St. John\'s', 'Mount Pearl', 'Corner Brook', 'Conception Bay South', 'Grand Falls-Windsor']
      },
      {
        name: 'nova scotia',
        cities: ['Halifax', 'Dartmouth', 'Sydney', 'Truro', 'New Glasgow']
      },
      {
        name: 'ontario',
        cities: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London']
      },
      {
        name: 'prince edward island',
        cities: ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague']
      },
      {
        name: 'quebec',
        cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil']
      },
      {
        name: 'saskatchewan',
        cities: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current']
      },
      {
        name: 'northwest territories',
        cities: ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith', 'Behchokǫ̀']
      },
      {
        name: 'nunavut',
        cities: ['Iqaluit', 'Rankin Inlet', 'Arviat', 'Baker Lake', 'Cambridge Bay']
      },
      {
        name: 'yukon',
        cities: ['Whitehorse', 'Dawson City', 'Watson Lake', 'Haines Junction', 'Mayo']
      }
    ]
  },
  {
    name: 'mexico',
    code: '+52',
    aliases: ['mx', 'mex', 'méxico', 'mexican', 'mexicano', 'mexicana'],
    states: [
      {
        name: 'aguascalientes',
        cities: ['Aguascalientes', 'Jesús María', 'Calvillo', 'Rincón de Romos', 'Pabellón de Arteaga']
      },
      {
        name: 'baja california',
        cities: ['Tijuana', 'Mexicali', 'Ensenada', 'Rosarito', 'Tecate']
      },
      {
        name: 'baja california sur',
        cities: ['La Paz', 'San José del Cabo', 'Cabo San Lucas', 'Ciudad Constitución', 'Loreto']
      },
      {
        name: 'campeche',
        cities: ['Campeche', 'Ciudad del Carmen', 'Champotón', 'Escárcega', 'Calkiní']
      },
      {
        name: 'chiapas',
        cities: ['Tuxtla Gutiérrez', 'Tapachula', 'San Cristóbal de las Casas', 'Comitán', 'Chiapa de Corzo']
      },
      {
        name: 'chihuahua',
        cities: ['Ciudad Juárez', 'Chihuahua', 'Delicias', 'Hidalgo del Parral', 'Cuauhtémoc']
      },
      {
        name: 'coahuila',
        cities: ['Saltillo', 'Torreón', 'Monclova', 'Piedras Negras', 'Acuña']
      },
      {
        name: 'colima',
        cities: ['Colima', 'Manzanillo', 'Tecomán', 'Villa de Álvarez', 'Armería']
      },
      {
        name: 'durango',
        cities: ['Durango', 'Gómez Palacio', 'Lerdo', 'Santiago Papasquiaro', 'El Salto']
      },
      {
        name: 'estado de méxico',
        cities: ['Ecatepec', 'Nezahualcóyotl', 'Toluca', 'Naucalpan', 'Tlalnepantla']
      },
      {
        name: 'guanajuato',
        cities: ['León', 'Irapuato', 'Celaya', 'Salamanca', 'Guanajuato']
      },
      {
        name: 'guerrero',
        cities: ['Acapulco', 'Chilpancingo', 'Iguala', 'Taxco', 'Zihuatanejo']
      },
      {
        name: 'hidalgo',
        cities: ['Pachuca', 'Tulancingo', 'Tula', 'Huejutla', 'Tizayuca']
      },
      {
        name: 'jalisco',
        cities: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Puerto Vallarta']
      },
      {
        name: 'michoacán',
        cities: ['Morelia', 'Uruapan', 'Zamora', 'Apatzingán', 'Lázaro Cárdenas']
      },
      {
        name: 'morelos',
        cities: ['Cuernavaca', 'Jiutepec', 'Cuautla', 'Temixco', 'Yautepec']
      },
      {
        name: 'nayarit',
        cities: ['Tepic', 'Xalisco', 'Santiago Ixcuintla', 'Tecuala', 'Acaponeta']
      },
      {
        name: 'nuevo león',
        cities: ['Monterrey', 'Guadalupe', 'San Nicolás de los Garza', 'Apodaca', 'General Escobedo']
      },
      {
        name: 'oaxaca',
        cities: ['Oaxaca', 'Salina Cruz', 'Juchitán', 'Tuxtepec', 'Huajuapan de León']
      },
      {
        name: 'puebla',
        cities: ['Puebla', 'Tehuacán', 'San Martín Texmelucan', 'Atlixco', 'Amozoc']
      },
      {
        name: 'querétaro',
        cities: ['Querétaro', 'San Juan del Río', 'Corregidora', 'El Marqués', 'Tequisquiapan']
      },
      {
        name: 'quintana roo',
        cities: ['Cancún', 'Chetumal', 'Playa del Carmen', 'Cozumel', 'Tulum']
      },
      {
        name: 'san luis potosí',
        cities: ['San Luis Potosí', 'Soledad de Graciano Sánchez', 'Ciudad Valles', 'Matehuala', 'Rioverde']
      },
      {
        name: 'sinaloa',
        cities: ['Culiacán', 'Mazatlán', 'Los Mochis', 'Guasave', 'Guamúchil']
      },
      {
        name: 'sonora',
        cities: ['Hermosillo', 'Ciudad Obregón', 'Nogales', 'San Luis Río Colorado', 'Navojoa']
      },
      {
        name: 'tabasco',
        cities: ['Villahermosa', 'Cárdenas', 'Comalcalco', 'Huimanguillo', 'Macuspana']
      },
      {
        name: 'tamaulipas',
        cities: ['Reynosa', 'Matamoros', 'Nuevo Laredo', 'Ciudad Victoria', 'Tampico']
      },
      {
        name: 'tlaxcala',
        cities: ['Tlaxcala', 'Huamantla', 'Apizaco', 'Chiautempan', 'Calpulalpan']
      },
      {
        name: 'veracruz',
        cities: ['Veracruz', 'Xalapa', 'Coatzacoalcos', 'Córdoba', 'Poza Rica']
      },
      {
        name: 'yucatán',
        cities: ['Mérida', 'Valladolid', 'Tizimín', 'Progreso', 'Kanasín']
      },
      {
        name: 'zacatecas',
        cities: ['Zacatecas', 'Fresnillo', 'Guadalupe', 'Jerez', 'Pinos']
      }
    ]
  },

  // América Central
  {
    name: 'costa rica',
    code: '+506',
    aliases: ['cr', 'cri', 'costarricense', 'costa rican'],
    states: [
      {
        name: 'san josé',
        cities: ['San José', 'Escazú', 'Desamparados', 'Puriscal', 'Tarrazú']
      },
      {
        name: 'alajuela',
        cities: ['Alajuela', 'San Ramón', 'Grecia', 'Atenas', 'Naranjo']
      },
      {
        name: 'cartago',
        cities: ['Cartago', 'Paraíso', 'La Unión', 'Jiménez', 'Turrialba']
      },
      {
        name: 'heredia',
        cities: ['Heredia', 'Barva', 'Santo Domingo', 'Santa Bárbara', 'San Rafael']
      },
      {
        name: 'guanacaste',
        cities: ['Liberia', 'Nicoya', 'Santa Cruz', 'Bagaces', 'Cañas']
      },
      {
        name: 'puntarenas',
        cities: ['Puntarenas', 'Esparza', 'Buenos Aires', 'Montes de Oro', 'Osa']
      },
      {
        name: 'limón',
        cities: ['Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina']
      }
    ]
  },
  {
    name: 'el salvador',
    code: '+503',
    aliases: ['sv', 'slv', 'salvadoreño', 'salvadoreña', 'salvadorian'],
    states: [
      {
        name: 'ahuachapán',
        cities: ['Ahuachapán', 'Atiquizaya', 'Concepción de Ataco', 'Guaymango']
      },
      {
        name: 'cabañas',
        cities: ['Sensuntepeque', 'Ilobasco', 'San Isidro', 'Victoria']
      },
      {
        name: 'chalatenango',
        cities: ['Chalatenango', 'Nueva Concepción', 'La Palma', 'Tejutla']
      },
      {
        name: 'cuscatlán',
        cities: ['Cojutepeque', 'Suchitoto', 'San Pedro Perulapán', 'San Rafael Cedros']
      },
      {
        name: 'la libertad',
        cities: ['Santa Tecla', 'Colón', 'Antiguo Cuscatlán', 'Zaragoza']
      },
      {
        name: 'la paz',
        cities: ['Zacatecoluca', 'Santiago Nonualco', 'San Luis Talpa', 'Olocuilta']
      },
      {
        name: 'la unión',
        cities: ['La Unión', 'Santa Rosa de Lima', 'Conchagua', 'Intipucá']
      },
      {
        name: 'morazán',
        cities: ['San Francisco Gotera', 'Jocoro', 'Guatajiagua', 'Sociedad']
      },
      {
        name: 'san miguel',
        cities: ['San Miguel', 'Ciudad Barrios', 'Moncagua', 'Chinameca']
      },
      {
        name: 'san salvador',
        cities: ['San Salvador', 'Soyapango', 'Mejicanos', 'Apopa', 'Santa Tecla']
      },
      {
        name: 'san vicente',
        cities: ['San Vicente', 'Tecoluca', 'Apastepeque', 'Guadalupe']
      },
      {
        name: 'santa ana',
        cities: ['Santa Ana', 'Metapán', 'Chalchuapa', 'Coatepeque']
      },
      {
        name: 'sonsonate',
        cities: ['Sonsonate', 'Izalco', 'Acajutla', 'Nahuizalco']
      },
      {
        name: 'usulután',
        cities: ['Usulután', 'Jiquilisco', 'Santiago de María', 'Berlín']
      }
    ]
  },
  {
    name: 'guatemala',
    code: '+502',
    aliases: ['gt', 'gtm', 'guatemalteco', 'guatemalteca', 'guatemalan'],
    states: [
      {
        name: 'alta verapaz',
        cities: ['Cobán', 'San Pedro Carchá', 'San Juan Chamelco', 'Tactic']
      },
      {
        name: 'baja verapaz',
        cities: ['Salamá', 'San Miguel Chicaj', 'Rabinal', 'Cubulco']
      },
      {
        name: 'chimaltenango',
        cities: ['Chimaltenango', 'Tecpán Guatemala', 'Patzún', 'Patzicía']
      },
      {
        name: 'chiquimula',
        cities: ['Chiquimula', 'Esquipulas', 'Jocotán', 'Camotán']
      },
      {
        name: 'el progreso',
        cities: ['Guastatoya', 'San Agustín Acasaguastlán', 'Morazán', 'Sanarate']
      },
      {
        name: 'escuintla',
        cities: ['Escuintla', 'Santa Lucía Cotzumalguapa', 'Palín', 'Tiquisate']
      },
      {
        name: 'guatemala',
        cities: ['Guatemala City', 'Mixco', 'Villa Nueva', 'Petapa', 'Amatitlán']
      },
      {
        name: 'huehuetenango',
        cities: ['Huehuetenango', 'Chiantla', 'Malacatancito', 'Cuilco']
      },
      {
        name: 'izabal',
        cities: ['Puerto Barrios', 'Livingston', 'El Estor', 'Morales']
      },
      {
        name: 'jalapa',
        cities: ['Jalapa', 'San Pedro Pinula', 'San Luis Jilotepeque', 'Monjas']
      },
      {
        name: 'jutiapa',
        cities: ['Jutiapa', 'Asunción Mita', 'El Progreso', 'Jalpatagua']
      },
      {
        name: 'petén',
        cities: ['Flores', 'San Benito', 'La Libertad', 'Poptún']
      },
      {
        name: 'quetzaltenango',
        cities: ['Quetzaltenango', 'Coatepeque', 'Colomba', 'Cantel']
      },
      {
        name: 'quiché',
        cities: ['Santa Cruz del Quiché', 'Chichicastenango', 'Nebaj', 'Joyabaj']
      },
      {
        name: 'retalhuleu',
        cities: ['Retalhuleu', 'San Sebastián', 'Santa Cruz Muluá', 'Champerico']
      },
      {
        name: 'sacatepéquez',
        cities: ['Antigua Guatemala', 'Ciudad Vieja', 'Santa María de Jesús', 'Jocotenango']
      },
      {
        name: 'san marcos',
        cities: ['San Marcos', 'Malacatán', 'Ocós', 'Tacaná']
      },
      {
        name: 'santa rosa',
        cities: ['Cuilapa', 'Chiquimulilla', 'Barberena', 'Guazacapán']
      },
      {
        name: 'sololá',
        cities: ['Sololá', 'Panajachel', 'Santiago Atitlán', 'San Lucas Tolimán']
      },
      {
        name: 'suchitepéquez',
        cities: ['Mazatenango', 'Chicacao', 'Cuyotenango', 'San Antonio Suchitepéquez']
      },
      {
        name: 'totonicapán',
        cities: ['Totonicapán', 'San Cristóbal Totonicapán', 'San Francisco El Alto', 'Momostenango']
      },
      {
        name: 'zacapa',
        cities: ['Zacapa', 'Gualán', 'Río Hondo', 'Teculután']
      }
    ]
  },
  {
    name: 'honduras',
    code: '+504',
    aliases: ['hn', 'hnd', 'hondureño', 'hondureña', 'honduran'],
    states: [
      {
        name: 'atlántida',
        cities: ['La Ceiba', 'Tela', 'El Porvenir', 'Jutiapa']
      },
      {
        name: 'choluteca',
        cities: ['Choluteca', 'San Marcos de Colón', 'Pespire', 'El Triunfo']
      },
      {
        name: 'colón',
        cities: ['Trujillo', 'Tocoa', 'Sonaguera', 'Bonito Oriental']
      },
      {
        name: 'comayagua',
        cities: ['Comayagua', 'Siguatepeque', 'Taulabé', 'La Libertad']
      },
      {
        name: 'copán',
        cities: ['Santa Rosa de Copán', 'La Entrada', 'Copán Ruinas', 'Florida']
      },
      {
        name: 'cortés',
        cities: ['San Pedro Sula', 'Puerto Cortés', 'Choloma', 'La Lima', 'Villanueva']
      },
      {
        name: 'el paraíso',
        cities: ['Yuscarán', 'Danlí', 'El Paraíso', 'Trojes']
      },
      {
        name: 'francisco morazán',
        cities: ['Tegucigalpa', 'Comayagüela', 'Talanga', 'Valle de Ángeles']
      },
      {
        name: 'gracias a dios',
        cities: ['Puerto Lempira', 'Brus Laguna', 'Ahuas', 'Wampusirpi']
      },
      {
        name: 'intibucá',
        cities: ['La Esperanza', 'Intibucá', 'Jesús de Otoro', 'San Francisco de Opalaca']
      },
      {
        name: 'islas de la bahía',
        cities: ['Roatán', 'Guanaja', 'Utila', 'José Santos Guardiola']
      },
      {
        name: 'la paz',
        cities: ['La Paz', 'Marcala', 'Cane', 'San Pedro de Tutule']
      },
      {
        name: 'lempira',
        cities: ['Gracias', 'La Campa', 'Lepaera', 'Erandique']
      },
      {
        name: 'ocotepeque',
        cities: ['Ocotepeque', 'Sinuapa', 'Concepción', 'Santa Fe']
      },
      {
        name: 'olancho',
        cities: ['Juticalpa', 'Catacamas', 'Campamento', 'San Francisco de La Paz']
      },
      {
        name: 'santa bárbara',
        cities: ['Santa Bárbara', 'Trinidad', 'Ilama', 'Quimistán']
      },
      {
        name: 'valle',
        cities: ['Nacaome', 'San Lorenzo', 'Langue', 'Amapala']
      },
      {
        name: 'yoro',
        cities: ['Yoro', 'El Progreso', 'Olanchito', 'Morazán']
      }
    ]
  },
  {
    name: 'panama',
    code: '+507',
    aliases: ['pa', 'pan', 'panamá', 'panameño', 'panameña', 'panamanian'],
    states: [
      {
        name: 'bocas del toro',
        cities: ['Bocas del Toro', 'Changuinola', 'Chiriquí Grande', 'Almirante']
      },
      {
        name: 'chiriquí',
        cities: ['David', 'Barú', 'Bugaba', 'Alanje', 'Boquerón']
      },
      {
        name: 'coclé',
        cities: ['Penonomé', 'Aguadulce', 'Natá', 'La Pintada', 'Antón']
      },
      {
        name: 'colón',
        cities: ['Colón', 'Portobelo', 'Nombre de Dios', 'Santa Isabel']
      },
      {
        name: 'darién',
        cities: ['La Palma', 'Metetí', 'Yaviza', 'El Real de Santa María']
      },
      {
        name: 'herrera',
        cities: ['Chitré', 'Las Minas', 'Los Pozos', 'Ocú', 'Parita']
      },
      {
        name: 'los santos',
        cities: ['Las Tablas', 'Guararé', 'Macaracas', 'Pedasí', 'Pocrí']
      },
      {
        name: 'panamá',
        cities: ['Panamá', 'San Miguelito', 'Arraiján', 'La Chorrera', 'Pacora']
      },
      {
        name: 'panamá oeste',
        cities: ['La Chorrera', 'Arraiján', 'Capira', 'Chame', 'San Carlos']
      },
      {
        name: 'veraguas',
        cities: ['Santiago', 'Soná', 'Atalaya', 'Calobre', 'Las Palmas']
      },
      {
        name: 'emberá-wounaan',
        cities: ['Unión Chocó', 'Lajas Blancas', 'Manuel Ortega']
      },
      {
        name: 'guna yala',
        cities: ['El Porvenir', 'Narganá', 'Ailigandí', 'Tubualá']
      },
      {
        name: 'ngäbe-buglé',
        cities: ['Chichica', 'Hato Pilón', 'Quebrada de Oro', 'Kankintú']
      }
    ]
  },
  {
    name: 'nicaragua',
    code: '+505',
    aliases: ['ni', 'nic', 'nicaragüense', 'nicaraguan'],
    states: [
      {
        name: 'boaco',
        cities: ['Boaco', 'Camoapa', 'San Lorenzo', 'Teustepe']
      },
      {
        name: 'carazo',
        cities: ['Jinotepe', 'Diriamba', 'San Marcos', 'Santa Teresa']
      },
      {
        name: 'chinandega',
        cities: ['Chinandega', 'El Viejo', 'Chichigalpa', 'Corinto']
      },
      {
        name: 'chontales',
        cities: ['Juigalpa', 'Santo Tomás', 'Acoyapa', 'La Libertad']
      },
      {
        name: 'estelí',
        cities: ['Estelí', 'Condega', 'Pueblo Nuevo', 'La Trinidad']
      },
      {
        name: 'granada',
        cities: ['Granada', 'Nandaime', 'Diriomo', 'Diriá']
      },
      {
        name: 'jinotega',
        cities: ['Jinotega', 'San Rafael del Norte', 'La Concordia', 'San Sebastián de Yalí']
      },
      {
        name: 'león',
        cities: ['León', 'Nagarote', 'La Paz Centro', 'Telica']
      },
      {
        name: 'madriz',
        cities: ['Somoto', 'Palacagüina', 'Las Sabanas', 'San Lucas']
      },
      {
        name: 'managua',
        cities: ['Managua', 'Ciudad Sandino', 'Tipitapa', 'El Crucero', 'Ticuantepe']
      },
      {
        name: 'masaya',
        cities: ['Masaya', 'Nindirí', 'La Concepción', 'Masatepe']
      },
      {
        name: 'matagalpa',
        cities: ['Matagalpa', 'Sébaco', 'Ciudad Darío', 'San Ramón']
      },
      {
        name: 'nueva segovia',
        cities: ['Ocotal', 'Jalapa', 'El Jícaro', 'Quilalí']
      },
      {
        name: 'río san juan',
        cities: ['San Carlos', 'El Castillo', 'San Miguelito', 'Morrito']
      },
      {
        name: 'rivas',
        cities: ['Rivas', 'San Juan del Sur', 'Tola', 'Moyogalpa']
      },
      {
        name: 'región autónoma de la costa caribe norte',
        cities: ['Bilwi', 'Siuna', 'Waspán', 'Bonanza']
      },
      {
        name: 'región autónoma de la costa caribe sur',
        cities: ['Bluefields', 'Nueva Guinea', 'El Rama', 'Corn Island']
      }
    ]
  },

  // América del Sur
  {
    name: 'argentina',
    code: '+54',
    aliases: ['ar', 'arg', 'argentino', 'argentina', 'argentinian'],
    states: [
      {
        name: 'buenos aires',
        cities: ['La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Luján']
      },
      {
        name: 'catamarca',
        cities: ['San Fernando del Valle de Catamarca', 'Belén', 'Tinogasta', 'Andalgalá', 'Santa María']
      },
      {
        name: 'chaco',
        cities: ['Resistencia', 'Presidencia Roque Sáenz Peña', 'Villa Ángela', 'Charata', 'Juan José Castelli']
      },
      {
        name: 'chubut',
        cities: ['Rawson', 'Comodoro Rivadavia', 'Trelew', 'Puerto Madryn', 'Esquel']
      },
      {
        name: 'cordoba',
        cities: ['Córdoba', 'Villa Carlos Paz', 'Río Cuarto', 'Villa María', 'Alta Gracia']
      },
      {
        name: 'corrientes',
        cities: ['Corrientes', 'Goya', 'Mercedes', 'Paso de los Libres', 'Curuzú Cuatiá']
      },
      {
        name: 'entre ríos',
        cities: ['Paraná', 'Concordia', 'Gualeguaychú', 'Gualeguay', 'Victoria']
      },
      {
        name: 'formosa',
        cities: ['Formosa', 'Clorinda', 'Pirané', 'El Colorado', 'Ingeniero Juárez']
      },
      {
        name: 'jujuy',
        cities: ['San Salvador de Jujuy', 'Palpalá', 'Perico', 'Libertador General San Martín', 'La Quiaca']
      },
      {
        name: 'la pampa',
        cities: ['Santa Rosa', 'General Pico', 'Toay', 'Victorica', 'General Acha']
      },
      {
        name: 'la rioja',
        cities: ['La Rioja', 'Chilecito', 'Aimogasta', 'Chamical', 'Chepes']
      },
      {
        name: 'mendoza',
        cities: ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Las Heras', 'Luján de Cuyo']
      },
      {
        name: 'misiones',
        cities: ['Posadas', 'Oberá', 'Eldorado', 'Puerto Iguazú', 'Apóstoles']
      },
      {
        name: 'neuquén',
        cities: ['Neuquén', 'San Martín de los Andes', 'Plottier', 'Zapala', 'Centenario']
      },
      {
        name: 'río negro',
        cities: ['Viedma', 'San Carlos de Bariloche', 'General Roca', 'Cipolletti', 'Villa Regina']
      },
      {
        name: 'salta',
        cities: ['Salta', 'Orán', 'Tartagal', 'Rosario de la Frontera', 'Cafayate']
      },
      {
        name: 'san juan',
        cities: ['San Juan', 'Rivadavia', 'Santa Lucía', 'Pocito', 'Chimbas']
      },
      {
        name: 'san luis',
        cities: ['San Luis', 'Villa Mercedes', 'La Punta', 'Justo Daract', 'Merlo']
      },
      {
        name: 'santa cruz',
        cities: ['Río Gallegos', 'Caleta Olivia', 'El Calafate', 'Pico Truncado', 'Puerto Deseado']
      },
      {
        name: 'santa fe',
        cities: ['Santa Fe', 'Rosario', 'Rafaela', 'Venado Tuerto', 'Reconquista']
      },
      {
        name: 'santiago del estero',
        cities: ['Santiago del Estero', 'La Banda', 'Termas de Río Hondo', 'Añatuya', 'Quimilí']
      },
      {
        name: 'tierra del fuego',
        cities: ['Ushuaia', 'Río Grande', 'Tolhuin']
      },
      {
        name: 'tucumán',
        cities: ['San Miguel de Tucumán', 'Tafí Viejo', 'Yerba Buena', 'Concepción', 'Banda del Río Salí']
      }
    ]
  },
  {
    name: 'bolivia',
    code: '+591',
    aliases: ['bo', 'bol', 'boliviano', 'boliviana', 'bolivian'],
    states: [
      {
        name: 'la paz',
        cities: ['La Paz', 'El Alto', 'Viacha', 'Achacachi', 'Copacabana']
      },
      {
        name: 'santa cruz',
        cities: ['Santa Cruz de la Sierra', 'Montero', 'Warnes', 'La Guardia', 'Cotoca']
      },
      {
        name: 'cochabamba',
        cities: ['Cochabamba', 'Sacaba', 'Quillacollo', 'Tiquipaya', 'Colcapirhua']
      },
      {
        name: 'potosí',
        cities: ['Potosí', 'Llallagua', 'Villazón', 'Tupiza', 'Uyuni']
      },
      {
        name: 'oruro',
        cities: ['Oruro', 'Huanuni', 'Challapata', 'Caracollo', 'Machacamarca']
      },
      {
        name: 'chuquisaca',
        cities: ['Sucre', 'Camargo', 'Monteagudo', 'Villa Serrano', 'Padilla']
      },
      {
        name: 'tarija',
        cities: ['Tarija', 'Yacuiba', 'Villamontes', 'Bermejo', 'Entre Ríos']
      },
      {
        name: 'beni',
        cities: ['Trinidad', 'Riberalta', 'Guayaramerín', 'San Borja', 'San Ignacio de Moxos']
      },
      {
        name: 'pando',
        cities: ['Cobija', 'Porvenir', 'Puerto Rico', 'San Lorenzo', 'Gonzalo Moreno']
      }
    ]
  },
  {
    name: 'brasil',
    code: '+55',
    aliases: ['br', 'bra', 'brasil', 'brasileño', 'brasileña', 'brazilian'],
    states: [
      {
        name: 'acre',
        cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó']
      },
      {
        name: 'alagoas',
        cities: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo']
      },
      {
        name: 'amapá',
        cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão']
      },
      {
        name: 'amazonas',
        cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Tefé']
      },
      {
        name: 'bahia',
        cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna']
      },
      {
        name: 'ceará',
        cities: ['Fortaleza', 'Juazeiro do Norte', 'Caucaia', 'Maracanaú', 'Sobral']
      },
      {
        name: 'distrito federal',
        cities: ['Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia', 'Planaltina']
      },
      {
        name: 'espírito santo',
        cities: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Guarapari']
      },
      {
        name: 'goiás',
        cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia']
      },
      {
        name: 'maranhão',
        cities: ['São Luís', 'Imperatriz', 'Caxias', 'Timon', 'Codó']
      },
      {
        name: 'mato grosso',
        cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra']
      },
      {
        name: 'mato grosso do sul',
        cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã']
      },
      {
        name: 'minas gerais',
        cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim']
      },
      {
        name: 'pará',
        cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal']
      },
      {
        name: 'paraíba',
        cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux']
      },
      {
        name: 'paraná',
        cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel']
      },
      {
        name: 'pernambuco',
        cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina']
      },
      {
        name: 'piauí',
        cities: ['Teresina', 'Parnaíba', 'Picos', 'Floriano', 'Piripiri']
      },
      {
        name: 'rio de janeiro',
        cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Niterói', 'Nova Iguaçu']
      },
      {
        name: 'rio grande do norte',
        cities: ['Natal', 'Mossoró', 'Parnamirim', 'Caicó', 'Macau']
      },
      {
        name: 'rio grande do sul',
        cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria']
      },
      {
        name: 'rondônia',
        cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Cacoal', 'Vilhena']
      },
      {
        name: 'roraima',
        cities: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí', 'Pacaraima']
      },
      {
        name: 'santa catarina',
        cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma']
      },
      {
        name: 'são paulo',
        cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André']
      },
      {
        name: 'sergipe',
        cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância']
      },
      {
        name: 'tocantins',
        cities: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins']
      }
    ]
  },
  {
    name: 'chile',
    code: '+56',
    aliases: ['cl', 'chl', 'chileno', 'chilena', 'chilean'],
    states: [
      {
        name: 'arica y parinacota',
        cities: ['Arica', 'Putre', 'Camarones', 'General Lagos']
      },
      {
        name: 'tarapacá',
        cities: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Huara', 'Pica']
      },
      {
        name: 'antofagasta',
        cities: ['Antofagasta', 'Calama', 'Tocopilla', 'Taltal', 'Mejillones']
      },
      {
        name: 'atacama',
        cities: ['Copiapó', 'Caldera', 'Vallenar', 'Chañaral', 'Huasco']
      },
      {
        name: 'coquimbo',
        cities: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel', 'Los Vilos']
      },
      {
        name: 'valparaíso',
        cities: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio']
      },
      {
        name: 'metropolitana de santiago',
        cities: ['Santiago', 'Puente Alto', 'Maipú', 'La Florida', 'Pudahuel']
      },
      {
        name: 'ohiggins',
        cities: ['Rancagua', 'San Fernando', 'Rengo', 'Santa Cruz', 'Pichilemu']
      },
      {
        name: 'maule',
        cities: ['Talca', 'Curicó', 'Linares', 'Constitución', 'Cauquenes']
      },
      {
        name: 'ñuble',
        cities: ['Chillán', 'San Carlos', 'Coihueco', 'Quirihue', 'Bulnes']
      },
      {
        name: 'biobío',
        cities: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán', 'Coronel']
      },
      {
        name: 'araucanía',
        cities: ['Temuco', 'Villarrica', 'Angol', 'Pucón', 'Nueva Imperial']
      },
      {
        name: 'los ríos',
        cities: ['Valdivia', 'La Unión', 'Panguipulli', 'Río Bueno', 'Lago Ranco']
      },
      {
        name: 'los lagos',
        cities: ['Puerto Montt', 'Osorno', 'Castro', 'Ancud', 'Quellón']
      },
      {
        name: 'aysén',
        cities: ['Coyhaique', 'Puerto Aysén', 'Chile Chico', 'Cisnes', 'Tortel']
      },
      {
        name: 'magallanes',
        cities: ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos', 'Río Verde']
      }
    ]
  },
  {
    name: 'colombia',
    code: '+57',
    aliases: ['co', 'col', 'colombiano', 'colombiana', 'colombian'],
    states: [
      {
        name: 'amazonas',
        cities: ['Leticia', 'Puerto Nariño', 'Tarapacá']
      },
      {
        name: 'antioquia',
        cities: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro', 'Apartadó']
      },
      {
        name: 'arauca',
        cities: ['Arauca', 'Tame', 'Saravena', 'Arauquita']
      },
      {
        name: 'atlantico',
        cities: ['Barranquilla', 'Soledad', 'Malambo', 'Baranoa', 'Puerto Colombia']
      },
      {
        name: 'bolivar',
        cities: ['Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'El Carmen de Bolívar']
      },
      {
        name: 'boyaca',
        cities: ['Tunja', 'Sogamoso', 'Duitama', 'Chiquinquirá', 'Puerto Boyacá']
      },
      {
        name: 'caldas',
        cities: ['Manizales', 'Villamaría', 'La Dorada', 'Riosucio', 'Chinchiná']
      },
      {
        name: 'caqueta',
        cities: ['Florencia', 'San Vicente del Caguán', 'Cartagena del Chairá', 'Puerto Rico']
      },
      {
        name: 'casanare',
        cities: ['Yopal', 'Aguazul', 'Villanueva', 'Monterrey', 'Tauramena']
      },
      {
        name: 'cauca',
        cities: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Miranda', 'El Bordo']
      },
      {
        name: 'cesar',
        cities: ['Valledupar', 'Aguachica', 'Agustín Codazzi', 'Curumaní', 'La Jagua de Ibirico']
      },
      {
        name: 'choco',
        cities: ['Quibdó', 'Istmina', 'Riosucio', 'Tadó', 'Condoto']
      },
      {
        name: 'cordoba',
        cities: ['Montería', 'Cereté', 'Sahagún', 'Lorica', 'Montelíbano']
      },
      {
        name: 'cundinamarca',
        cities: ['Bogotá', 'Soacha', 'Zipaquirá', 'Girardot', 'Facatativá', 'Fusagasugá']
      },
      {
        name: 'guainia',
        cities: ['Inírida', 'Barrancominas', 'San Felipe']
      },
      {
        name: 'guaviare',
        cities: ['San José del Guaviare', 'El Retorno', 'Calamar', 'Miraflores']
      },
      {
        name: 'huila',
        cities: ['Neiva', 'Garzón', 'Pitalito', 'La Plata', 'Campoalegre']
      },
      {
        name: 'la guajira',
        cities: ['Riohacha', 'Maicao', 'Uribia', 'San Juan del Cesar', 'Fonseca']
      },
      {
        name: 'magdalena',
        cities: ['Santa Marta', 'Ciénaga', 'Fundación', 'El Banco', 'Plato']
      },
      {
        name: 'meta',
        cities: ['Villavicencio', 'Acacías', 'Granada', 'Puerto López', 'San Martín']
      },
      {
        name: 'nariño',
        cities: ['Pasto', 'Tumaco', 'Ipiales', 'Túquerres', 'La Unión']
      },
      {
        name: 'norte de santander',
        cities: ['Cúcuta', 'Ocaña', 'Pamplona', 'Los Patios', 'Villa del Rosario']
      },
      {
        name: 'putumayo',
        cities: ['Mocoa', 'Puerto Asís', 'Orito', 'Sibundoy', 'La Hormiga']
      },
      {
        name: 'quindio',
        cities: ['Armenia', 'Calarcá', 'La Tebaida', 'Quimbaya', 'Montenegro']
      },
      {
        name: 'risaralda',
        cities: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Marsella']
      },
      {
        name: 'san andres y providencia',
        cities: ['San Andrés', 'Providencia', 'Santa Catalina']
      },
      {
        name: 'santander',
        cities: ['Bucaramanga', 'Barrancabermeja', 'Floridablanca', 'Piedecuesta', 'Girón']
      },
      {
        name: 'sucre',
        cities: ['Sincelejo', 'Corozal', 'Sampués', 'San Marcos', 'Tolú']
      },
      {
        name: 'tolima',
        cities: ['Ibagué', 'Espinal', 'Honda', 'Melgar', 'Lérida']
      },
      {
        name: 'valle del cauca',
        cities: ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Buga']
      },
      {
        name: 'vaupes',
        cities: ['Mitú', 'Taraira', 'Yavaraté']
      },
      {
        name: 'vichada',
        cities: ['Puerto Carreño', 'La Primavera', 'Santa Rosalía', 'Cumaribo']
      }
    ]
  },
  {
    name: 'ecuador',
    code: '+593',
    aliases: ['ec', 'ecu', 'ecuatoriano', 'ecuatoriana', 'ecuadorian'],
    states: [
      {
        name: 'azuay',
        cities: ['Cuenca', 'Gualaceo', 'Sigsig', 'Paute', 'Nabón']
      },
      {
        name: 'bolivar',
        cities: ['Guaranda', 'Chillanes', 'San Miguel', 'Echeandía', 'Caluma']
      },
      {
        name: 'canar',
        cities: ['Azogues', 'Cañar', 'Biblián', 'La Troncal', 'Suscal']
      },
      {
        name: 'carchi',
        cities: ['Tulcán', 'San Gabriel', 'Mira', 'El Ángel', 'Bolívar']
      },
      {
        name: 'chimborazo',
        cities: ['Riobamba', 'Guano', 'Alausí', 'Guamote', 'Chambo']
      },
      {
        name: 'cotopaxi',
        cities: ['Latacunga', 'Salcedo', 'Saquisilí', 'Pujilí', 'La Maná']
      },
      {
        name: 'el oro',
        cities: ['Machala', 'Santa Rosa', 'Pasaje', 'Huaquillas', 'Arenillas']
      },
      {
        name: 'esmeraldas',
        cities: ['Esmeraldas', 'Atacames', 'San Lorenzo', 'Muisne', 'Quinindé']
      },
      {
        name: 'galapagos',
        cities: ['Puerto Ayora', 'Puerto Baquerizo Moreno', 'Puerto Villamil']
      },
      {
        name: 'guayas',
        cities: ['Guayaquil', 'Daule', 'Samborondón', 'Durán', 'Milagro', 'Playas']
      },
      {
        name: 'imbabura',
        cities: ['Ibarra', 'Otavalo', 'Cotacachi', 'Atuntaqui', 'Urcuquí']
      },
      {
        name: 'loja',
        cities: ['Loja', 'Catamayo', 'Macará', 'Gonzanamá', 'Paltas']
      },
      {
        name: 'los rios',
        cities: ['Babahoyo', 'Quevedo', 'Vinces', 'Buena Fe', 'Ventanas']
      },
      {
        name: 'manabi',
        cities: ['Portoviejo', 'Manta', 'Bahía de Caráquez', 'Chone', 'Jipijapa']
      },
      {
        name: 'morona santiago',
        cities: ['Macas', 'Sucúa', 'Gualaquiza', 'Logroño', 'Taisha']
      },
      {
        name: 'napo',
        cities: ['Tena', 'Archidona', 'El Chaco', 'Baeza', 'Cosanga']
      },
      {
        name: 'orellana',
        cities: ['Puerto Francisco de Orellana', 'Loreto', 'Nuevo Rocafuerte']
      },
      {
        name: 'pastaza',
        cities: ['Puyo', 'Mera', 'Santa Clara', 'Arajuno']
      },
      {
        name: 'pichincha',
        cities: ['Quito', 'Cayambe', 'Sangolquí', 'Machachi', 'San Antonio de Pichincha']
      },
      {
        name: 'santa elena',
        cities: ['Santa Elena', 'La Libertad', 'Salinas', 'Ballenita']
      },
      {
        name: 'santo domingo de los tsachilas',
        cities: ['Santo Domingo', 'La Concordia']
      },
      {
        name: 'sucumbios',
        cities: ['Nueva Loja', 'Shushufindi', 'Lumbaqui', 'Cascales', 'Cuyabeno']
      },
      {
        name: 'tungurahua',
        cities: ['Ambato', 'Baños', 'Pelileo', 'Cevallos', 'Píllaro']
      },
      {
        name: 'zamora chinchipe',
        cities: ['Zamora', 'Yantzaza', 'Zumba', 'Palanda', 'Guayzimi']
      }
    ]
  },
  {
    name: 'paraguay',
    code: '+595',
    aliases: ['py', 'pry', 'paraguayo', 'paraguaya', 'paraguayan'],
    states: [
      {
        name: 'asunción',
        cities: ['Asunción']
      },
      {
        name: 'alto paraguay',
        cities: ['Fuerte Olimpo', 'Puerto Casado', 'La Victoria', 'Bahía Negra']
      },
      {
        name: 'alto paraná',
        cities: ['Ciudad del Este', 'Presidente Franco', 'Hernandarias', 'Minga Guazú']
      },
      {
        name: 'amambay',
        cities: ['Pedro Juan Caballero', 'Capitán Bado', 'Bella Vista', 'Zanja Pytã']
      },
      {
        name: 'boquerón',
        cities: ['Filadelfia', 'Loma Plata', 'Neuland', 'Mariscal Estigarribia']
      },
      {
        name: 'caaguazú',
        cities: ['Coronel Oviedo', 'Caaguazú', 'Dr. Juan Eulogio Estigarribia', 'Repatriación']
      },
      {
        name: 'caazapá',
        cities: ['Caazapá', 'San Juan Nepomuceno', 'Yuty', 'Avaí']
      },
      {
        name: 'canindeyú',
        cities: ['Salto del Guairá', 'Curuguaty', 'Ygatimí', 'Ypejhú']
      },
      {
        name: 'central',
        cities: ['Fernando de la Mora', 'San Lorenzo', 'Lambaré', 'Luque', 'Capiatá']
      },
      {
        name: 'concepción',
        cities: ['Concepción', 'Horqueta', 'Yby Yaú', 'Belén']
      },
      {
        name: 'cordillera',
        cities: ['Caacupé', 'Altos', 'Emboscada', 'Eusebio Ayala']
      },
      {
        name: 'guairá',
        cities: ['Villarrica', 'Borja', 'Mauricio José Troche', 'Iturbe']
      },
      {
        name: 'itapúa',
        cities: ['Encarnación', 'Hohenau', 'Obligado', 'Capitán Miranda']
      },
      {
        name: 'misiones',
        cities: ['San Juan Bautista', 'Ayolas', 'San Ignacio', 'Santa Rosa']
      },
      {
        name: 'ñeembucú',
        cities: ['Pilar', 'Alberdi', 'Villa Franca', 'Cerrito']
      },
      {
        name: 'paraguarí',
        cities: ['Paraguarí', 'Carapeguá', 'Quiindy', 'Yaguarón']
      },
      {
        name: 'presidente hayes',
        cities: ['Villa Hayes', 'Benjamín Aceval', 'Puerto Pinasco', 'Nanawa']
      },
      {
        name: 'san pedro',
        cities: ['San Pedro de Ycuamandyyú', 'San Estanislao', 'Choré', 'Lima']
      }
    ]
  },
  {
    name: 'peru',
    code: '+51',
    aliases: ['pe', 'per', 'perú', 'peruano', 'peruana', 'peruvian'],
    states: [
      {
        name: 'amazonas',
        cities: ['Chachapoyas', 'Bagua', 'Bagua Grande', 'Jumbilla', 'La Peca', 'Santa María de Nieva']
      },
      {
        name: 'ancash',
        cities: ['Huaraz', 'Chimbote', 'Nuevo Chimbote', 'Casma', 'Caraz', 'Huarmey']
      },
      {
        name: 'apurimac',
        cities: ['Abancay', 'Andahuaylas', 'Chalhuanca', 'Talavera', 'Tambobamba']
      },
      {
        name: 'arequipa',
        cities: ['Arequipa', 'Camana', 'Mollendo', 'Aplao', 'Chivay']
      },
      {
        name: 'ayacucho',
        cities: ['Ayacucho', 'Huanta', 'San Miguel', 'Pauza', 'Puquio']
      },
      {
        name: 'cajamarca',
        cities: ['Cajamarca', 'Jaén', 'Cutervo', 'Chota', 'Celendín', 'San Ignacio']
      },
      {
        name: 'callao',
        cities: ['Callao', 'Bellavista', 'La Perla', 'Carmen de La Legua', 'Ventanilla']
      },
      {
        name: 'cusco',
        cities: ['Cusco', 'Sicuani', 'Quillabamba', 'Urubamba', 'Paucartambo']
      },
      {
        name: 'huancavelica',
        cities: ['Huancavelica', 'Lircay', 'Castrovirreyna', 'Tayacaja', 'Acobamba']
      },
      {
        name: 'huanuco',
        cities: ['Huánuco', 'Tingo María', 'Ambo', 'La Unión', 'Panao']
      },
      {
        name: 'ica',
        cities: ['Ica', 'Chincha Alta', 'Pisco', 'Nazca', 'Palpa']
      },
      {
        name: 'junin',
        cities: ['Huancayo', 'Jauja', 'Tarma', 'La Oroya', 'Satipo']
      },
      {
        name: 'la libertad',
        cities: ['Trujillo', 'Chepén', 'Pacasmayo', 'Guadalupe', 'Huamachuco', 'Viru']
      },
      {
        name: 'lambayeque',
        cities: ['Chiclayo', 'Lambayeque', 'Ferreñafe', 'Monsefú', 'Olmos']
      },
      {
        name: 'lima',
        cities: ['Lima', 'Huacho', 'Cañete', 'Huaral', 'Barranca', 'Chosica', 'San Vicente de Cañete']
      },
      {
        name: 'loreto',
        cities: ['Iquitos', 'Yurimaguas', 'Nauta', 'Requena', 'Contamana', 'Caballococha']
      },
      {
        name: 'madre de dios',
        cities: ['Puerto Maldonado', 'Iñapari', 'Salvación']
      },
      {
        name: 'moquegua',
        cities: ['Moquegua', 'Ilo', 'Omate', 'Samegua', 'Torata']
      },
      {
        name: 'pasco',
        cities: ['Cerro de Pasco', 'Yanahuanca', 'Oxapampa', 'Villa Rica', 'Pozuzo']
      },
      {
        name: 'piura',
        cities: ['Piura', 'Sullana', 'Talara', 'Paita', 'Sechura', 'Chulucanas']
      },
      {
        name: 'puno',
        cities: ['Puno', 'Juliaca', 'Ilave', 'Ayaviri', 'Azángaro', 'Huancané']
      },
      {
        name: 'san martin',
        cities: ['Moyobamba', 'Tarapoto', 'Juanjuí', 'Bellavista', 'Rioja']
      },
      {
        name: 'tacna',
        cities: ['Tacna', 'Alto de la Alianza', 'Calana', 'Pocollay', 'Palca']
      },
      {
        name: 'tumbes',
        cities: ['Tumbes', 'Zorritos', 'Aguas Verdes', 'Corrales', 'Papayal']
      },
      {
        name: 'ucayali',
        cities: ['Pucallpa', 'Aguaytía', 'Atalaya', 'Contamana', 'Puerto Inca']
      }
    ]
  },
  {
    name: 'uruguay',
    code: '+598',
    aliases: ['uy', 'uruguayo', 'uruguaya'],
    states: [
      {
        name: 'montevideo',
        cities: ['Montevideo']
      },
      {
        name: 'artigas',
        cities: ['Artigas', 'Bella Unión', 'Tomás Gomensoro', 'Baltasar Brum']
      },
      {
        name: 'canelones',
        cities: ['Ciudad de la Costa', 'Las Piedras', 'Pando', 'La Paz', 'Canelones']
      },
      {
        name: 'cerro largo',
        cities: ['Melo', 'Río Branco', 'Fraile Muerto', 'Isidoro Noblía']
      },
      {
        name: 'colonia',
        cities: ['Colonia del Sacramento', 'Carmelo', 'Juan Lacaze', 'Nueva Helvecia']
      },
      {
        name: 'durazno',
        cities: ['Durazno', 'Sarandí del Yí', 'Carmen', 'La Paloma']
      },
      {
        name: 'flores',
        cities: ['Trinidad', 'Ismael Cortinas', 'Andresito']
      },
      {
        name: 'florida',
        cities: ['Florida', 'Sarandí Grande', 'Casupá', 'Fray Marcos']
      },
      {
        name: 'lavalleja',
        cities: ['Minas', 'José Pedro Varela', 'Solís de Mataojo', 'Mariscala']
      },
      {
        name: 'maldonado',
        cities: ['Maldonado', 'Punta del Este', 'San Carlos', 'Piriápolis']
      },
      {
        name: 'paysandú',
        cities: ['Paysandú', 'Guichón', 'Quebracho', 'Porvenir']
      },
      {
        name: 'río negro',
        cities: ['Fray Bentos', 'Young', 'Nuevo Berlín', 'San Javier']
      },
      {
        name: 'rivera',
        cities: ['Rivera', 'Tranqueras', 'Vichadero', 'Minas de Corrales']
      },
      {
        name: 'rocha',
        cities: ['Rocha', 'Chuy', 'Lascano', 'Castillos']
      },
      {
        name: 'salto',
        cities: ['Salto', 'Daymán', 'Constitución', 'Belén']
      },
      {
        name: 'san josé',
        cities: ['San José de Mayo', 'Ciudad del Plata', 'Libertad', 'Ecilda Paullier']
      },
      {
        name: 'soriano',
        cities: ['Mercedes', 'Dolores', 'Cardona', 'José Enrique Rodó']
      },
      {
        name: 'tacuarembó',
        cities: ['Tacuarembó', 'Paso de los Toros', 'San Gregorio de Polanco', 'Ansina']
      },
      {
        name: 'treinta y tres',
        cities: ['Treinta y Tres', 'Vergara', 'Santa Clara de Olimar', 'Cerro Chato']
      }
    ]
  },
  {
    name: 'venezuela',
    code: '+58',
    aliases: ['ve', 'ven', 'venezolano', 'venezolana', 'venezuelan'],
    states: [
      {
        name: 'amazonas',
        cities: ['Puerto Ayacucho', 'San Fernando de Atabapo', 'Maroa', 'La Esmeralda']
      },
      {
        name: 'anzoátegui',
        cities: ['Barcelona', 'Puerto La Cruz', 'El Tigre', 'Anaco', 'Cantaura']
      },
      {
        name: 'apure',
        cities: ['San Fernando de Apure', 'Guasdualito', 'Achaguas', 'Biruaca']
      },
      {
        name: 'aragua',
        cities: ['Maracay', 'Turmero', 'La Victoria', 'Cagua', 'Villa de Cura']
      },
      {
        name: 'barinas',
        cities: ['Barinas', 'Barinitas', 'Santa Bárbara', 'Socopó']
      },
      {
        name: 'bolívar',
        cities: ['Ciudad Guayana', 'Ciudad Bolívar', 'Upata', 'Caicara del Orinoco']
      },
      {
        name: 'carabobo',
        cities: ['Valencia', 'Puerto Cabello', 'Guacara', 'Tocuyito', 'Guigue']
      },
      {
        name: 'cojedes',
        cities: ['San Carlos', 'Tinaquillo', 'El Baúl', 'Tinaco']
      },
      {
        name: 'delta amacuro',
        cities: ['Tucupita', 'Pedernales', 'Curiapo', 'Sierra Imataca']
      },
      {
        name: 'distrito capital',
        cities: ['Caracas']
      },
      {
        name: 'falcón',
        cities: ['Coro', 'Punto Fijo', 'Santa Ana de Coro', 'Chichiriviche']
      },
      {
        name: 'guárico',
        cities: ['San Juan de los Morros', 'Calabozo', 'Valle de la Pascua', 'Zaraza']
      },
      {
        name: 'lara',
        cities: ['Barquisimeto', 'Cabudare', 'Carora', 'Quíbor', 'El Tocuyo']
      },
      {
        name: 'mérida',
        cities: ['Mérida', 'El Vigía', 'Ejido', 'Tovar']
      },
      {
        name: 'miranda',
        cities: ['Petare', 'Los Teques', 'Ocumare del Tuy', 'Guarenas', 'Guatire']
      },
      {
        name: 'monagas',
        cities: ['Maturín', 'Caripito', 'Punta de Mata', 'Temblador']
      },
      {
        name: 'nueva esparta',
        cities: ['Porlamar', 'La Asunción', 'Juan Griego', 'Pampatar']
      },
      {
        name: 'portuguesa',
        cities: ['Guanare', 'Acarigua', 'Araure', 'Biscucuy']
      },
      {
        name: 'sucre',
        cities: ['Cumaná', 'Carúpano', 'Güiria', 'Araya']
      },
      {
        name: 'táchira',
        cities: ['San Cristóbal', 'Táriba', 'La Grita', 'Rubio']
      },
      {
        name: 'trujillo',
        cities: ['Trujillo', 'Valera', 'Boconó', 'Escuque']
      },
      {
        name: 'vargas',
        cities: ['La Guaira', 'Catia La Mar', 'Maiquetía', 'Naiguatá']
      },
      {
        name: 'yaracuy',
        cities: ['San Felipe', 'Yaritagua', 'Chivacoa', 'Nirgua']
      },
      {
        name: 'zulia',
        cities: ['Maracaibo', 'Cabimas', 'Ciudad Ojeda', 'Santa Bárbara del Zulia']
      }
    ]
  },

  // Europa
  {
    name: 'españa',
    code: '+34',
    aliases: ['es', 'esp', 'españa', 'español', 'española', 'spanish', 'spaniard'],
    states: [
      {
        name: 'andalucía',
        cities: ['Sevilla', 'Málaga', 'Córdoba', 'Granada', 'Cádiz']
      },
      {
        name: 'aragón',
        cities: ['Zaragoza', 'Huesca', 'Teruel', 'Calatayud', 'Alcañiz']
      },
      {
        name: 'asturias',
        cities: ['Oviedo', 'Gijón', 'Avilés', 'Langreo', 'Mieres']
      },
      {
        name: 'islas baleares',
        cities: ['Palma de Mallorca', 'Ibiza', 'Mahón', 'Manacor', 'Ciutadella']
      },
      {
        name: 'canarias',
        cities: ['Las Palmas de Gran Canaria', 'Santa Cruz de Tenerife', 'La Laguna', 'Arona', 'Telde']
      },
      {
        name: 'cantabria',
        cities: ['Santander', 'Torrelavega', 'Castro-Urdiales', 'Camargo', 'Piélagos']
      },
      {
        name: 'castilla-la mancha',
        cities: ['Toledo', 'Albacete', 'Guadalajara', 'Ciudad Real', 'Cuenca']
      },
      {
        name: 'castilla y león',
        cities: ['Valladolid', 'Burgos', 'Salamanca', 'León', 'Palencia']
      },
      {
        name: 'cataluña',
        cities: ['Barcelona', 'Tarragona', 'Lleida', 'Girona', 'Sabadell']
      },
      {
        name: 'comunidad valenciana',
        cities: ['Valencia', 'Alicante', 'Elche', 'Castellón de la Plana', 'Torrevieja']
      },
      {
        name: 'extremadura',
        cities: ['Badajoz', 'Cáceres', 'Mérida', 'Plasencia', 'Don Benito']
      },
      {
        name: 'galicia',
        cities: ['Santiago de Compostela', 'A Coruña', 'Vigo', 'Ourense', 'Lugo']
      },
      {
        name: 'comunidad de madrid',
        cities: ['Madrid', 'Móstoles', 'Alcalá de Henares', 'Fuenlabrada', 'Leganés']
      },
      {
        name: 'región de murcia',
        cities: ['Murcia', 'Cartagena', 'Lorca', 'Molina de Segura', 'Alcantarilla']
      },
      {
        name: 'comunidad foral de navarra',
        cities: ['Pamplona', 'Tudela', 'Barañáin', 'Burlada', 'Estella']
      },
      {
        name: 'país vasco',
        cities: ['Bilbao', 'Vitoria-Gasteiz', 'San Sebastián', 'Barakaldo', 'Getxo']
      },
      {
        name: 'la rioja',
        cities: ['Logroño', 'Calahorra', 'Arnedo', 'Haro', 'Alfaro']
      },
      {
        name: 'ceuta',
        cities: ['Ceuta']
      },
      {
        name: 'melilla',
        cities: ['Melilla']
      }
    ]
  },
  // 'france': {
  //   code: '+33',
  //   aliases: ['fr', 'fra', 'francia', 'francés', 'francesa', 'french']
  // },
  // 'germany': {
  //   code: '+49',
  //   aliases: ['de', 'deu', 'alemania', 'alemán', 'alemana', 'german']
  // },
  // 'italy': {
  //   code: '+39',
  //   aliases: ['it', 'ita', 'italia', 'italiano', 'italiana', 'italian']
  // },
  // 'united kingdom': {
  //   code: '+44',
  //   aliases: ['uk', 'gbr', 'reino unido', 'gran bretaña', 'británico', 'británica', 'british', 'english']
  // },
  // 'portugal': {
  //   code: '+351',
  //   aliases: ['pt', 'prt', 'portugués', 'portuguesa', 'portuguese']
  // },
  // 'netherlands': {
  //   code: '+31',
  //   aliases: ['nl', 'nld', 'países bajos', 'holanda', 'holandés', 'holandesa', 'dutch', 'nederlander']
  // },

  // Asia-Pacífico
  {
    name: 'japon',
    code: '+81',
    aliases: ['jp', 'jpn', 'japón', 'japonés', 'japonesa', 'japanese'],
    states: [
      {
        name: 'Hokkaido',
        cities: ['Sapporo', 'Asahikawa', 'Hakodate', 'Obihiro', 'Kushiro']
      },
      {
        name: 'Aomori',
        cities: ['Aomori', 'Hachinohe', 'Hirosaki', 'Misawa', 'Mutsu']
      },
      {
        name: 'Iwate',
        cities: ['Morioka', 'Ichinoseki', 'Ōshū', 'Hanamaki', 'Kitakami']
      },
      {
        name: 'Miyagi',
        cities: ['Sendai', 'Ishinomaki', 'Shiogama', 'Natori', 'Kesennuma']
      },
      {
        name: 'Akita',
        cities: ['Akita', 'Yokote', 'Ōdate', 'Yuzawa', 'Noshiro']
      },
      {
        name: 'Yamagata',
        cities: ['Yamagata', 'Tsuruoka', 'Sakata', 'Yonezawa', 'Tendō']
      },
      {
        name: 'Fukushima',
        cities: ['Fukushima', 'Iwaki', 'Kōriyama', 'Aizuwakamatsu', 'Sukagawa']
      },
      {
        name: 'Ibaraki',
        cities: ['Mito', 'Tsukuba', 'Hitachi', 'Kashima', 'Tsuchiura']
      },
      {
        name: 'Tochigi',
        cities: ['Utsunomiya', 'Oyama', 'Tochigi', 'Sano', 'Kanuma']
      },
      {
        name: 'Gunma',
        cities: ['Maebashi', 'Takasaki', 'Ōta', 'Isesaki', 'Kiryu']
      },
      {
        name: 'Saitama',
        cities: ['Saitama', 'Kawaguchi', 'Kawagoe', 'Koshigaya', 'Tokorozawa']
      },
      {
        name: 'Chiba',
        cities: ['Chiba', 'Funabashi', 'Matsudo', 'Ichikawa', 'Kashiwa']
      },
      {
        name: 'Tokyo',
        cities: ['Tokyo', 'Hachiōji', 'Tachikawa', 'Musashino', 'Chōfu']
      },
      {
        name: 'Kanagawa',
        cities: ['Yokohama', 'Kawasaki', 'Sagamihara', 'Fujisawa', 'Yokosuka']
      },
      {
        name: 'Niigata',
        cities: ['Niigata', 'Nagaoka', 'Jōetsu', 'Sanjō', 'Kashiwazaki']
      },
      {
        name: 'Toyama',
        cities: ['Toyama', 'Takaoka', 'Imizu', 'Nanto', 'Namerikawa']
      },
      {
        name: 'Ishikawa',
        cities: ['Kanazawa', 'Komatsu', 'Hakusan', 'Kaga', 'Nomi']
      },
      {
        name: 'Fukui',
        cities: ['Fukui', 'Sakai', 'Echizen', 'Sabae', 'Ōno']
      },
      {
        name: 'Yamanashi',
        cities: ['Kōfu', 'Fujiyoshida', 'Kai', 'Minami-Alps', 'Tsuru']
      },
      {
        name: 'Nagano',
        cities: ['Nagano', 'Matsumoto', 'Ueda', 'Suzaka', 'Saku']
      },
      {
        name: 'Gifu',
        cities: ['Gifu', 'Ōgaki', 'Tajimi', 'Kakamigahara', 'Kani']
      },
      {
        name: 'Shizuoka',
        cities: ['Shizuoka', 'Hamamatsu', 'Numazu', 'Fuji', 'Mishima']
      },
      {
        name: 'Aichi',
        cities: ['Nagoya', 'Toyota', 'Okazaki', 'Ichinomiya', 'Kasugai']
      },
      {
        name: 'Mie',
        cities: ['Yokkaichi', 'Tsu', 'Suzuka', 'Matsusaka', 'Kuwana']
      },
      {
        name: 'Shiga',
        cities: ['Ōtsu', 'Kusatsu', 'Nagahama', 'Hikone', 'Moriyama']
      },
      {
        name: 'Kyoto',
        cities: ['Kyoto', 'Uji', 'Kameoka', 'Jōyō', 'Mukō']
      },
      {
        name: 'Osaka',
        cities: ['Osaka', 'Sakai', 'Takatsuki', 'Higashiōsaka', 'Toyonaka']
      },
      {
        name: 'Hyogo',
        cities: ['Kobe', 'Himeji', 'Nishinomiya', 'Amagasaki', 'Akashi']
      },
      {
        name: 'Nara',
        cities: ['Nara', 'Kashihara', 'Ikoma', 'Gojō', 'Tenri']
      },
      {
        name: 'Wakayama',
        cities: ['Wakayama', 'Tanabe', 'Hashimoto', 'Kinokawa', 'Arida']
      },
      {
        name: 'Tottori',
        cities: ['Tottori', 'Yonago', 'Kurayoshi', 'Sakaiminato', 'Hōki']
      },
      {
        name: 'Shimane',
        cities: ['Matsue', 'Izumo', 'Masuda', 'Unnan', 'Ōda']
      },
      {
        name: 'Okayama',
        cities: ['Okayama', 'Kurashiki', 'Tsuyama', 'Tamano', 'Kasaoka']
      },
      {
        name: 'Hiroshima',
        cities: ['Hiroshima', 'Fukuyama', 'Kure', 'Onomichi', 'Higashihiroshima']
      },
      {
        name: 'Yamaguchi',
        cities: ['Yamaguchi', 'Shimonoseki', 'Ube', 'Hōfu', 'Iwakuni']
      },
      {
        name: 'Tokushima',
        cities: ['Tokushima', 'Anan', 'Naruto', 'Yoshinogawa', 'Mima']
      },
      {
        name: 'Kagawa',
        cities: ['Takamatsu', 'Marugame', 'Sakaide', 'Zentsuji', 'Kan\'onji']
      },
      {
        name: 'Ehime',
        cities: ['Matsuyama', 'Imabari', 'Niihama', 'Saijō', 'Ōzu']
      },
      {
        name: 'Kochi',
        cities: ['Kōchi', 'Nankoku', 'Sukumo', 'Tosa', 'Aki']
      },
      {
        name: 'Fukuoka',
        cities: ['Fukuoka', 'Kitakyushu', 'Kurume', 'Ōmuta', 'Iizuka']
      },
      {
        name: 'Saga',
        cities: ['Saga', 'Tosu', 'Karatsu', 'Imari', 'Takeo']
      },
      {
        name: 'Nagasaki',
        cities: ['Nagasaki', 'Sasebo', 'Ōmura', 'Isahaya', 'Hirado']
      },
      {
        name: 'Kumamoto',
        cities: ['Kumamoto', 'Yatsushiro', 'Hitoyoshi', 'Arao', 'Minamata']
      },
      {
        name: 'Oita',
        cities: ['Ōita', 'Beppu', 'Nakatsu', 'Hita', 'Saiki']
      },
      {
        name: 'Miyazaki',
        cities: ['Miyazaki', 'Miyakonojō', 'Nobeoka', 'Nichinan', 'Hyūga']
      },
      {
        name: 'Kagoshima',
        cities: ['Kagoshima', 'Kanoya', 'Satsumasendai', 'Kirishima', 'Amami']
      },
      {
        name: 'Okinawa',
        cities: ['Naha', 'Okinawa', 'Uruma', 'Itoman', 'Ginowan']
      }
    ]
  },
  {
    name: 'corea del sur',
    code: '+82',
    aliases: ['kr', 'kor', 'corea del sur', 'coreano', 'coreana', 'korean'],
    states: [
      {
        name: 'Seoul',
        cities: ['Seoul']
      },
      {
        name: 'Busan',
        cities: ['Busan']
      },
      {
        name: 'Daegu',
        cities: ['Daegu']
      },
      {
        name: 'Incheon',
        cities: ['Incheon']
      },
      {
        name: 'Gwangju',
        cities: ['Gwangju']
      },
      {
        name: 'Daejeon',
        cities: ['Daejeon']
      },
      {
        name: 'Ulsan',
        cities: ['Ulsan']
      },
      {
        name: 'Sejong',
        cities: ['Sejong']
      },
      {
        name: 'Gyeonggi',
        cities: ['Suwon', 'Seongnam', 'Goyang', 'Yongin', 'Bucheon']
      },
      {
        name: 'Gangwon',
        cities: ['Chuncheon', 'Wonju', 'Gangneung', 'Donghae', 'Sokcho']
      },
      {
        name: 'North Chungcheong',
        cities: ['Cheongju', 'Chungju', 'Jecheon', 'Boeun', 'Okcheon']
      },
      {
        name: 'South Chungcheong',
        cities: ['Cheonan', 'Asan', 'Seosan', 'Dangjin', 'Gongju']
      },
      {
        name: 'North Jeolla',
        cities: ['Jeonju', 'Iksan', 'Gunsan', 'Namwon', 'Jeongeup']
      },
      {
        name: 'South Jeolla',
        cities: ['Yeosu', 'Suncheon', 'Mokpo', 'Gwangyang', 'Naju']
      },
      {
        name: 'North Gyeongsang',
        cities: ['Pohang', 'Gumi', 'Gyeongju', 'Andong', 'Gimcheon']
      },
      {
        name: 'South Gyeongsang',
        cities: ['Changwon', 'Jinju', 'Geoje', 'Tongyeong', 'Sacheon']
      },
      {
        name: 'Jeju',
        cities: ['Jeju City', 'Seogwipo']
      }
    ]
  },
  {
    name: 'australia',
    code: '+61',
    aliases: ['au', 'aus', 'aussie', 'australian'],
    states: [
      {
        name: 'new south wales',
        cities: ['Sydney', 'Newcastle', 'Wollongong', 'Coffs Harbour', 'Wagga Wagga']
      },
      {
        name: 'victoria',
        cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton']
      },
      {
        name: 'queensland',
        cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns']
      },
      {
        name: 'western australia',
        cities: ['Perth', 'Bunbury', 'Geraldton', 'Albany', 'Kalgoorlie-Boulder']
      },
      {
        name: 'south australia',
        cities: ['Adelaide', 'Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Lincoln']
      },
      {
        name: 'tasmania',
        cities: ['Hobart', 'Launceston', 'Devonport', 'Burnie', 'Ulverstone']
      },
      {
        name: 'australian capital territory',
        cities: ['Canberra', 'Belconnen', 'Tuggeranong', 'Gungahlin', 'Woden Valley']
      },
      {
        name: 'northern territory',
        cities: ['Darwin', 'Palmerston', 'Alice Springs', 'Katherine', 'Nhulunbuy']
      }
    ]
  },
  {
    name: 'new zealand',
    code: '+64',
    aliases: ['nz', 'nzl', 'kiwi', 'neozelandés', 'neozelandesa', 'new zealander'],
    states: [
      {
        name: 'northland',
        cities: ['Whangarei', 'Kerikeri', 'Dargaville', 'Kaitaia', 'Paihia']
      },
      {
        name: 'auckland',
        cities: ['Auckland', 'Manukau', 'North Shore', 'Waitakere', 'Papakura']
      },
      {
        name: 'waikato',
        cities: ['Hamilton', 'Taupo', 'Cambridge', 'Te Awamutu', 'Tokoroa']
      },
      {
        name: 'bay of plenty',
        cities: ['Tauranga', 'Rotorua', 'Whakatane', 'Mount Maunganui', 'Te Puke']
      },
      {
        name: 'gisborne',
        cities: ['Gisborne', 'Ruatoria', 'Tolaga Bay', 'Te Karaka', 'Matawai']
      },
      {
        name: 'hawke\'s bay',
        cities: ['Napier', 'Hastings', 'Havelock North', 'Waipukurau', 'Wairoa']
      },
      {
        name: 'taranaki',
        cities: ['New Plymouth', 'Hawera', 'Stratford', 'Inglewood', 'Waitara']
      },
      {
        name: 'manawatu-whanganui',
        cities: ['Palmerston North', 'Whanganui', 'Levin', 'Feilding', 'Dannevirke']
      },
      {
        name: 'wellington',
        cities: ['Wellington', 'Lower Hutt', 'Upper Hutt', 'Porirua', 'Masterton']
      },
      {
        name: 'tasman',
        cities: ['Richmond', 'Motueka', 'Takaka', 'Murchison', 'Wakefield']
      },
      {
        name: 'nelson',
        cities: ['Nelson']
      },
      {
        name: 'marlborough',
        cities: ['Blenheim', 'Picton', 'Renwick', 'Seddon', 'Havelock']
      },
      {
        name: 'west coast',
        cities: ['Greymouth', 'Hokitika', 'Westport', 'Runanga', 'Reefton']
      },
      {
        name: 'canterbury',
        cities: ['Christchurch', 'Timaru', 'Ashburton', 'Rangiora', 'Rolleston']
      },
      {
        name: 'otago',
        cities: ['Dunedin', 'Queenstown', 'Oamaru', 'Wanaka', 'Alexandra']
      },
      {
        name: 'southland',
        cities: ['Invercargill', 'Gore', 'Bluff', 'Winton', 'Te Anau']
      }
    ]
  }
]

/*
{
  "data": [
    {"date":"2024-11-23","quant":2},
    {"date":"2024-11-25","quant":1},
    {"date":"2024-11-28","quant":1},
    {"date":"2024-11-30","quant":1},
    {"date":"2024-12-22","quant":1}
  ]
}

*/