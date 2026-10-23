// backend/scripts/seed_vachana_words.js
// Seeds the local MongoDB with initial vachanas and words of the day
// Usage: node scripts/seed_vachana_words.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Vachana from "../models/vachana_model.js";
import WordOfDay from "../models/wordofday_model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kannada_koota";

const today = new Date();
today.setHours(0, 0, 0, 0);

const dayBefore = (daysAgo) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d;
};

const VACHANAS = [
  {
    titleKannada: "ಕಳಬೇಡ, ಕೊಲಬೇಡ",
    titleEnglish: "Do Not Steal, Do Not Kill",
    authorKannada: "ಬಸವಣ್ಣ (Basavanna)",
    authorEnglish: "Basavanna (12th Century Mystic & Social Reformer)",
    originalVerses: [
      "ಕಳಬೇಡ, ಕೊಲಬೇಡ, ಹುಸಿಯ ನುಡಿಯಲು ಬೇಡ,",
      "ಮುನಿಯಬೇಡ, ಅನ್ಯರಿಗೆ ಅಸಹ್ಯಪಡಬೇಡ,",
      "ತನ್ನ ಬಣ್ಣಿಸಬೇಡ, ಇದಿರ ಹಳಿಯಲು ಬೇಡ.",
      "ಇದೇ ಅಂತರಂಗಶುದ್ಧಿ, ಇದೇ ಬಹಿರಂಗಶುದ್ಧಿ,",
      "ಇದೇ ನಮ್ಮ ಕೂಡಲಸಂಗಮದೇವರನೊಲಿಸುವ ಪರಿ.",
    ],
    englishTranslation: [
      "Do not steal, do not kill, do not utter lies,",
      "Do not lose temper, do not harbor revulsion towards others,",
      "Do not boast of yourself, do not demean those before you.",
      "This alone is inner purity, this alone is outer purity,",
      "This is the only path that pleases our Lord Kudalasangama.",
    ],
    date: today, // Today's featured vachana
    isActive: true,
  },
  {
    titleKannada: "ಬೆಟ್ಟದ ಮೇಲೊಂದು ಮನೆಯ ಮಾಡಿ",
    titleEnglish: "Having Built a Home Upon the Hill",
    authorKannada: "ಅಕ್ಕಮಹಾದೇವಿ (Akka Mahadevi)",
    authorEnglish: "Akka Mahadevi (12th Century Rebel Mystic)",
    originalVerses: [
      "ಬೆಟ್ಟದ ಮೇಲೊಂದು ಮನೆಯ ಮಾಡಿ ಮೃಗಂಗಳಿಗಂಜಿದಡೆಂತಯ್ಯಾ?",
      "ಸಮುದ್ರದ ತಡಿಯಲೊಂದು ಮನೆಯ ಮಾಡಿ ನೊರೆ ತೆರೆಗಳಿಗಂಜಿದಡೆಂತಯ್ಯಾ?",
      "ಸಂತೆಯೊಳಗೊಂದು ಮನೆಯ ಮಾಡಿ ಶಬ್ದಕ್ಕಂಜಿದಡೆಂತಯ್ಯಾ?",
      "ಚೆನ್ನಮಲ್ಲಿಕಾರ್ಜುನದೇವ ಕೇಳಯ್ಯಾ,",
      "ಲೋಕದೊಳಗೆ ಹುಟ್ಟಿದ ಬಳಿಕ ಸ್ತುತಿ ನಿಂದೆಗಳು ಬಂದಡೆ ಮನದಲ್ಲಿ ಕೋಪವ ತಾಳದೆ ಸಮಾಧಾನಿಯಾಗಿರಬೇಕು.",
    ],
    englishTranslation: [
      "Having built a home atop the mountain, how can one fear wild beasts?",
      "Having built a house upon the ocean shore, how can one fear crashing waves?",
      "Having built a dwelling in the midst of a bazaar, how can one fear noise?",
      "Listen, O Lord Chennamallikarjuna,",
      "Once born into this world, when praise or slander arrives, one must banish anger and remain serene.",
    ],
    date: dayBefore(1), // Yesterday
    isActive: true,
  },
  {
    titleKannada: "ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ",
    titleEnglish: "Victory to Mother Karnataka",
    authorKannada: "ಕುವೆಂಪು (Rashtrakavi Kuvempu)",
    authorEnglish: "Rashtrakavi Kuvempu (K.V. Puttappa)",
    originalVerses: [
      "ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ,",
      "ಜಯ ಹೇ ಕರ್ನಾಟಕ ಮಾತೆ!",
      "ಜಯ ಸುಂದರ ನದಿ ವನಗಳ ನಾಡೇ,",
      "ಜಯ ಹೇ ರಸಋಷಿಗಳ ಬೀಡೇ!",
      "ಸರ್ವ ಜನಾಂಗದ ಶಾಂತಿಯ ತೋಟ,",
      "ರಸಿಕರ ಕಂಗಳ ಸೆಳೆಯುವ ನೋಟ!",
    ],
    englishTranslation: [
      "Victory to thee, revered daughter of Mother India,",
      "Victory to thee, O Mother Karnataka!",
      "Land of glistening rivers and sacred emerald forests,",
      "Sanctuary of poets, mystics, and enlightened seers!",
      "A peaceful garden sheltering people of every heritage and creed!",
    ],
    date: dayBefore(2), // 2 days ago
    isActive: true,
  },
];

