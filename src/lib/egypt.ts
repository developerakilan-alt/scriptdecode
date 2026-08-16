export interface Sign {
  glyph: string;
  transliteration: string;
  meaning: string;
}

export const SIGNS: Record<string, Sign> = {
  "𓄿": { glyph: "𓄿", transliteration: "ꜣ / a", meaning: "vulture — the sound 'a'" },
  "𓃀": { glyph: "𓃀", transliteration: "b", meaning: "foot — the sound 'b'" },
  "𓈖": { glyph: "𓈖", transliteration: "n", meaning: "water ripple — the sound 'n'" },
  "𓉐": { glyph: "𓉐", transliteration: "pr", meaning: "house — 'pr', a temple or estate" },
  "𓏏": { glyph: "𓏏", transliteration: "t", meaning: "bread loaf — the sound 't'" },
  "𓂓": { glyph: "𓂓", transliteration: "kꜣ / ka", meaning: "two arms raised — the ka, life force" },
  "𓇳": { glyph: "𓇳", transliteration: "rꜥ / re", meaning: "sun — the sun god Ra" },
  "𓇋": { glyph: "𓇋", transliteration: "j / i", meaning: "reed — the sound 'i' or 'j'" },
  "𓅱": { glyph: "𓅱", transliteration: "w", meaning: "quail chick — the sound 'w'" },
  "𓋴": { glyph: "𓋴", transliteration: "s", meaning: "folded cloth — the sound 's'" },
  "𓋹": { glyph: "𓋹", transliteration: "ꜥnḫ / ankh", meaning: "ankh — life, to live" },
  "𓌀": { glyph: "𓌀", transliteration: "nḫt / nekht", meaning: "basket — strong, victory" },
  "𓊪": { glyph: "𓊪", transliteration: "p", meaning: "stool — the sound 'p'" },
  "𓂋": { glyph: "𓂋", transliteration: "r", meaning: "mouth — the sound 'r', to speak" },
  "𓎛": { glyph: "𓎛", transliteration: "ḥ / h", meaning: "wick — the sound 'h'" },
  "𓎢": { glyph: "𓎢", transliteration: "k", meaning: "basket with handle — the sound 'k'" },
  "𓆑": { glyph: "𓆑", transliteration: "f", meaning: "horned viper — the sound 'f'" },
  "𓂝": { glyph: "𓂝", transliteration: "ꜥ / a", meaning: "forearm — the sound 'a', to act" },
  "𓅓": { glyph: "𓅓", transliteration: "m", meaning: "owl — the sound 'm'" },
  "𓂧": { glyph: "𓂧", transliteration: "d", meaning: "hand — the sound 'd'" },
  "𓅭": { glyph: "𓅭", transliteration: "sꜣ / sa", meaning: "duckling — son" },
  "𓎟": { glyph: "𓎟", transliteration: "nb / neb", meaning: "basket — lord, master, all" },
  "𓇾": { glyph: "𓇾", transliteration: "tꜣ / ta", meaning: "sand strip — land, earth" },
  "𓆤": { glyph: "𓆤", transliteration: "bjt / bit", meaning: "bee — the King of Lower Egypt" },
  "𓊽": { glyph: "𓊽", transliteration: "ḏd / djed", meaning: "djed pillar — stability, endurance" },
  "𓆸": { glyph: "𓆸", transliteration: "wḏꜣ / wedja", meaning: "wedjat eye — sound, prosperous, healed" },
  "𓇓": { glyph: "𓇓", transliteration: "nswt / nesut", meaning: "sedge — the King of Upper Egypt" },
  "𓄫": { glyph: "𓄫", transliteration: "nfr / nefer", meaning: "heart and trachea — beautiful, good, perfect" },
  "𓊹": { glyph: "𓊹", transliteration: "nṯr / netjer", meaning: "god, divine" },
  "𓆄": { glyph: "𓆄", transliteration: "mꜣꜥ / maat", meaning: "feather of Maat — truth, justice" },
  "𓐍": { glyph: "𓐍", transliteration: "ḫ / kh", meaning: "placenta — the sound 'kh'" },
  "𓀀": { glyph: "𓀀", transliteration: "j (man)", meaning: "seated man — masculine marker" },
  "𓁐": { glyph: "𓁐", transliteration: "t (woman)", meaning: "seated woman — feminine marker" },
  "𓇼": { glyph: "𓇼", transliteration: "sbꜣ / seba", meaning: "star — star, door, to teach" },
  "𓆓": { glyph: "𓆓", transliteration: "ḏ / dj", meaning: "cobra — the sound 'dj'" },
  "𓏪": { glyph: "𓏪", transliteration: "y / yy", meaning: "double stroke — dual or plural ending" },
  "𓏺": { glyph: "𓏺", transliteration: "j / one", meaning: "single stroke — ideographic marker" },
  "𓏥": { glyph: "𓏥", transliteration: "plural", meaning: "plural strokes — makes a word plural" },
  "𓁹": { glyph: "𓁹", transliteration: "jr / ir", meaning: "eye — to see, to do, to make" },
  "𓂸": { glyph: "𓂸", transliteration: "walk", meaning: "leg — to walk, motion" },
  "𓊨": { glyph: "𓊨", transliteration: "st / set", meaning: "throne seat — seat, place" },
  "𓊵": { glyph: "𓊵", transliteration: "ḥtp / hotep", meaning: "offering table — peace, offering, satisfied" },
  "𓈘": { glyph: "𓈘", transliteration: "dj / di", meaning: "loaf on mat — to give" },
  "𓉻": { glyph: "𓉻", transliteration: "pr-ꜥꜣ", meaning: "great house — the pharaoh" },
  "𓆼": { glyph: "𓆼", transliteration: "ḥḥ / hh", meaning: "tadpole — one hundred thousand" },
};

