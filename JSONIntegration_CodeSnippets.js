/**
 * BOTSWANA MUSEUM APP - JSON INTEGRATION CODE SNIPPETS
 * 
 * Copy these code blocks into your museum_app_unified.html
 * Insert after the DATA STRUCTURES section (around line 700)
 * 
 * INSTRUCTIONS:
 * 1. Create a new folder path: ./data/ in your project directory
 * 2. Place all 24 JSON files in this ./data/ folder
 * 3. Update your HTML to include these functions
 * 4. Call loadMuseumData() before showTab('about')
 */

// ============================================
// STEP 1: GLOBAL DATA STORAGE
// ============================================

let MUSEUM_DATA = {};
let DATA_LOADED = false;

// ============================================
// STEP 2: MASTER LOADER FUNCTION
// ============================================

/**
 * Loads all Botswana Museum JSON files
 * Add this BEFORE the showTab('about') line at the end
 */
async function loadMuseumData() {
  console.log("🏛️ Starting museum data load...");
  
  const jsonFiles = [
    // Collections (Animals, Birds, Plants, Foods)
    'Botswana Animals.json',
    'Comprehensive Guide to Botswana\'s Birds for Tourists.json',
    'Botswana Plants & Trees.json',
    'Botswana Foods and Beverages.json',
    
    // Cultural/Traditional
    'Botswana Traditional.json',
    'Botswana Traditional Music.json',
    'Initiation Ceremonies (Bogwera and Bojale).json',
    'Botswana Funeral Rites.json',
    'Botswana Marriage Customs.json',
    'Botswana Naming Conventions.json',
    'Botswana Folklore, Proverbs & Praise Poetry.json',
    'Botswana Totems (Seboko).json',
    'Botswana Tswana Kingdoms.json',
    
    // History & Events
    'Botswana - Historical People.json',
    'The Bantu Migration into Botswana.json',
    'Botswana - The Arrival of Europeans.json',
    'The Bechuanaland Protectorate.json',
    
    // Reference & Contact
    'Botswana Museums.json',
    'Main and Minority Languages.json',
    'Botswana National Museum Events.json'
  ];
  
  let loaded = 0;
  let failed = 0;
  
  for (const file of jsonFiles) {
    try {
      // Create key name from filename (remove .json and replace spaces)
      const key = file.replace('.json', '').replace(/[^\w\s]/g, '');
      
      // Fetch the JSON file
      const response = await fetch(`./data/${file}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      MUSEUM_DATA[key] = await response.json();
      loaded++;
      console.log(`✅ Loaded: ${file}`);
      
    } catch (error) {
      failed++;
      console.warn(`❌ Failed to load ${file}:`, error.message);
      
      // Store empty object so app doesn't crash
      const key = file.replace('.json', '').replace(/[^\w\s]/g, '');
      MUSEUM_DATA[key] = { error: true, message: error.message };
    }
  }
  
  console.log(`\n📊 Load Summary: ${loaded} loaded, ${failed} failed`);
  DATA_LOADED = true;
  
  // Now populate app structures
  populateAppData();
  
  return DATA_LOADED;
}

// ============================================
// STEP 3: POPULATE APP DATA STRUCTURES
// ============================================

/**
 * Transforms MUSEUM_DATA into app-ready structures:
 * - CULTURES and CULTURE_SUB (for Learn tab)
 * - ARTIFACTS (for Explore tab)
 * - GAMES (for Trivia)
 * - MUSEUM_INFO (for Menu tab)
 */
function populateAppData() {
  console.log("🔄 Populating app data structures...");
  
  // Initialize arrays if they don't exist
  if (!CULTURES) window.CULTURES = [];
  if (!CULTURE_SUB) window.CULTURE_SUB = {};
  if (!ARTIFACTS) window.ARTIFACTS = [];
  if (!GAMES) window.GAMES = [];
  
  // ===== CULTURES & TRADITIONS =====
  populateCultures();
  
  // ===== ARTIFACTS & COLLECTIONS =====
  populateArtifacts();
  
  // ===== TRIVIA GAMES =====
  populateGames();
  
  // ===== MUSEUM INFO =====
  populateMuseumInfo();
  
  console.log("✅ App data structures populated");
  console.log({ CULTURES, CULTURE_SUB, ARTIFACTS, GAMES });
}

// ============================================
// STEP 4: POPULATION FUNCTIONS
// ============================================

function populateCultures() {
  CULTURES = [
    {
      id: 'traditions',
      name: 'Traditions & Customs',
      icon: '🎭',
      desc: 'Explore the rich cultural heritage of Botswana',
      color: '#7f9a6c'
    },
    {
      id: 'ceremonies',
      name: 'Ceremonies & Rituals',
      icon: '👥',
      desc: 'Important life events and celebrations',
      color: '#7f9a6c'
    },
    {
      id: 'music-dance',
      name: 'Music & Dance',
      icon: '🎵',
      desc: 'Traditional music and dance forms',
      color: '#7f9a6c'
    },
    {
      id: 'stories',
      name: 'Folklore & Stories',
      icon: '📖',
      desc: 'Tales, proverbs, and praise poetry',
      color: '#7f9a6c'
    },
    {
      id: 'language',
      name: 'Language',
      icon: '🗣️',
      desc: 'Setswana and minority languages',
      color: '#7f9a6c'
    },
    {
      id: 'kingdoms',
      name: 'Tswana Kingdoms',
      icon: '👑',
      desc: 'Historical kingdoms and leadership',
      color: '#7f9a6c'
    }
  ];
  
  // ===== TRADITIONS SUB-TOPICS =====
  CULTURE_SUB['traditions'] = [
    {
      id: 'naming',
      name: 'Naming Conventions',
      icon: '📛',
      desc: extractSummary(MUSEUM_DATA['BotswanamingConventions'])
        || 'How names are chosen and their significance in Botswana culture'
    },
    {
      id: 'totems',
      name: 'Totems (Seboko)',
      icon: '🛡️',
      desc: extractSummary(MUSEUM_DATA['BotswanaTotems'])
        || 'Family clan symbols and their cultural meanings'
    },
    {
      id: 'marriage',
      name: 'Marriage Customs',
      icon: '💒',
      desc: extractSummary(MUSEUM_DATA['BotswnanaMarriageCustoms'])
        || 'Traditional wedding practices and ceremonies'
    }
  ];
  
  // ===== CEREMONIES SUB-TOPICS =====
  CULTURE_SUB['ceremonies'] = [
    {
      id: 'initiation',
      name: 'Initiation Ceremonies (Bogwera & Bojale)',
      icon: '🎭',
      desc: extractSummary(MUSEUM_DATA['InitiationCeremoniesBogweraandBojale'])
        || 'Coming-of-age rituals for boys and girls'
    },
    {
      id: 'funerals',
      name: 'Funeral Rites',
      icon: '⚰️',
      desc: extractSummary(MUSEUM_DATA['BotswanaFuneralRites'])
        || 'Traditional mourning and burial practices'
    }
  ];
  
  // ===== MUSIC & DANCE SUB-TOPICS =====
  CULTURE_SUB['music-dance'] = [
    {
      id: 'traditional-music',
      name: 'Traditional Music',
      icon: '🎵',
      desc: extractSummary(MUSEUM_DATA['BotswaraTraditionalMusic'])
        || 'Instruments and musical styles of Botswana'
    },
    {
      id: 'traditional-general',
      name: 'Traditional Practices',
      icon: '🎭',
      desc: extractSummary(MUSEUM_DATA['BotswaraTraditional'])
        || 'General cultural and traditional practices'
    }
  ];
  
  // ===== FOLKLORE SUB-TOPICS =====
  CULTURE_SUB['stories'] = [
    {
      id: 'folklore',
      name: 'Folklore, Proverbs & Praise Poetry',
      icon: '📖',
      desc: extractSummary(MUSEUM_DATA['BotswanaFolkloreProvierbsPraisePoetry'])
        || 'Traditional stories, wise sayings, and poetry'
    }
  ];
  
  // ===== LANGUAGE SUB-TOPICS =====
  CULTURE_SUB['language'] = [
    {
      id: 'languages',
      name: 'Main & Minority Languages',
      icon: '🗣️',
      desc: extractSummary(MUSEUM_DATA['MainandMinorityLanguages'])
        || 'Setswana, English, and indigenous languages'
    }
  ];
  
  // ===== KINGDOMS SUB-TOPICS =====
  CULTURE_SUB['kingdoms'] = [
    {
      id: 'tswana-kingdoms',
      name: 'Tswana Kingdoms',
      icon: '👑',
      desc: extractSummary(MUSEUM_DATA['BotsvanaTswanaKingdoms'])
        || 'Historical kingdoms of the Tswana people'
    },
    {
      id: 'historical-people',
      name: 'Historical People',
      icon: '👑',
      desc: extractSummary(MUSEUM_DATA['BotswnanaHistoricalPeople'])
        || 'Important figures in Botswana history'
    }
  ];
}

function populateArtifacts() {
  ARTIFACTS = [];
  
  // ===== ANIMALS COLLECTION =====
  if (MUSEUM_DATA['BotswanaAnimals'] && !MUSEUM_DATA['BotswanaAnimals'].error) {
    ARTIFACTS.push({
      id: 'animals',
      name: 'Animals',
      icon: '🦁',
      count: MUSEUM_DATA['BotswanaAnimals'].animals?.length || 0,
      items: (MUSEUM_DATA['BotswanaAnimals'].animals || []).map(a => ({
        id: (a.id || a.name || 'unknown').toLowerCase().replace(/ /g, '-'),
        name: a.name || 'Unknown Animal',
        icon: a.icon || '🦁',
        desc: a.description || a.desc || 'No description available',
        scientificName: a.scientificName || '',
        habitat: a.habitat || '',
        tags: a.tags || ['wildlife']
      }))
    });
  }
  
  // ===== BIRDS COLLECTION =====
  if (MUSEUM_DATA['ComprehensiveGuidetoBotswnanasBirdsforTourists'] 
      && !MUSEUM_DATA['ComprehensiveGuidetoBotswnanasBirdsforTourists'].error) {
    const birdsData = MUSEUM_DATA['ComprehensiveGuidetoBotswnanasBirdsforTourists'];
    ARTIFACTS.push({
      id: 'birds',
      name: 'Birds',
      icon: '🦅',
      count: birdsData.birds?.length || 0,
      items: (birdsData.birds || []).map(b => ({
        id: (b.id || b.name || 'unknown').toLowerCase().replace(/ /g, '-'),
        name: b.name || 'Unknown Bird',
        icon: b.icon || '🦅',
        desc: b.description || b.desc || 'No description available',
        scientificName: b.scientificName || '',
        habitat: b.habitat || '',
        tags: b.tags || ['avian']
      }))
    });
  }
  
  // ===== PLANTS COLLECTION =====
  if (MUSEUM_DATA['BotswanaPlantsTrees'] && !MUSEUM_DATA['BotswanaPlantsTrees'].error) {
    ARTIFACTS.push({
      id: 'plants',
      name: 'Plants & Trees',
      icon: '🌳',
      count: MUSEUM_DATA['BotswanaPlantsTrees'].plants?.length || 0,
      items: (MUSEUM_DATA['BotswanaPlantsTrees'].plants || []).map(p => ({
        id: (p.id || p.name || 'unknown').toLowerCase().replace(/ /g, '-'),
        name: p.name || 'Unknown Plant',
        icon: p.icon || '🌿',
        desc: p.description || p.desc || 'No description available',
        scientificName: p.scientificName || '',
        habitat: p.habitat || '',
        tags: p.tags || ['botanical']
      }))
    });
  }
  
  // ===== FOODS COLLECTION =====
  if (MUSEUM_DATA['BotswanaFoodsandBeverages'] 
      && !MUSEUM_DATA['BotswanaFoodsandBeverages'].error) {
    ARTIFACTS.push({
      id: 'foods',
      name: 'Foods & Beverages',
      icon: '🍲',
      count: MUSEUM_DATA['BotswanaFoodsandBeverages'].foods?.length || 0,
      items: (MUSEUM_DATA['BotswanaFoodsandBeverages'].foods || []).map(f => ({
        id: (f.id || f.name || 'unknown').toLowerCase().replace(/ /g, '-'),
        name: f.name || 'Unknown Food',
        icon: f.icon || '🍳',
        desc: f.description || f.desc || 'No description available',
        ingredients: f.ingredients || [],
        tags: f.tags || ['culinary']
      }))
    });
  }
  
  // ===== TOTEMS COLLECTION =====
  if (MUSEUM_DATA['BotswanaTotems'] && !MUSEUM_DATA['BotswanaTotems'].error) {
    ARTIFACTS.push({
      id: 'totems',
      name: 'Totems (Seboko)',
      icon: '🛡️',
      count: MUSEUM_DATA['BotswanaTotems'].totems?.length || 0,
      items: (MUSEUM_DATA['BotswanaTotems'].totems || []).map(t => ({
        id: (t.id || t.name || 'unknown').toLowerCase().replace(/ /g, '-'),
        name: t.name || 'Unknown Totem',
        icon: t.icon || '🛡️',
        desc: t.description || t.desc || 'No description available',
        clans: t.clans || [],
        tags: t.tags || ['cultural']
      }))
    });
  }
}

function populateGames() {
  GAMES = [];
  
  // Game 1: History & People
  if (MUSEUM_DATA['BotswnanaHistoricalPeople'] 
      && !MUSEUM_DATA['BotswnanaHistoricalPeople'].error) {
    GAMES.push({
      id: 'history-game',
      title: 'Historical Figures',
      icon: '👑',
      desc: 'Test your knowledge of Botswana\'s important historical figures',
      questions: generateHistoricalQuestions(MUSEUM_DATA['BotswnanaHistoricalPeople'])
    });
  }
  
  // Game 2: Animals & Wildlife
  if (MUSEUM_DATA['BotswanaAnimals'] && !MUSEUM_DATA['BotswanaAnimals'].error) {
    GAMES.push({
      id: 'animals-game',
      title: 'Wildlife Challenge',
      icon: '🦁',
      desc: 'Can you identify Botswana\'s incredible animals?',
      questions: generateAnimalQuestions(MUSEUM_DATA['BotswanaAnimals'])
    });
  }
  
  // Game 3: Birds
  if (MUSEUM_DATA['ComprehensiveGuidetoBotswnanasBirdsforTourists']
      && !MUSEUM_DATA['ComprehensiveGuidetoBotswnanasBirdsforTourists'].error) {
    GAMES.push({
      id: 'birds-game',
      title: 'Bird Identification',
      icon: '🦅',
      desc: 'Spot and identify Botswana\'s native birds',
      questions: generateBirdQuestions(
        MUSEUM_DATA['ComprehensiveGuidetoBotswnanasBirdsforTourists']
      )
    });
  }
  
  // Game 4: Culture & Traditions
  if (MUSEUM_DATA['BotswaraTraditional'] && !MUSEUM_DATA['BotswaraTraditional'].error) {
    GAMES.push({
      id: 'culture-game',
      title: 'Cultural Knowledge',
      icon: '🎭',
      desc: 'Learn about Botswana\'s rich cultural traditions',
      questions: generateCultureQuestions(MUSEUM_DATA['BotswaraTraditional'])
    });
  }
  
  // If not enough games, add a default one
  if (GAMES.length === 0) {
    GAMES.push({
      id: 'default-game',
      title: 'Botswana Basics',
      icon: '📚',
      desc: 'Test your knowledge about Botswana',
      questions: [
        {
          q: 'What is the capital of Botswana?',
          options: ['Gaborone', 'Francistown', 'Maun', 'Serowe'],
          correct: 0
        },
        {
          q: 'What is the official language of Botswana?',
          options: ['Setswana', 'Afrikaans', 'Xhosa', 'Zulu'],
          correct: 0
        }
      ]
    });
  }
}

function populateMuseumInfo() {
  // Extract from Botswana Museums.json if available
  if (MUSEUM_DATA['BotswaraMuseums'] && !MUSEUM_DATA['BotswaraMuseums'].error) {
    const museumData = MUSEUM_DATA['BotswaraMuseums'];
    
    if (museumData.museums && museumData.museums.length > 0) {
      const mainMuseum = museumData.museums[0];
      
      MUSEUM_INFO = {
        name: mainMuseum.name || 'Botswana National Museum',
        phones: mainMuseum.phones || ['+267-391-3877'],
        emails: mainMuseum.emails || ['info@museum.org.bw'],
        address: mainMuseum.address || 'Museum Drive, Gaborone',
        hours: mainMuseum.hours || '9:00 AM - 5:00 PM',
        website: mainMuseum.website || 'www.museum.org.bw'
      };
    }
  }
  
  // If no data loaded, keep defaults (app won't crash)
  if (!MUSEUM_INFO) {
    MUSEUM_INFO = {
      name: 'Botswana National Museum',
      phones: ['+267-391-3877'],
      emails: ['info@museum.org.bw'],
      address: 'Museum Drive, Gaborone',
      hours: '9:00 AM - 5:00 PM',
      website: 'www.museum.org.bw'
    };
  }
}

// ============================================
// STEP 5: HELPER FUNCTIONS
// ============================================

/**
 * Extract summary text from JSON
 */
function extractSummary(data) {
  if (!data || data.error) return '';
  return data.summary || data.description || data.intro || '';
}

/**
 * Generate trivia questions from historical people JSON
 */
function generateHistoricalQuestions(jsonData) {
  const questions = [];
  
  if (!jsonData.people || jsonData.people.length === 0) {
    return getDefaultQuestions('history');
  }
  
  for (let i = 0; i < Math.min(jsonData.people.length, 5); i++) {
    const person = jsonData.people[i];
    questions.push({
      q: `Who was ${person.name}?`,
      options: [
        person.role || 'Historical figure',
        'A musician',
        'An explorer',
        'A trader'
      ],
      correct: 0
    });
  }
  
  return questions.length > 0 ? questions : getDefaultQuestions('history');
}

/**
 * Generate trivia questions from animals JSON
 */
function generateAnimalQuestions(jsonData) {
  const questions = [];
  
  if (!jsonData.animals || jsonData.animals.length === 0) {
    return getDefaultQuestions('animals');
  }
  
  for (let i = 0; i < Math.min(jsonData.animals.length, 5); i++) {
    const animal = jsonData.animals[i];
    if (animal.habitat) {
      questions.push({
        q: `Where do ${animal.name || 'this animal'}s live?`,
        options: [
          animal.habitat,
          'Rainforest',
          'Mountain peaks',
          'Desert only'
        ],
        correct: 0
      });
    }
  }
  
  return questions.length > 0 ? questions : getDefaultQuestions('animals');
}

/**
 * Generate trivia questions from birds JSON
 */
function generateBirdQuestions(jsonData) {
  const questions = [];
  
  if (!jsonData.birds || jsonData.birds.length === 0) {
    return getDefaultQuestions('birds');
  }
  
  for (let i = 0; i < Math.min(jsonData.birds.length, 5); i++) {
    const bird = jsonData.birds[i];
    questions.push({
      q: `What is the scientific name of the ${bird.name || 'bird'}?`,
      options: [
        bird.scientificName || 'Unknown species',
        'Aves botswana',
        'Avian africanus',
        'Ornithes africana'
      ],
      correct: 0
    });
  }
  
  return questions.length > 0 ? questions : getDefaultQuestions('birds');
}

/**
 * Generate trivia questions from culture JSON
 */
function generateCultureQuestions(jsonData) {
  const questions = [];
  
  // This depends on your specific culture JSON structure
  questions.push({
    q: 'What is the primary language spoken in Botswana?',
    options: ['Setswana', 'English', 'Afrikaans', 'Zulu'],
    correct: 0
  });
  
  return questions;
}

/**
 * Fallback questions if JSON data is missing
 */
function getDefaultQuestions(type) {
  const questions = {
    history: [
      {
        q: 'What is the capital of Botswana?',
        options: ['Gaborone', 'Francistown', 'Maun', 'Serowe'],
        correct: 0
      },
      {
        q: 'In what year did Botswana gain independence?',
        options: ['1966', '1975', '1980', '1990'],
        correct: 0
      }
    ],
    animals: [
      {
        q: 'What is the largest land animal in Botswana?',
        options: ['Elephant', 'Giraffe', 'Buffalo', 'Rhino'],
        correct: 0
      }
    ],
    birds: [
      {
        q: 'Which bird is the national bird of Botswana?',
        options: ['Kori Bustard', 'Crowned Eagle', 'Cape Parrot', 'Lilac-breasted Roller'],
        correct: 0
      }
    ],
    culture: [
      {
        q: 'What is "Setswana"?',
        options: ['The official language', 'A traditional dance', 'A ceremonial garment', 'A type of drum'],
        correct: 0
      }
    ]
  };
  
  return questions[type] || questions.history;
}

// ============================================
// STEP 6: INITIALIZATION
// ============================================

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. Replace this line at the end of your HTML:
 *    OLD: showTab('about');
 *    NEW: loadMuseumData().then(() => {
 *           showTab('about');
 *           updateNavHighlight();
 *         });
 * 
 * 2. Delete or comment out: updateNavHighlight();
 *    (it's called inside the .then() now)
 * 
 * EXAMPLE:
 */

/*
// BEFORE calling this, make sure your app is ready
loadMuseumData()
  .then(() => {
    showTab('about');
    updateNavHighlight();
  })
  .catch(err => {
    console.error("Failed to load museum data:", err);
    // App will still work with empty/default data
    showTab('about');
    updateNavHighlight();
  });
*/

// ============================================
// STEP 7: DEBUGGING HELPERS
// ============================================

function debugMuseumData() {
  console.table({
    DataLoaded: DATA_LOADED,
    FilesInMemory: Object.keys(MUSEUM_DATA).length,
    Cultures: CULTURES.length,
    Artifacts: ARTIFACTS.length,
    Games: GAMES.length,
    CultureSubtopics: Object.keys(CULTURE_SUB).length
  });
  
  console.log("Full MUSEUM_DATA:", MUSEUM_DATA);
  console.log("Full CULTURES:", CULTURES);
  console.log("Full ARTIFACTS:", ARTIFACTS);
  console.log("Full GAMES:", GAMES);
}

// Call this in browser console to see what's loaded:
// debugMuseumData()

// ============================================
// OPTIONAL: FILE VALIDATION HELPER
// ============================================

async function validateJSONFiles() {
  console.log("🔍 Validating JSON files...");
  
  const files = [
    'Botswana Animals.json',
    'Comprehensive Guide to Botswana\'s Birds for Tourists.json',
    // ... add all 24
  ];
  
  const results = {
    valid: [],
    invalid: [],
    missing: []
  };
  
  for (const file of files) {
    try {
      const response = await fetch(`./data/${file}`);
      if (response.ok) {
        const json = await response.json();
        results.valid.push(file);
      } else {
        results.invalid.push({ file, status: response.status });
      }
    } catch (err) {
      results.missing.push({ file, error: err.message });
    }
  }
  
  console.table(results);
  return results;
}

// ============================================
// END OF JSON INTEGRATION CODE
// ============================================