const WORDS = [
  {
    wordKannada: "ಆತ್ಮೀಯತೆ",
    transliteration: "Aatmeeyate",
    partOfSpeech: "ನಾಮಪದ (Noun)",
    meaningEnglish:
      "Warm, hospitable kinship; genuine affection from the core of one's soul.",
    exampleSentenceKannada:
      "ನಮ್ಮ ಕನ್ನಡ ಕೂಟಕ್ಕೆ ಬರುವ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಆತ್ಮೀಯತೆಯ ಸ್ವಾಗತ.",
    exampleSentenceEnglish:
      "A warm, affectionate welcome awaits every student who walks into Kannada Koota.",
    date: today,
    isActive: true,
  },
  {
    wordKannada: "ಬೆರಗು",
    transliteration: "Beragu",
    partOfSpeech: "ಭಾವನಾತ್ಮಕ ನಾಮಪದ (Noun)",
    meaningEnglish:
      "Wonderment, sublime awe, being spellbound by pure artistic beauty.",
    exampleSentenceKannada:
      "ಹಂಪಿಯ ಶಿಲ್ಪಕಲೆಯ ಕೆತ್ತನೆಯನ್ನು ನೋಡಿ ಕಣ್ಣುಗಳಲ್ಲಿ ಬೆರಗು ಮೂಡಿತು.",
    exampleSentenceEnglish:
      "Witnessing the intricate stone sculptures of Hampi filled our eyes with spellbinding wonder.",
    date: dayBefore(1),
    isActive: true,
  },
  {
    wordKannada: "ಸಂಭ್ರಮ",
    transliteration: "Sambhrama",
    partOfSpeech: "ನಾಮಪದ (Noun)",
    meaningEnglish:
      "Jubilant festivity, communal excitement, high-spirited celebration.",
    exampleSentenceKannada:
      "ಪಿ.ಇ.ಎಸ್ ಆವರಣದಲ್ಲಿ ರಾಜ್ಯೋತ್ಸವದ ರಂಗು ಹಾಗೂ ಸಂಭ್ರಮ ತುಂಬಿ ತುಳುಕುತ್ತಿದೆ.",
    exampleSentenceEnglish:
      "The PES campus is overflowing with festive color and jubilant celebration for Rajyotsava.",
    date: dayBefore(2),
    isActive: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB:", MONGO_URI);

    // Clear existing data
    await Vachana.deleteMany({});
    console.log("🗑️  Cleared existing vachanas");

    await WordOfDay.deleteMany({});
    console.log("🗑️  Cleared existing words of the day");

    // Insert seed data
    const insertedVachanas = await Vachana.insertMany(VACHANAS);
    console.log(`✅ Seeded ${insertedVachanas.length} vachanas`);

    const insertedWords = await WordOfDay.insertMany(WORDS);
    console.log(`✅ Seeded ${insertedWords.length} words of the day`);

    console.log("\n🎉 Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