export interface Phrase {
  name: string;
  partial: string;
  full: string;
  transliteration: string;
  english: string;
}

export const PHRASES: Phrase[] = [
  {
    name: "Ankh Wedja Seneb",
    partial: "𓋹𓆸",
    full: "𓋹𓆸𓋴𓈖𓃀",
    transliteration: "ꜥnḫ wḏꜣ snb",
    english: "Life, prosperity, health — the classic greeting of good wishes.",
  },
  {
    name: "Djed Medu",
    partial: "𓊽",
    full: "𓊽𓅓𓂧𓅱",
    transliteration: "ḏd mdw",
    english: "Words spoken by — the standard opening of spells and tomb texts.",
  },
  {
    name: "Per Ankh",
    partial: "𓉐",
    full: "𓉐𓋹",
    transliteration: "pr ꜥnḫ",
    english: "House of Life — the temple library and center of sacred learning.",
  },
  {
    name: "Nesut Bit",
    partial: "𓇓",
    full: "𓇓𓆤",
    transliteration: "nswt bjtj",
    english: "King of Upper and Lower Egypt — one of the five great royal titles.",
  },
  {
    name: "Sa Re",
    partial: "𓅭",
    full: "𓅭𓇳",
    transliteration: "sꜣ rꜥ",
    english: "Son of Ra — royal title identifying the pharaoh as divine heir.",
  },
  {
    name: "Neb Tawy",
    partial: "𓎟",
    full: "𓎟𓇾𓇾",
    transliteration: "nb tꜣwj",
    english: "Lord of the Two Lands — ruler of Upper and Lower Egypt.",
  },
  {
    name: "Nefer",
    partial: "𓄫",
    full: "𓄫",
    transliteration: "nfr",
    english: "Beautiful, good, perfect — a word of praise in inscriptions.",
  },
  {
    name: "Wasir",
    partial: "𓊨",
    full: "𓊨𓁹",
    transliteration: "wsjr",
    english: "Osiris — god of the afterlife, resurrection and the dead.",
  },
  {
    name: "Maat Kheru",
    partial: "𓆄",
    full: "𓆄𓐍𓂋𓅱",
    transliteration: "mꜣꜥ ḫrw",
    english: "True of voice — the deceased justified before the gods.",
  },
  {
    name: "Hotep Di Nesut",
    partial: "𓎛𓏏𓊵𓏏",
    full: "𓎛𓏏𓊵𓏏𓊪𓏏𓈘𓇓𓆤",
    transliteration: "ḥtp ḏj nswt",
    english: "An offering the king gives — the opening of the funerary offering formula.",
  },
  {
    name: "Ankh Djet",
    partial: "𓋹",
    full: "𓋹𓆓𓏏𓈖",
    transliteration: "ꜥnḫ ḏt",
    english: "Living for eternity — a wish carved on tombs and amulets.",
  },
];

export function translateGlyphs(text: string): { glyph: string; meaning: string; known: boolean }[] {
  const out: { glyph: string; meaning: string; known: boolean }[] = [];
  for (const ch of Array.from(text)) {
    if (ch.trim() === "") continue;
    const sign = SIGNS[ch];
    out.push({
      glyph: ch,
      meaning: sign ? sign.meaning : "unidentified sign",
      known: Boolean(sign),
    });
  }
  return out;
}

export function translateTransliteration(text: string): { word: string; meaning: string; known: boolean }[] {
  const words = text.toLowerCase().split(/[^a-zꜣ]|[\s,;]+/).filter(Boolean);
  const map: Record<string, string> = {
    ankh: "life, to live",
    wedja: "sound, prosperous, healed",
    seneb: "health",
    nefer: "beautiful, good, perfect",
    re: "the sun god Ra",
    pr: "house, temple, estate",
    neb: "lord, master, all",
    tawy: "the Two Lands (Upper and Lower Egypt)",
    sa: "son",
    nesut: "king of Upper Egypt",
    bit: "bee / king of Lower Egypt",
    djed: "stability, endurance",
    maat: "truth, justice, order",
    hotep: "peace, offering, satisfied",
    wasir: "Osiris, god of the afterlife",
    osiris: "Osiris, god of the afterlife",
    djet: "eternity",
    kheru: "voice, words",
    per: "house, temple, estate",
  };
  return words.map((w) => ({
    word: w,
    meaning: map[w] ?? "word not in the local dictionary",
    known: Boolean(map[w]),
  }));
}

export function completePhrase(partial: string): {
  phrase: Phrase;
  matchedBy: "glyphs" | "transliteration";
  reconstructed: string;
} | null {
  const input = partial.trim();
  if (!input) return null;

  const byGlyph = PHRASES.find((p) => p.full.startsWith(input) || p.partial.startsWith(input));
  if (byGlyph) {
    return {
      phrase: byGlyph,
      matchedBy: "glyphs",
      reconstructed: byGlyph.full.slice(input.length),
    };
  }

  const normalized = input.toLowerCase().replace(/[^a-z]/g, "").trim();
  const byTranslit = PHRASES.find((p) => {
    const translit = p.transliteration.toLowerCase().replace(/[^a-zꜣ]/g, "");
    const words = p.transliteration.toLowerCase().split(/\s+/);
    return words.some((w) => w.startsWith(normalized) && normalized.length >= 2) || translit.startsWith(normalized);
  });
  if (byTranslit) {
    return {
      phrase: byTranslit,
      matchedBy: "transliteration",
      reconstructed: byTranslit.full,
    };
  }
  return null;
}

export function randomPhrase(): Phrase {
  return PHRASES[Math.floor(Math.random() * PHRASES.length)];
}

export interface Topic {
  key: string;
  keywords: string[];
  title: string;
  points: string[];
}

export const TOPICS: Topic[] = [
  {
    key: "pyramid",
    keywords: ["pyramid", "pyramids", "giza", "khufu", "cheops", "building pyramids", "tomb of pharaoh"],
    title: "The Pyramids of Egypt",
    points: [
      "The Great Pyramid of Giza was built for Pharaoh Khufu around 2560 BCE and stood 146.6 meters (481 ft) tall — the tallest structure on Earth for over 3,800 years.",
      "It is the only one of the Seven Wonders of the Ancient World still standing today.",
      "Pyramids were royal tombs designed to protect the pharaoh's body and guarantee his rebirth into the afterlife.",
      "They were built by a large, organized workforce of skilled laborers, not slaves, who lived in nearby workers' villages.",
      "The four sides align almost perfectly with the cardinal directions, showing the Egyptians' advanced knowledge of astronomy.",
    ],
  },
  {
    key: "mummy",
    keywords: ["mummy", "mummif", "mummying", "embalm", "preserve body", "bandage"],
    title: "Mummification",
    points: [
      "Mummification preserved the body so the ka (life force) and ba (personality) could reunite with it in the afterlife.",
      "The process took about 70 days, led by a priest known as the 'hem-netjer' (servant of the god).",
      "Internal organs were removed and placed in canopic jars, guarded by the four sons of Horus.",
      "The heart was left in the body because it was believed to be weighed against the feather of Maat in the judgment of the dead.",
      "The body was dried with natron salt for 40 days, then wrapped in up to 20 layers of linen with amulets tucked between the layers.",
    ],
  },
  {
    key: "hieroglyph",
    keywords: ["hieroglyph", "writing", "glyph", "script", "rosetta", "scribe", "papyrus"],
    title: "Hieroglyphs — The Sacred Writing",
    points: [
      "Hieroglyphs were used for nearly 3,500 years, from around 3200 BCE to 400 CE, combining logograms (word signs) and phonetic signs.",
      "The name comes from Greek meaning 'sacred carvings', but Egyptians called it 'medu netjer' — the god's words.",
      "There were three scripts: hieroglyphic (monumental), hieratic (priestly cursive), and demotic (everyday script).",
      "They were read in rows or columns, from right to left or left to right — the animals in the signs always face the start of the line.",
      "The Rosetta Stone (1799) unlocked the script; Champollion deciphered it in 1822 using the name 'Ptolemy' as the key.",
    ],
  },
  {
    key: "cleopatra",
    keywords: ["cleopatra", "ptolemy", "ptolemaic", "queen of egypt", "pharaoh queen"],
    title: "Cleopatra VII — The Last Pharaoh",
    points: [
      "Cleopatra VII ruled Egypt from 51 to 30 BCE and was the last active ruler of the Ptolemaic dynasty.",
      "She was not Egyptian by blood but a descendant of Ptolemy I, a general of Alexander the Great — yet she learned the Egyptian language.",
      "She formed political and romantic alliances with Julius Caesar and later Mark Antony to protect Egypt's independence.",
      "Her kingdom was finally absorbed by Rome after her defeat at the Battle of Actium in 31 BCE.",
      "According to tradition, she died by suicide in 30 BCE, ending over 3,000 years of pharaonic rule.",
    ],
  },
  {
    key: "tutankhamun",
    keywords: ["tutankhamun", "tut", "king tut", "boy king", "tomb of", "kv62"],
    title: "Tutankhamun — The Boy King",
    points: [
      "Tutankhamun became pharaoh at about age 9 and ruled from 1332 to 1323 BCE, dying in his late teens.",
      "His name means 'the living image of Amun', and he restored the worship of the old gods after Akhenaten's religious revolution.",
      "His tomb (KV62) in the Valley of the Kings was found nearly intact by Howard Carter in November 1922.",
      "The tomb contained over 5,000 artifacts, including the famous solid-gold funerary mask now in the Egyptian Museum, Cairo.",
      "He is one of the best-known pharaohs precisely because his tomb survived unlooted for more than 3,000 years.",
    ],
  },
  {
    key: "nile",
    keywords: ["nile", "river", "flood", "inundation", "agriculture", "fertile"],
    title: "The Nile — Egypt's Lifeline",
    points: [
      "The Nile flows over 6,600 km from the highlands of East Africa to the Mediterranean — the longest river on Earth.",
      "Its annual flood (the 'inundation') deposited rich black silt that made farming possible in an otherwise barren desert.",
      "Egyptians called their land 'Kemet' (the Black Land) for the fertile soil, and the desert 'Deshret' (the Red Land).",
      "The river served as the country's highway, carrying food, stone, and goods between Upper and Lower Egypt.",
      "The flood season was a time of national labor — peasants built temples, pyramids, and public works while fields were underwater.",
    ],
  },
  {
    key: "temple",
    keywords: ["temple", "karnak", "luxor", "abu simbel", "abydos", "edfu", "philae"],
    title: "The Great Temples",
    points: [
      "Temples were believed to be the earthly homes of the gods, not places of public worship as in later religions.",
      "The Karnak temple complex at Luxor was the largest religious building ever constructed, added to for over 1,500 years.",
      "Priests performed daily rituals: waking the god's statue, dressing it, and offering food, drink, and incense.",
      "The great temple of Abu Simbel was carved into a cliff by Ramesses II and later relocated stone by stone to save it from flooding.",
      "Only the pharaoh and high priests entered the innermost sanctuary, while ordinary people gathered in the outer courts.",
    ],
  },
  {
    key: "anubis",
    keywords: ["anubis", "jackal", "god of the dead", "mummy god", "embalming god", "weighing"],
    title: "Anubis — Guardian of the Dead",
    points: [
      "Anubis was the jackal-headed god of mummification, cemeteries, and the protection of the dead.",
      "He is credited with inventing mummification by embalming Osiris after the god was murdered by Set.",
      "In the Judgment Hall, Anubis weighed the deceased's heart against the feather of Maat, reporting the result to Thoth.",
      "Jackals were chosen for his form because they roamed the desert edges where graves were carved.",
      "His emblem, the jackal-on-a-standard, was carried before coffins in funeral processions.",
    ],
  },
  {
    key: "pharaoh",
    keywords: ["pharaoh", "king", "dynasty", "ramesses", "ramses", "thutmose", "akhenaten", "royal"],
    title: "The Pharaoh — Living God of Egypt",
    points: [
      "The pharaoh was considered the living incarnation of Horus on Earth and the intermediary between the gods and the people.",
      "He held the crown of Upper Egypt (white) and Lower Egypt (red), and wore the double crown as ruler of both lands.",
      "He was the supreme military commander, chief priest, and highest judge of the land.",
      "The five great names of the king (including 'Son of Ra' and 'King of Upper and Lower Egypt') proclaimed his divine role.",
      "Ramesses II, ruling 66 years, was one of the most powerful and prolific builder pharaohs, with over 200 monuments.",
    ],
  },
  {
    key: "book",
    keywords: ["book of the dead", "book of coming forth", "spells", "afterlife", "weighing of the heart", "amulet"],
    title: "The Book of the Dead",
    points: [
      "The Book of the Dead (properly 'Chapters of Coming Forth by Day') was a collection of about 190 spells for the afterlife.",
      "It was written on papyrus scrolls and placed in the tomb to guide the deceased through the perils of the underworld.",
      "The famous 'Weighing of the Heart' scene shows the heart balanced against the feather of Maat before Osiris.",
      "If the heart was lighter than the feather, the deceased was reborn; if heavier, it was devoured by Ammit, the 'Devourer'.",
      "Copies were custom-made for the wealthy, while poorer people could buy pre-written scrolls and fill in their names.",
    ],
  },
  {
    key: "sphinx",
    keywords: ["sphinx", "great sphinx", "giza sphinx", "sphinx of"],
    title: "The Great Sphinx",
    points: [
      "The Great Sphinx of Giza is a colossal limestone statue with a lion's body and a human head, 73 meters long and 20 meters tall.",
      "It is generally believed to depict Pharaoh Khafre (c. 2558–2532 BCE) and stands guard over his pyramid.",
      "The name 'sphinx' is Greek and means 'strangler', though Egyptians called it 'Hor-em-akhet' — Horus of the Horizon.",
      "For centuries it was buried up to its neck in sand; it was first cleared in the early 19th century and restored repeatedly since.",
      "Ancient Egyptians themselves treated it as a god, and a small temple between its paws was used for worship.",
    ],
  },
  {
    key: "ra",
    keywords: ["ra", "re", "sun god", "amun", "aten", "sun worship", "solar deity"],
    title: "Ra — The Sun God",
    points: [
      "Ra was the supreme sun god and creator, believed to travel the sky in a solar barque by day and the underworld by night.",
      "By the New Kingdom he was merged with Amun into Amun-Ra, the 'king of the gods'.",
      "His nightly journey through the underworld passed through twelve hours, defeating the serpent Apep (Apophis) each dawn.",
      "The pharaohs took the title 'Son of Ra' to claim divine legitimacy and rule.",
      "Pharaoh Akhenaten briefly replaced the pantheon with the worship of a single solar disk, the Aten.",
    ],
  },
];

export function answerQuestion(question: string): Topic {
  const q = question.toLowerCase();
  let best: Topic | null = null;
  let bestScore = 0;
  for (const topic of TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }
  return best ?? {
    key: "egypt",
    keywords: [],
    title: "Ancient Egypt — Overview",
    points: [
      "Ancient Egyptian civilization lasted over 3,000 years (c. 3100 BCE – 30 BCE) along the Nile River.",
      "It was ruled by pharaohs who were seen as living gods, uniting Upper and Lower Egypt under a single crown.",
      "The Egyptians developed hieroglyphic writing, mathematics, medicine, and monumental architecture.",
      "Their religion centered on the afterlife, with mummification, tombs, temples, and powerful deities like Osiris, Ra, and Anubis.",
      "Greek and Roman conquests ended pharaonic rule, but Egypt's art, science, and monuments still shape our world today.",
    ],
  };
}

export function formatAnswer(topic: Topic): string {
  const lines = topic.points.map((p, i) => `${i + 1}. ${p}`);
  return `**${topic.title}**\n\n${lines.join("\n")}`;
}
