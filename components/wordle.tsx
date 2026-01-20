"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

const WORD_LENGTH = 5
const MAX_GUESSES = 6

// Words that can be answers (curated common words)
const ANSWER_WORDS = [
  "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again",
  "agent", "agree", "ahead", "alarm", "album", "alert", "alien", "align", "alike", "alive",
  "allow", "alone", "along", "alter", "among", "angel", "anger", "angle", "angry", "apart",
  "apple", "apply", "arena", "argue", "arise", "array", "aside", "asset", "avoid", "award",
  "aware", "awful", "basic", "basis", "beach", "began", "begin", "being", "below", "bench",
  "berry", "birth", "black", "blade", "blame", "blank", "blast", "blaze", "blend", "bless",
  "blind", "block", "blood", "board", "boost", "booth", "bound", "brain", "brand", "brass",
  "brave", "bread", "break", "breed", "brick", "bride", "brief", "bring", "broad", "broke",
  "brown", "brush", "build", "built", "burst", "buyer", "cabin", "cable", "candy", "carry",
  "catch", "cause", "chain", "chair", "chart", "chase", "cheap", "check", "chest", "chief",
  "child", "china", "chose", "civil", "claim", "class", "clean", "clear", "click", "climb",
  "clock", "close", "cloth", "cloud", "coach", "coast", "coral", "couch", "could", "count",
  "court", "cover", "craft", "crane", "crank", "crash", "crawl", "crazy", "cream", "crime",
  "crisp", "cross", "crowd", "crown", "crude", "crush", "curve", "cycle", "daily", "dance",
  "dated", "dealt", "death", "debut", "delay", "depth", "doing", "doubt", "dozen", "draft",
  "drain", "drama", "drank", "drawn", "dream", "dress", "dried", "drink", "drive", "drove",
  "drunk", "dusty", "dying", "eager", "early", "earth", "eight", "elite", "empty", "enemy",
  "enjoy", "enter", "entry", "equal", "error", "essay", "event", "every", "exact", "exist",
  "extra", "faced", "faith", "false", "fancy", "fatal", "fault", "favor", "feast", "fence",
  "fever", "fiber", "field", "fifth", "fifty", "fight", "final", "first", "fixed", "flame",
  "flash", "flesh", "float", "flood", "floor", "flour", "fluid", "flush", "focus", "force",
  "forge", "forth", "forty", "forum", "found", "frame", "frank", "fraud", "fresh", "front",
  "frost", "fruit", "fully", "funny", "ghost", "giant", "given", "glass", "globe", "glory",
  "going", "grace", "grade", "grain", "grand", "grant", "grape", "grasp", "grass", "grave",
  "great", "green", "greet", "grief", "grill", "grind", "gross", "group", "grown", "guard",
  "guess", "guest", "guide", "guild", "guilt", "habit", "happy", "harsh", "haste", "haven",
  "heart", "heavy", "hello", "hence", "honey", "honor", "horse", "hotel", "house", "human",
  "humor", "ideal", "image", "imply", "index", "inner", "input", "issue", "japan", "jewel",
  "joint", "judge", "juice", "knife", "knock", "known", "label", "labor", "large", "laser",
  "later", "laugh", "layer", "learn", "lease", "least", "leave", "legal", "lemon", "level",
  "light", "limit", "linen", "links", "liver", "local", "lodge", "logic", "loose", "lover",
  "lower", "loyal", "lucky", "lunch", "lying", "magic", "major", "maker", "march", "marry",
  "match", "maybe", "mayor", "meant", "medal", "media", "melon", "mercy", "merge", "merit",
  "merry", "metal", "meter", "might", "minor", "minus", "mixed", "model", "money", "month",
  "moral", "motor", "mount", "mouse", "mouth", "moved", "movie", "muddy", "music", "naked",
  "named", "nasty", "naval", "nerve", "never", "newly", "night", "ninth", "noble", "noise",
  "north", "notch", "noted", "novel", "nurse", "occur", "ocean", "offer", "often", "olive",
  "onset", "opera", "orbit", "order", "organ", "other", "ought", "ounce", "outer", "owned",
  "owner", "oxide", "ozone", "paint", "panel", "panic", "paper", "party", "pasta", "paste",
  "patch", "pause", "peace", "pearl", "pedal", "penny", "phase", "phone", "photo", "piano",
  "piece", "pilot", "pinch", "pitch", "place", "plain", "plane", "plant", "plate", "plaza",
  "plead", "point", "polar", "posed", "pound", "power", "press", "price", "pride", "prime",
  "print", "prior", "prize", "probe", "prone", "proof", "proud", "prove", "proxy", "pulse",
  "punch", "pupil", "purse", "queen", "query", "quest", "quick", "quiet", "quite", "quota",
  "quote", "radar", "radio", "raise", "rally", "ranch", "range", "rapid", "ratio", "reach",
  "react", "realm", "rebel", "refer", "reign", "relax", "reply", "rider", "ridge", "rifle",
  "right", "rigid", "risky", "rival", "river", "roast", "robot", "rocky", "roman", "rough",
  "round", "route", "royal", "rugby", "ruler", "rural", "sadly", "saint", "salad", "sales",
  "sandy", "sauce", "saved", "scale", "scene", "scent", "scope", "score", "scout", "scrap",
  "seize", "sense", "serve", "setup", "seven", "shade", "shaft", "shake", "shall", "shame",
  "shape", "share", "shark", "sharp", "sheep", "sheer", "sheet", "shelf", "shell", "shift",
  "shine", "shiny", "shirt", "shock", "shoot", "shore", "short", "shout", "shown", "shrug",
  "sight", "sigma", "silly", "since", "sixth", "sixty", "sized", "skill", "slave", "sleep",
  "slice", "slide", "slope", "small", "smart", "smell", "smile", "smith", "smoke", "snake",
  "sneak", "solar", "solid", "solve", "sorry", "sound", "south", "space", "spare", "spark",
  "speak", "speed", "spend", "spent", "spice", "spill", "spine", "spite", "split", "spoke",
  "spoon", "sport", "spray", "squad", "stack", "staff", "stage", "stain", "stake", "stamp",
  "stand", "stare", "stark", "start", "state", "steak", "steal", "steam", "steel", "steep",
  "steer", "stern", "stick", "stiff", "still", "stock", "stone", "stood", "stool", "store",
  "storm", "story", "stove", "strap", "straw", "strip", "stuck", "study", "stuff", "style",
  "sugar", "suite", "sunny", "super", "surge", "swamp", "swear", "sweat", "sweep", "sweet",
  "swift", "swing", "sword", "table", "taken", "talks", "taste", "taxes", "teach", "teeth",
  "tempo", "tense", "tenth", "terry", "texas", "thank", "theft", "their", "theme", "there",
  "these", "thick", "thief", "thing", "think", "third", "those", "three", "threw", "throw",
  "thumb", "tight", "timer", "tired", "title", "today", "token", "tooth", "topic", "total",
  "touch", "tough", "tower", "track", "trade", "trail", "train", "trait", "trash", "treat",
  "trend", "trial", "tribe", "trick", "tried", "tries", "troop", "truck", "truly", "trump",
  "trunk", "trust", "truth", "tumor", "tuned", "twice", "twist", "ultra", "uncle", "under",
  "undue", "union", "unity", "until", "upper", "upset", "urban", "usage", "usual", "valid",
  "value", "valve", "vault", "venue", "verse", "video", "vigor", "villa", "vinyl", "viral",
  "virus", "visit", "vital", "vivid", "vocal", "vogue", "voice", "voter", "wagon", "waist",
  "waste", "watch", "water", "weary", "weigh", "weird", "whale", "wheat", "wheel", "where",
  "which", "while", "white", "whole", "whose", "wider", "widow", "width", "witch", "woman",
  "woods", "world", "worry", "worse", "worst", "worth", "would", "wound", "wrist", "write",
  "wrong", "wrote", "yacht", "yearn", "yield", "young", "youth", "zebra", "zones"
]

// Extended list of all valid 5-letter words for guessing
const VALID_WORDS = new Set([
  ...ANSWER_WORDS,
  // Common additional valid words
  "aahed", "aalii", "abaca", "abaci", "aback", "abaft", "abamp", "abase", "abash", "abate",
  "abbey", "abbot", "abeam", "abele", "abets", "abhor", "abide", "abled", "abler", "ables",
  "abode", "abort", "acerb", "ached", "aches", "acids", "acidy", "acing", "ackee", "acmes",
  "acned", "acnes", "acorn", "acred", "acres", "acrid", "acted", "actin", "acute", "adage",
  "adapt", "added", "adder", "addle", "adept", "adieu", "admit", "adobe", "adopt", "adore",
  "adorn", "adult", "aegis", "aeons", "aerie", "affix", "afire", "afoot", "afore", "after",
  "again", "agape", "agate", "agave", "agaze", "agent", "aging", "agios", "agism", "agist",
  "aglet", "agley", "aglow", "agone", "agony", "agree", "ahead", "aider", "aides", "ailed",
  "aimed", "aimer", "aioli", "aired", "aisle", "alarm", "album", "alder", "alert", "algae",
  "alias", "alibi", "alien", "align", "alike", "aline", "alist", "alive", "allay", "alley",
  "allot", "allow", "alloy", "aloft", "aloha", "alone", "along", "aloof", "aloud", "alpha",
  "altar", "alter", "altos", "alula", "alums", "amass", "amaze", "amber", "ambit", "amble",
  "amend", "ament", "amice", "amide", "amids", "amigo", "amine", "amino", "amirs", "amiss",
  "amity", "ammos", "among", "amour", "ample", "amply", "amuse", "angel", "anger", "angle",
  "angry", "angst", "anime", "anion", "anise", "ankle", "annex", "annoy", "annul", "anode",
  "antic", "antis", "antsy", "anvil", "aorta", "apace", "apart", "aphid", "aping", "apish",
  "apple", "apply", "apron", "aptly", "arbor", "ardor", "arena", "argue", "arise", "armed",
  "armor", "aroma", "arose", "array", "arrow", "arson", "artsy", "ascot", "ashen", "ashes",
  "aside", "asked", "asker", "askew", "asset", "atlas", "atoll", "atoms", "atone", "attic",
  "audio", "audit", "augur", "aunts", "aunty", "aural", "auras", "avail", "avert", "avian",
  "avoid", "await", "awake", "award", "aware", "awash", "awful", "awing", "awoke", "axial",
  "axils", "axing", "axiom", "axles", "azote", "azure", "babel", "bacon", "badge", "badly",
  "bagel", "baggy", "bails", "bairn", "baits", "baked", "baker", "bakes", "balds", "baldy",
  "baled", "baler", "bales", "balks", "balky", "balls", "bally", "balms", "balmy", "balsa",
  "banal", "bands", "bandy", "baned", "banes", "bangs", "banjo", "banks", "barbs", "bards",
  "bared", "barer", "bares", "barfs", "barge", "barks", "barmy", "barns", "baron", "barre",
  "basal", "based", "baser", "bases", "basic", "basil", "basin", "basis", "basks", "batch",
  "bated", "bates", "bathe", "baths", "batik", "baton", "batts", "batty", "bauds", "baulk",
  "bawdy", "bawls", "bayed", "bayou", "beach", "beads", "beady", "beaks", "beaky", "beams",
  "beamy", "beano", "beans", "beard", "bears", "beast", "beats", "beaus", "bebop", "becks",
  "beech", "beefs", "beefy", "beeps", "beers", "beery", "beets", "began", "begat", "beget",
  "begin", "begot", "begun", "beige", "being", "belay", "belch", "belie", "belle", "bells",
  "belly", "below", "belts", "bench", "bends", "bendy", "benne", "benny", "bents", "beret",
  "bergs", "berry", "berth", "beryl", "beset", "besom", "besot", "bests", "betas", "betel",
  "bevel", "bezel", "bible", "bicep", "bided", "bider", "bides", "bidet", "bidis", "biers",
  "biggy", "bight", "bigot", "biked", "biker", "bikes", "bilge", "bilks", "bills", "billy",
  "bimbo", "binds", "binge", "bingo", "biome", "biped", "bipod", "birch", "birds", "birth",
  "bison", "bitch", "biter", "bites", "bitsy", "bitty", "black", "blade", "blame", "bland",
  "blank", "blare", "blase", "blast", "blaze", "bleak", "blear", "bleat", "bleed", "blend",
  "bless", "blimp", "blind", "blink", "blips", "bliss", "blitz", "bloat", "blobs", "block",
  "blocs", "bloke", "blond", "blood", "bloom", "blown", "blows", "blued", "bluer", "blues",
  "bluff", "blunt", "blurb", "blurs", "blurt", "blush", "board", "boars", "boast", "boats",
  "bobby", "boded", "bodes", "bogey", "boggy", "bogie", "bogus", "boils", "bolas", "bolds",
  "boles", "bolls", "bolts", "bolus", "bombs", "bonds", "boned", "boner", "bones", "boney",
  "bongo", "bongs", "bonus", "boobs", "booby", "booed", "books", "booms", "boomy", "boons",
  "boors", "boost", "booth", "boots", "booty", "booze", "boozy", "borax", "bored", "borer",
  "bores", "borne", "boron", "bosom", "boson", "bossy", "botch", "bough", "bound", "bourg",
  "bourn", "bouts", "bowed", "bowel", "bower", "bowls", "boxed", "boxer", "boxes", "brace",
  "bract", "brads", "brags", "braid", "brain", "brake", "brand", "brank", "brans", "brash",
  "brass", "brats", "brave", "bravo", "brawl", "brawn", "brays", "braze", "bread", "break",
  "bream", "breed", "brens", "breve", "brews", "briar", "bribe", "brick", "bride", "brief",
  "brier", "bries", "brigs", "brill", "brims", "brine", "bring", "brink", "briny", "brisk",
  "broad", "broil", "broke", "brood", "brook", "broom", "broth", "brown", "brows", "bruin",
  "bruit", "brunt", "brush", "brute", "bucks", "buddy", "budge", "buffs", "buggy", "bugle",
  "build", "built", "bulbs", "bulge", "bulgy", "bulks", "bulky", "bulls", "bully", "bumps",
  "bumpy", "bunch", "bunco", "bunks", "bunny", "bunts", "buoys", "burbs", "buret", "burgh",
  "burgs", "burke", "burls", "burly", "burns", "burnt", "burps", "burro", "burrs", "burry",
  "burst", "busby", "bused", "buses", "bushy", "busks", "busts", "busty", "butch", "butle",
  "butts", "buxom", "buyer", "bwana", "bylaw", "byres", "bytes", "byway", "cabal", "cabby",
  "caber", "cabin", "cable", "cacao", "cache", "cacti", "caddy", "cadet", "cadge", "cadre",
  "cafes", "caged", "cager", "cages", "cagey", "cairn", "caked", "cakes", "cakey", "calif",
  "calks", "calla", "calls", "calms", "calve", "camel", "cameo", "camps", "campy", "canal",
  "candy", "caned", "caner", "canes", "canna", "canny", "canoe", "canon", "canto", "cants",
  "canty", "caped", "caper", "capes", "capon", "capos", "carat", "carbo", "carbs", "cards",
  "cared", "carer", "cares", "caret", "cargo", "carks", "carle", "carns", "carob", "carol",
  "carps", "carry", "carts", "carve", "cased", "cases", "casks", "caste", "casts", "catch",
  "cater", "cates", "catty", "caulk", "cause", "caved", "caver", "caves", "cavil", "cawed",
  "cease", "cedar", "ceded", "ceder", "cedes", "ceils", "celeb", "cello", "cells", "cents",
  "chafe", "chaff", "chain", "chair", "chalk", "champ", "chant", "chaos", "chaps", "chard",
  "charm", "charr", "chars", "chart", "chase", "chasm", "chats", "cheap", "cheat", "check",
  "cheek", "cheep", "cheer", "chefs", "chess", "chest", "chews", "chewy", "chick", "chide",
  "chief", "child", "chile", "chili", "chill", "chimp", "china", "chine", "chink", "chino",
  "chins", "chips", "chirp", "chits", "chive", "chock", "choir", "choke", "choky", "chomp",
  "chops", "chord", "chore", "chose", "chows", "chubs", "chuck", "chuff", "chugs", "chump",
  "chums", "chunk", "churn", "chute", "cider", "cigar", "cinch", "circa", "cited", "citer",
  "cites", "civet", "civic", "civil", "clack", "clads", "claim", "clamp", "clams", "clang",
  "clank", "clans", "claps", "clash", "clasp", "class", "clave", "claws", "clays", "clean",
  "clear", "cleat", "clefs", "cleft", "clerk", "clews", "click", "cliff", "climb", "clime",
  "cling", "clink", "clips", "cloak", "clock", "clods", "clogs", "clone", "clonk", "clops",
  "close", "cloth", "clots", "cloud", "clout", "clove", "clown", "cloys", "clubs", "cluck",
  "clued", "clues", "clump", "clung", "clunk", "coach", "coals", "coaly", "coast", "coati",
  "coats", "cobra", "cocas", "cocks", "cocky", "cocoa", "cocos", "codas", "coded", "coden",
  "coder", "codes", "coeds", "cohos", "coifs", "coils", "coins", "coirs", "coked", "cokes",
  "colas", "colds", "coled", "coles", "colic", "colin", "colon", "color", "colts", "comas",
  "combe", "combo", "combs", "comer", "comes", "comet", "comfy", "comic", "comma", "comps",
  "conch", "condo", "coned", "cones", "coney", "conga", "congo", "conic", "conks", "conns",
  "cooch", "cooed", "cooer", "cooks", "cooky", "cools", "coomb", "coons", "coops", "coots",
  "coped", "copen", "coper", "copes", "copra", "copse", "coral", "cords", "cored", "corer",
  "cores", "corgi", "corks", "corky", "corms", "corns", "cornu", "corny", "corps", "corse",
  "costs", "couch", "cough", "could", "count", "coupe", "coups", "court", "couth", "coved",
  "coven", "cover", "coves", "covet", "covey", "cowed", "cower", "cowls", "cowry", "coxed",
  "coxes", "coyed", "coyer", "coyly", "coypu", "cozen", "crabs", "crack", "craft", "crags",
  "cramp", "crams", "crane", "crank", "crape", "craps", "crash", "crass", "crate", "crave",
  "crawl", "craws", "craze", "crazy", "creak", "cream", "credo", "creds", "creed", "creek",
  "creel", "creep", "creme", "crepe", "crept", "cress", "crest", "crews", "cribs", "crick",
  "cried", "crier", "cries", "crime", "crimp", "crisp", "croak", "crock", "crocs", "croft",
  "crone", "crony", "crook", "croon", "crops", "cross", "croup", "crowd", "crown", "crows",
  "crude", "cruel", "cruet", "crumb", "crump", "crush", "crust", "crypt", "cubby", "cubed",
  "cuber", "cubes", "cubic", "cubit", "cuffs", "cuing", "cukes", "culls", "cully", "culms",
  "cults", "cumin", "cupid", "cuppa", "curbs", "curds", "curdy", "cured", "curer", "cures",
  "curio", "curls", "curly", "curry", "curse", "curve", "curvy", "cushy", "cusps", "cuter",
  "cutes", "cutey", "cutie", "cutin", "cutis", "cutty", "cutup", "cyber", "cycle", "cynic",
  "cysts", "czars", "daddy", "daily", "dairy", "daisy", "dales", "dally", "dames", "damns",
  "damps", "dance", "dandy", "dated", "dater", "dates", "datum", "daubs", "daunt", "dawns",
  "dazed", "dazes", "deals", "dealt", "deans", "dears", "deary", "death", "debar", "debit",
  "debts", "debug", "debut", "decaf", "decal", "decay", "decks", "decor", "decoy", "decry",
  "deeds", "deems", "deeps", "deers", "defer", "deity", "delay", "delta", "delve", "demon",
  "demur", "denim", "dense", "depot", "depth", "derby", "deter", "detox", "deuce", "devil",
  "diary", "diced", "dicer", "dices", "dicey", "digit", "dimly", "dinar", "dined", "diner",
  "dines", "dingo", "dings", "dingy", "dinks", "dinky", "diode", "dippy", "dipso", "direr",
  "dirge", "dirks", "dirts", "dirty", "disco", "discs", "dishy", "disks", "ditch", "ditto",
  "ditty", "ditzy", "divan", "divas", "dived", "diver", "dives", "divot", "divvy", "dizzy",
  "docks", "dodge", "dodgy", "dodos", "doers", "doffs", "doges", "doggy", "dogie", "dogma",
  "doily", "doing", "dolls", "dolly", "dolts", "domed", "domes", "donas", "donee", "donor",
  "donut", "dooms", "doomy", "doors", "doozy", "doped", "doper", "dopes", "dopey", "dorks",
  "dorky", "dorms", "dosed", "doser", "doses", "doted", "doter", "dotes", "dotty", "doubt",
  "dough", "douse", "doves", "dowdy", "dowel", "dower", "downs", "downy", "dowry", "dowse",
  "doyen", "dozed", "dozen", "dozer", "dozes", "drabs", "draft", "drags", "drain", "drake",
  "drama", "drams", "drank", "drape", "drats", "drawl", "drawn", "draws", "drays", "dread",
  "dream", "drear", "dreck", "dress", "dribs", "dried", "drier", "dries", "drift", "drill",
  "drily", "drink", "drips", "drive", "droit", "droll", "drone", "drool", "droop", "drops",
  "dross", "drove", "drown", "drugs", "druid", "drums", "drunk", "drupe", "dryad", "dryer",
  "dryly", "duals", "ducal", "ducat", "ducks", "ducky", "ducts", "dudes", "duels", "duets",
  "duffs", "dully", "dulse", "dumbs", "dummy", "dumps", "dumpy", "dunce", "dunes", "dungs",
  "dunks", "duped", "duper", "dupes", "durst", "dusky", "dusts", "dusty", "dutch", "duvet",
  "dwarf", "dwell", "dwelt", "dying", "eager", "eagle", "eared", "earls", "early", "earns",
  "earth", "eased", "easel", "easer", "eases", "eaten", "eater", "eaves", "ebbed", "ebony",
  "echos", "edema", "edged", "edger", "edges", "edict", "edify", "edits", "eerie", "eight",
  "eject", "eking", "elate", "elbow", "elder", "elect", "elegy", "elfin", "elide", "elite",
  "elope", "elude", "elves", "email", "embed", "ember", "emcee", "emend", "emery", "emirs",
  "emits", "emote", "empty", "enact", "ended", "ender", "endow", "endue", "enema", "enemy",
  "enjoy", "ennui", "ensue", "enter", "entry", "envoy", "epoch", "epoxy", "equal", "equip",
  "erase", "erect", "erode", "erred", "error", "erupt", "essay", "ester", "ether", "ethic",
  "ethos", "etude", "evade", "evens", "event", "evert", "every", "evict", "evils", "evoke",
  "exact", "exalt", "exams", "excel", "execs", "exert", "exile", "exist", "exits", "expat",
  "expel", "extol", "extra", "exude", "exult", "eying", "fable", "faced", "facer", "faces",
  "facet", "facts", "faddy", "faded", "fader", "fades", "fails", "faint", "fairs", "fairy",
  "faith", "faked", "faker", "fakes", "falls", "false", "famed", "fancy", "fanes", "fangs",
  "fanny", "farce", "fared", "farer", "fares", "farms", "fatal", "fated", "fates", "fatty",
  "fatwa", "fault", "fauna", "fauns", "favor", "fawns", "faxed", "faxes", "fazed", "fazes",
  "fears", "feast", "feats", "fecal", "feces", "feeds", "feels", "feign", "feint", "feist",
  "fella", "fells", "felon", "felts", "femur", "fence", "fends", "fenny", "feral", "ferns",
  "ferny", "ferry", "fetal", "fetch", "fetid", "fetus", "feuds", "fever", "fewer", "fiber",
  "fibre", "ficus", "field", "fiend", "fiery", "fifed", "fifer", "fifes", "fifth", "fifty",
  "fight", "filch", "filed", "filer", "files", "filet", "fills", "filly", "films", "filmy",
  "filth", "final", "finch", "finds", "fined", "finer", "fines", "finks", "finny", "fiord",
  "fired", "firer", "fires", "firms", "first", "fishy", "fists", "fitly", "fiver", "fives",
  "fixed", "fixer", "fixes", "fizzy", "fjord", "flack", "flags", "flail", "flair", "flake",
  "flaky", "flame", "flams", "flank", "flans", "flaps", "flare", "flash", "flask", "flats",
  "flaws", "flaxy", "flays", "fleas", "fleck", "flees", "fleet", "flesh", "flick", "flied",
  "flier", "flies", "fling", "flint", "flips", "flirt", "float", "flock", "floes", "flogs",
  "flood", "floor", "flops", "flora", "floss", "flour", "flout", "flown", "flows", "flubs",
  "flued", "flues", "fluff", "fluid", "fluke", "fluky", "flume", "flung", "flunk", "flush",
  "flute", "foams", "foamy", "focal", "focus", "fogey", "foggy", "foils", "foist", "folds",
  "folio", "folks", "folly", "fonts", "foods", "fools", "foots", "foray", "forbs", "force",
  "fordo", "fords", "fores", "forge", "forgo", "forks", "forky", "forms", "forte", "forth",
  "forty", "forum", "fouls", "found", "fount", "fours", "fowls", "foxed", "foxes", "foyer",
  "frail", "frame", "franc", "frank", "fraud", "frays", "freak", "freed", "freer", "frees",
  "fresh", "frets", "friar", "fried", "frier", "fries", "frill", "frisk", "fritz", "frizz",
  "frock", "frogs", "frond", "front", "frost", "froth", "frown", "froze", "fruit", "frump",
  "fryer", "fucks", "fudge", "fudgy", "fuels", "fugal", "fugue", "fulls", "fully", "fumed",
  "fumer", "fumes", "funds", "fungi", "funks", "funky", "funny", "furls", "furor", "furry",
  "furze", "furzy", "fused", "fusee", "fusel", "fuses", "fussy", "fusty", "futon", "fuzed",
  "fuzee", "fuzes", "fuzzy", "gaily", "gains", "gaits", "gales", "galls", "gamer", "games",
  "gamey", "gamma", "gamut", "gangs", "gaped", "gaper", "gapes", "gappy", "garbs", "gases",
  "gasps", "gassy", "gated", "gates", "gauge", "gaunt", "gauze", "gauzy", "gavel", "gawks",
  "gawky", "gayer", "gayly", "gazed", "gazer", "gazes", "gears", "gecko", "geeks", "geeky",
  "geese", "genes", "genie", "genre", "genus", "germs", "germy", "ghost", "giant", "gibed",
  "giber", "gibes", "giddy", "gifts", "gilds", "gills", "gilts", "gimme", "gimpy", "girls",
  "girly", "girth", "girts", "given", "giver", "gives", "gizmo", "glade", "gland", "glare",
  "glary", "glass", "glaze", "glazy", "gleam", "glean", "glebe", "glees", "glens", "glide",
  "glims", "glint", "glitz", "gloat", "globe", "globs", "gloms", "gloom", "glory", "gloss",
  "glove", "glows", "gloze", "glued", "gluer", "glues", "gluey", "glugs", "glume", "gluts",
  "glyph", "gnarl", "gnars", "gnash", "gnats", "gnawn", "gnaws", "gnome", "goads", "goals",
  "goats", "godly", "goers", "going", "golds", "golem", "golfs", "golly", "gonad", "goner",
  "gongs", "gonna", "goods", "gooey", "goofs", "goofy", "goons", "goops", "goopy", "goose",
  "goosy", "gored", "gores", "gorge", "gorps", "gorsy", "gotta", "gouge", "gourd", "gouts",
  "gouty", "gowns", "grace", "grade", "grads", "graft", "grail", "grain", "grams", "grand",
  "grant", "grape", "graph", "grasp", "grass", "grate", "grave", "gravy", "grays", "graze",
  "great", "greed", "greek", "green", "greet", "greys", "grief", "grift", "grill", "grime",
  "grimy", "grind", "grins", "gripe", "gripy", "grist", "grits", "groan", "groat", "groin",
  "groom", "grope", "gross", "group", "grout", "grove", "growl", "grown", "grows", "grubs",
  "gruel", "grues", "gruff", "grump", "grunt", "guano", "guard", "guava", "guess", "guest",
  "guide", "guild", "guilt", "guise", "gulag", "gulch", "gulfs", "gulls", "gully", "gulps",
  "gummy", "gumps", "gunks", "gunky", "gunny", "guppy", "gurus", "gushy", "gusts", "gusty",
  "gutsy", "gutta", "gutty", "guyed", "gybed", "gybes", "gypsy", "gyred", "gyres", "gyros",
  "habit", "hacks", "hafts", "haiku", "hails", "hairs", "hairy", "hakes", "haled", "haler",
  "hales", "halfs", "halls", "halos", "halts", "halve", "hames", "hammy", "hands", "handy",
  "hangs", "hanks", "hanky", "happy", "hardy", "hared", "harem", "hares", "harks", "harms",
  "harps", "harpy", "harry", "harsh", "harts", "hasps", "haste", "hasty", "hatch", "hated",
  "hater", "hates", "hauls", "haunt", "haven", "haver", "haves", "havoc", "hawks", "hazel",
  "hazer", "hazes", "heads", "heady", "heals", "heaps", "heard", "hears", "heart", "heath",
  "heats", "heave", "heavy", "hedge", "hedgy", "heeds", "heels", "hefts", "hefty", "heirs",
  "heist", "helix", "hello", "hells", "helms", "helps", "helve", "hence", "henna", "henry",
  "herbs", "herby", "herds", "heron", "heros", "hertz", "hewed", "hewer", "hexed", "hexes",
  "hider", "hides", "highs", "hiked", "hiker", "hikes", "hills", "hilly", "hilts", "hinds",
  "hinge", "hinny", "hints", "hippo", "hippy", "hired", "hirer", "hires", "hissy", "hitch",
  "hived", "hives", "hoard", "hoars", "hoary", "hobby", "hobos", "hocks", "hocus", "hoers",
  "hogan", "hoist", "hoked", "hokes", "hokey", "hokum", "holds", "holed", "holer", "holes",
  "holey", "holly", "homer", "homes", "homey", "homie", "homos", "honed", "honer", "hones",
  "honey", "hongi", "hongs", "honks", "honky", "honor", "hoods", "hooey", "hoofs", "hooks",
  "hooky", "hoops", "hoots", "hoped", "hoper", "hopes", "horde", "horns", "horny", "horse",
  "horsy", "hosed", "hosel", "hosen", "hoser", "hoses", "hosts", "hotel", "hotly", "hound",
  "houri", "hours", "house", "hovel", "hover", "howdy", "howls", "hubby", "huffs", "huffy",
  "huger", "hulas", "hulks", "hulky", "hullo", "hulls", "human", "humic", "humid", "humor",
  "humph", "humps", "humpy", "humus", "hunch", "hunks", "hunky", "hunts", "hurds", "hurls",
  "hurry", "hurts", "husks", "husky", "hussy", "hutch", "hydra", "hyena", "hymen", "hymns",
  "hyped", "hyper", "hypes", "icier", "icily", "icing", "icker", "ideal", "ideas", "idiom",
  "idiot", "idled", "idler", "idles", "idols", "idyll", "igloo", "ikons", "image", "imams",
  "imbed", "imbue", "impel", "imply", "inane", "incur", "index", "indie", "inept", "inert",
  "infer", "infos", "ingle", "ingot", "inked", "inker", "inlay", "inlet", "inned", "inner",
  "input", "intel", "inter", "intro", "inure", "ionic", "irate", "irked", "irons", "irony",
  "isled", "isles", "islet", "issue", "itchy", "items", "ivied", "ivies", "ivory", "jab's",
  "jacks", "jaded", "jades", "jager", "jails", "jakes", "jalap", "jambs", "jammy", "janes",
  "japan", "japed", "japer", "japes", "jarls", "jaunt", "jazzy", "jeans", "jeeps", "jeers",
  "jelly", "jenny", "jerks", "jerky", "jerry", "jests", "jesus", "jetty", "jewel", "jibed",
  "jiber", "jibes", "jiffy", "jilts", "jimmy", "jingo", "jinks", "jived", "jiver", "jives",
  "johns", "joins", "joint", "joist", "joked", "joker", "jokes", "jokey", "jolly", "jolts",
  "jones", "joust", "joyed", "judge", "juice", "juicy", "julep", "jumbo", "jumps", "jumpy",
  "junco", "junks", "junky", "junta", "junto", "juror", "justs", "jutes", "jutty", "kayak",
  "kazoo", "kebab", "keels", "keens", "keeps", "kelps", "kempt", "ketch", "keyed", "khaki",
  "kicks", "kicky", "kiddo", "kilns", "kilts", "kinds", "kinda", "kings", "kinks", "kinky",
  "kiosk", "kited", "kiter", "kites", "kiths", "kitty", "kiwis", "knack", "knave", "knead",
  "kneed", "kneel", "knees", "knell", "knelt", "knife", "knits", "knobs", "knock", "knoll",
  "knots", "known", "knows", "koala", "kooks", "kooky", "kopek", "kraal", "kraft", "krill",
  "kudos", "kudzu", "label", "labor", "laced", "lacer", "laces", "lacey", "lacks", "laden",
  "ladle", "lager", "laird", "lairs", "laity", "laked", "laker", "lakes", "lamas", "lambs",
  "lamby", "lamed", "lamer", "lames", "lamps", "lance", "lands", "lanes", "lanky", "lapel",
  "lapse", "large", "largo", "larks", "larky", "larva", "lased", "laser", "lases", "lassi",
  "lasso", "lasts", "latch", "lated", "laten", "later", "latex", "lathe", "laths", "lathy",
  "latte", "lauds", "laugh", "lavas", "laved", "laver", "laves", "lawed", "lawns", "lawny",
  "laxer", "laxes", "laxly", "layed", "layer", "layup", "lazed", "lazes", "leach", "leads",
  "leafs", "leafy", "leaks", "leaky", "leans", "leant", "leaps", "leapt", "learn", "leary",
  "lease", "leash", "least", "leave", "ledge", "ledgy", "leech", "leeks", "leers", "leery",
  "lefts", "lefty", "legal", "leger", "leggy", "legit", "lemma", "lemme", "lemon", "lemur",
  "lends", "leper", "letup", "levee", "level", "lever", "lewis", "liars", "libel", "liber",
  "lichi", "licks", "lidos", "lidar", "liege", "liens", "liers", "lieus", "lifer", "lifts",
  "liger", "light", "liked", "liken", "liker", "likes", "lilac", "lilts", "liman", "limas",
  "limbi", "limbo", "limbs", "limby", "limed", "limen", "limes", "limey", "limit", "limns",
  "limos", "limpa", "limps", "lined", "linen", "liner", "lines", "liney", "lingo", "lings",
  "linin", "links", "linky", "linns", "linos", "lints", "linty", "lions", "lipid", "lippy",
  "liras", "lisps", "lists", "liter", "lithe", "litho", "litre", "lived", "liven", "liver",
  "lives", "livid", "livre", "llama", "llano", "loach", "loads", "loafs", "loams", "loamy",
  "loans", "loath", "lobar", "lobby", "lobed", "lobes", "lobos", "local", "locus", "loden",
  "lodes", "lodge", "loess", "lofts", "lofty", "logan", "loges", "loggy", "logic", "login",
  "loins", "lolls", "loner", "longs", "looby", "looed", "looey", "loofa", "loofs", "looie",
  "looks", "looms", "loons", "loony", "loops", "loopy", "loose", "loots", "loped", "loper",
  "lopes", "loppy", "lords", "lores", "loris", "lorry", "loser", "loses", "lossy", "lotas",
  "lotic", "lotta", "lotte", "lotto", "lotus", "lough", "louie", "louis", "louma", "loupe",
  "loups", "lours", "loury", "louse", "lousy", "louts", "loved", "lover", "loves", "lowed",
  "lower", "lowly", "loxed", "loxes", "loyal", "luaus", "lubed", "lubes", "luces", "lucid",
  "lucks", "lucky", "lucre", "ludes", "ludic", "luffs", "luged", "luger", "luges", "lulls",
  "lulus", "lumen", "lumps", "lumpy", "lunar", "lunas", "lunch", "lunes", "lunet", "lunge",
  "lungi", "lungs", "lunks", "lupin", "lupus", "lurch", "lured", "lurer", "lures", "lurks",
  "lusts", "lusty", "luted", "lutes", "luxes", "lyart", "lycea", "lycee", "lying", "lymph",
  "lynch", "lyres", "lyric", "lysed", "lyses", "lysin", "lysis", "macho", "macro", "madam",
  "madly", "madre", "mafia", "mafic", "mages", "magic", "magma", "magot", "magus", "mahoe",
  "maids", "mails", "maims", "mains", "maist", "maize", "major", "maker", "makes", "males",
  "malls", "malms", "malmy", "malts", "malty", "mamas", "mamba", "mambo", "maned", "manes",
  "manga", "mange", "mango", "mangy", "mania", "manic", "manly", "manna", "manor", "manse",
  "manta", "maple", "march", "mares", "marge", "maria", "marks", "marls", "marly", "marry",
  "marsh", "marts", "maser", "mashy", "masks", "mason", "massa", "masse", "massy", "masts",
  "match", "mated", "mater", "mates", "matey", "maths", "matte", "matts", "mauls", "maund",
  "mauts", "mauve", "maven", "mavin", "mavis", "mawed", "maxed", "maxes", "maxim", "mayan",
  "mayas", "maybe", "mayor", "mayos", "mazed", "mazer", "mazes", "meads", "meals", "mealy",
  "means", "meant", "meats", "meaty", "mecca", "mechs", "medal", "media", "medic", "meeds",
  "meets", "melds", "melee", "melic", "melon", "melts", "melty", "memos", "menad", "mends",
  "menus", "meows", "mercy", "merge", "merit", "merks", "merle", "merls", "merry", "mesas",
  "meshy", "mesic", "mesne", "meson", "messy", "metal", "meted", "meter", "metes", "meths",
  "metro", "mewed", "mewls", "mezzo", "miaou", "miaow", "mica", "micas", "micks", "micro",
  "middy", "midge", "midis", "midst", "miens", "miffs", "miffy", "might", "miked", "mikes",
  "milch", "milds", "miler", "miles", "milks", "milky", "mille", "mills", "milos", "milts",
  "milty", "mimed", "mimeo", "mimer", "mimes", "mimic", "mince", "mincy", "minds", "mined",
  "miner", "mines", "mingy", "minim", "minis", "minke", "minks", "minor", "mints", "minty",
  "minus", "mired", "mires", "mirks", "mirky", "mirth", "miser", "mises", "misos", "missy",
  "mists", "misty", "miter", "mites", "mitre", "mitts", "mixed", "mixer", "mixes", "mixup",
  "moans", "moats", "mocha", "mocks", "modal", "model", "modem", "modes", "modus", "moggy",
  "mogul", "mohel", "mohur", "moils", "moire", "moist", "molar", "molas", "molds", "moldy",
  "moles", "molls", "molly", "molto", "molts", "momes", "momma", "mommy", "monad", "mondo",
  "money", "mongo", "monks", "monos", "monte", "month", "mooch", "moods", "moody", "moola",
  "mools", "moons", "moony", "moors", "moory", "moose", "moots", "moped", "moper", "mopes",
  "mopey", "moral", "moras", "moray", "morel", "mores", "morns", "moron", "morph", "morro",
  "morse", "morts", "mosey", "mosks", "mosso", "mossy", "moste", "mosts", "motel", "motes",
  "motet", "motey", "moths", "mothy", "motif", "motor", "motte", "motto", "motts", "mouch",
  "mould", "moult", "mound", "mount", "mourn", "mouse", "mousy", "mouth", "moved", "mover",
  "moves", "movie", "mowed", "mower", "mucid", "mucks", "mucky", "mucor", "mucro", "mucus",
  "muddy", "muffs", "mufti", "muggs", "muggy", "mulch", "mulct", "muled", "mules", "muley",
  "mulla", "mulls", "mumms", "mummy", "mumps", "munch", "mungo", "mungs", "munis", "muons",
  "mural", "mured", "mures", "murks", "murky", "murra", "murre", "murrs", "murry", "mused",
  "muser", "muses", "mushy", "music", "musks", "musky", "mussy", "musth", "musts", "musty",
  "muted", "muter", "mutes", "muton", "mutts", "muzzy", "mynah", "mynas", "myoid", "myrrh",
  "myths", "naans", "nabob", "nacho", "nacre", "nadir", "naffs", "naiad", "naifs", "nails",
  "naira", "naive", "naked", "named", "namer", "names", "nanas", "nance", "nancy", "nanny",
  "napes", "nappy", "narco", "narcs", "nards", "nares", "naric", "naris", "narks", "narky",
  "nasal", "nasty", "natal", "natch", "nates", "natty", "naval", "navel", "naves", "nawab",
  "nazis", "neaps", "nears", "neath", "neats", "necks", "needs", "needy", "neems", "negus",
  "neigh", "nelly", "neons", "nerds", "nerdy", "nerol", "nerts", "nerve", "nervy", "nests",
  "netty", "neuks", "never", "neves", "nevus", "newel", "newer", "newly", "newsy", "newts",
  "nexus", "nicad", "nicer", "niche", "nicks", "nidal", "nided", "nides", "nidus", "niece",
  "nieve", "nifty", "nighs", "night", "nihil", "nills", "nimbi", "nines", "ninja", "ninny",
  "ninon", "ninth", "nippy", "nisei", "nisus", "niter", "nites", "nitid", "niton", "nitre",
  "nitro", "nitty", "nival", "nixed", "nixer", "nixes", "nixie", "nizam", "nobby", "noble",
  "nobly", "nocks", "nodal", "noddy", "nodes", "nodus", "noels", "noggs", "nohow", "noils",
  "noily", "noirs", "noise", "noisy", "nomad", "nomas", "nomen", "nomes", "nonas", "nonce",
  "nones", "nonet", "nonyl", "nooks", "nooky", "noons", "noose", "nopal", "noria", "noris",
  "norms", "north", "nosed", "noser", "noses", "nosey", "notch", "noted", "noter", "notes",
  "notum", "nouns", "novae", "novas", "novel", "noway", "nowts", "nubby", "nubia", "nucha",
  "nuder", "nudes", "nudge", "nudie", "nuked", "nukes", "nulls", "numbs", "numen", "nurds",
  "nurls", "nurse", "nutsy", "nutty", "nyala", "nylon", "nymph", "oaken", "oakum", "oared",
  "oases", "oasis", "oasts", "oaten", "oater", "oaths", "oaves", "obeah", "obeli", "obese",
  "obeys", "obias", "obits", "objet", "oboes", "occur", "ocean", "ocher", "ochre", "ochry",
  "ocker", "octal", "octan", "octet", "octyl", "oculi", "odder", "oddly", "odeon", "odeum",
  "odist", "odium", "odors", "odour", "offal", "offed", "offer", "often", "ogees", "ogled",
  "ogler", "ogles", "ogres", "ohias", "ohing", "oiled", "oiler", "oinks", "okapi", "okays",
  "okehs", "okras", "olden", "older", "oldie", "oleic", "olein", "oleos", "oleum", "olios",
  "olive", "ollas", "ology", "omasa", "omber", "ombre", "omega", "omens", "omers", "omits",
  "oncet", "onery", "onion", "onium", "onset", "ontic", "oohed", "oomph", "oorie", "oozed",
  "oozes", "opahs", "opals", "opens", "opera", "opine", "oping", "opium", "opted", "optic",
  "orach", "oracy", "orals", "orang", "orate", "orbed", "orbit", "orcas", "order", "organ",
  "oribi", "oriel", "orles", "orlon", "orlop", "ormer", "orpin", "orris", "ortho", "orzos",
  "oscar", "osier", "osmic", "other", "ottar", "otter", "ought", "ounce", "ouphe", "ouphs",
  "ourie", "ousel", "ousts", "outby", "outdo", "outed", "outer", "outgo", "outre", "outro",
  "ouzel", "ouzos", "ovals", "ovary", "ovate", "ovens", "overs", "overt", "ovine", "ovoid",
  "ovule", "owing", "owled", "owlet", "owned", "owner", "owsen", "oxbow", "oxers", "oxide",
  "oxids", "oxies", "oxime", "oxlip", "oxter", "oyers", "ozone", "paced", "pacer", "paces",
  "packs", "pacts", "paddy", "padre", "paean", "pagan", "paged", "pager", "pages", "pagod",
  "pails", "pains", "paint", "pairs", "paisa", "paise", "palea", "paled", "paler", "pales",
  "palls", "pally", "palms", "palmy", "palps", "palsy", "pampa", "panda", "pandy", "paned",
  "panel", "panes", "panga", "pangs", "panic", "panne", "pansy", "panto", "pants", "panty",
  "papal", "papas", "papaw", "paper", "pappy", "paras", "parch", "pardi", "pards", "pardy",
  "pared", "pareo", "parer", "pares", "pareu", "parge", "pargo", "paris", "parka", "parks",
  "parky", "parle", "parol", "parrs", "parry", "parse", "parts", "party", "parve", "parvo",
  "paseo", "pases", "pasha", "passe", "pasta", "paste", "pasts", "pasty", "patch", "pated",
  "paten", "pater", "pates", "paths", "patin", "patio", "patly", "patsy", "patty", "pause",
  "pavan", "paved", "paver", "paves", "pavid", "pavin", "pavis", "pawed", "pawer", "pawky",
  "pawls", "pawns", "paxes", "payed", "payee", "payer", "payor", "peace", "peach", "peage",
  "peags", "peaks", "peaky", "peals", "peans", "pearl", "pears", "peart", "pease", "peats",
  "peaty", "pecan", "pechs", "pecks", "pecky", "pedal", "pedes", "pedro", "peeks", "peels",
  "peens", "peeps", "peers", "peery", "peeve", "peins", "peise", "pekan", "pekee", "pekes",
  "pekin", "pekoe", "peles", "pelfs", "pelon", "pelts", "penal", "pence", "pends", "penes",
  "pengo", "penis", "penna", "penne", "penni", "penny", "peons", "peony", "peppy", "perch",
  "perdu", "perdy", "peril", "peris", "perks", "perky", "perms", "perps", "perry", "perse",
  "pervs", "pesky", "pesos", "pesto", "pests", "pesty", "petal", "peter", "petit", "petti",
  "petto", "petty", "pewee", "pewit", "phase", "phone", "phono", "phons", "phony", "photo",
  "phots", "phuts", "phyla", "phyle", "piano", "pians", "picas", "picks", "picky", "picot",
  "picul", "piece", "piers", "pieta", "piety", "piggy", "pigmy", "piing", "pikas", "piked",
  "piker", "pikes", "pilar", "pilau", "pilaw", "pilea", "piled", "pilei", "piles", "pills",
  "pilot", "pilus", "pimas", "pimps", "pinas", "pinch", "pined", "pines", "piney", "pingo",
  "pings", "pinko", "pinks", "pinky", "pinna", "pinny", "pinon", "pinot", "pinta", "pinto",
  "pints", "pinup", "pions", "pious", "pipal", "pipas", "piped", "piper", "pipes", "pipet",
  "pipit", "pique", "pirns", "pirog", "pisco", "pisos", "piste", "pitas", "pitch", "piths",
  "pithy", "piton", "pitta", "pivot", "pixel", "pixes", "pixie", "pizza", "place", "plack",
  "plage", "plaid", "plain", "plait", "plane", "plank", "plans", "plant", "plash", "plasm",
  "plate", "plats", "platy", "plaza", "plead", "pleas", "pleat", "plebe", "plebs", "plena",
  "pleon", "plews", "plica", "plied", "plier", "plies", "plink", "plods", "plonk", "plops",
  "plots", "plotz", "plows", "ploys", "pluck", "plugs", "plumb", "plume", "plump", "plums",
  "plumy", "plunk", "plush", "plyer", "poach", "poboy", "pocks", "pocky", "podgy", "podia",
  "poems", "poesy", "poets", "pogey", "poilu", "point", "poise", "poked", "poker", "pokes",
  "pokey", "polar", "poled", "poler", "poles", "polio", "polis", "polka", "polls", "polos",
  "polys", "pombe", "pomes", "pommy", "pomps", "ponce", "poncy", "ponds", "pones", "pongs",
  "ponzu", "pooch", "poods", "pooed", "poofs", "poofy", "poohs", "pools", "poons", "poops",
  "poori", "poove", "popes", "poppa", "poppy", "popsy", "porch", "pored", "porer", "pores",
  "porgy", "porks", "porky", "porns", "porny", "ports", "posed", "poser", "poses", "posit",
  "posse", "posts", "potsy", "potto", "potty", "pouch", "pouds", "poufs", "poult", "pound",
  "pours", "pouts", "pouty", "power", "poxed", "poxes", "poyou", "prams", "prang", "prank",
  "praos", "prase", "prate", "prats", "praus", "prawn", "prays", "preen", "prees", "preop",
  "preps", "presa", "prese", "press", "prest", "prexy", "preys", "price", "prick", "pricy",
  "pride", "pried", "prier", "pries", "prigs", "prill", "prima", "prime", "primo", "primp",
  "prims", "prink", "print", "prion", "prior", "prise", "prism", "priss", "privy", "prize",
  "proas", "probe", "probs", "prods", "proem", "profs", "progs", "prole", "promo", "proms",
  "prone", "prong", "proof", "props", "prose", "proso", "pross", "prost", "prosy", "proto",
  "proud", "prove", "prowl", "prows", "proxy", "prude", "prune", "pruta", "pryer", "psalm",
  "pseud", "pshaw", "psych", "pubic", "pubis", "puces", "pucka", "pucks", "pudge", "pudgy",
  "pudic", "pudus", "puffs", "puffy", "puggy", "pujah", "pujas", "puked", "pukes", "pukka",
  "puled", "puler", "pules", "pulik", "pulis", "pulls", "pulps", "pulpy", "pulse", "pumas",
  "pumps", "punas", "punch", "pungs", "punji", "punka", "punks", "punky", "punny", "punto",
  "punts", "punty", "pupae", "pupal", "pupas", "pupil", "puppy", "pupus", "purda", "puree",
  "purer", "purge", "purin", "puris", "purls", "purrs", "purse", "pursy", "puses", "pushy",
  "pussy", "puton", "putti", "putto", "putts", "putty", "pygmy", "pyins", "pylon", "pyoid",
  "pyran", "pyres", "pyrex", "pyric", "pyros", "pyxes", "pyxie", "pyxis", "qadis", "qaids",
  "qanat", "qapik", "qibla", "qophs", "quack", "quads", "quaff", "quags", "quail", "quais",
  "quake", "quaky", "qualm", "quant", "quare", "quark", "quart", "quash", "quasi", "quass",
  "quate", "quays", "quean", "queen", "queer", "quell", "query", "quest", "queue", "queys",
  "quick", "quids", "quiet", "quiff", "quill", "quilt", "quins", "quint", "quips", "quipu",
  "quire", "quirk", "quirt", "quite", "quits", "quods", "quoin", "quoit", "quoll", "quops",
  "quota", "quote", "quoth", "qursh", "rabat", "rabbi", "rabic", "rabid", "raced", "racer",
  "races", "racks", "racon", "radar", "radii", "radio", "radix", "radon", "raffs", "rafts",
  "ragas", "raged", "ragee", "rager", "rages", "ragga", "raggs", "raggy", "ragis", "raias",
  "raids", "rails", "rains", "rainy", "raise", "raita", "rajah", "rajas", "raked", "rakee",
  "raker", "rakes", "rakis", "rales", "rally", "ralph", "ramal", "ramee", "ramen", "ramet",
  "ramie", "rammy", "ramps", "ramus", "ranch", "rands", "randy", "ranee", "range", "rangy",
  "ranid", "ranis", "ranks", "rants", "raped", "raper", "rapes", "raphe", "rapid", "rared",
  "rarer", "rares", "raspy", "ratal", "ratan", "ratch", "rated", "ratel", "rater", "rates",
  "rathe", "ratio", "ratos", "ratty", "raved", "ravel", "raven", "raver", "raves", "rawer",
  "rawin", "rawly", "raxed", "raxes", "rayah", "rayas", "rayed", "rayon", "razed", "razee",
  "razer", "razes", "razor", "reach", "react", "readd", "reads", "ready", "realm", "reals",
  "reams", "reaps", "rearm", "rears", "reata", "reave", "rebar", "rebbe", "rebec", "rebel",
  "rebid", "rebop", "rebud", "rebus", "rebut", "rebuy", "recap", "recce", "recit", "recks",
  "recon", "recta", "recti", "recto", "recur", "recut", "redan", "redds", "reddy", "reded",
  "redes", "redia", "redid", "redip", "redly", "redon", "redos", "redox", "redry", "redub",
  "redux", "redye", "reeds", "reedy", "reefs", "reefy", "reeks", "reeky", "reels", "reest",
  "reeve", "refed", "refel", "refer", "refis", "refit", "refix", "refly", "refry", "regal",
  "reges", "regma", "regna", "regos", "rehab", "rehem", "reifs", "reify", "reign", "reiki",
  "reink", "reins", "reive", "rejig", "rekey", "relax", "relay", "relet", "relic", "relit",
  "reman", "remap", "remet", "remex", "remit", "remix", "renal", "rends", "renew", "renig",
  "renin", "renne", "rente", "rents", "reoil", "repay", "repeg", "repel", "repin", "reply",
  "repos", "repot", "repps", "repro", "reran", "rerig", "rerun", "resaw", "resay", "resee",
  "reset", "resew", "resid", "resin", "resit", "resod", "resow", "resto", "rests", "retag",
  "retax", "retch", "retem", "retia", "retie", "retro", "retry", "reuse", "revel", "revet",
  "revue", "rewan", "rewax", "rewed", "rewet", "rewin", "rewon", "rexes", "rheas", "rheme",
  "rheum", "rhino", "rhomb", "rhumb", "rhyme", "rhyta", "rials", "riant", "riata", "ribby",
  "ribes", "riced", "ricer", "rices", "ricey", "ricks", "rider", "rides", "ridge", "ridgy",
  "riels", "riems", "rifer", "riffs", "rifle", "rifts", "right", "rigid", "rigor", "riled",
  "riles", "riley", "rille", "rills", "rimed", "rimer", "rimes", "rinds", "rindy", "rings",
  "rinks", "rinse", "rioja", "riots", "riped", "ripen", "riper", "ripes", "risen", "riser",
  "rises", "rishi", "risks", "risky", "risus", "rites", "ritzy", "rival", "rived", "riven",
  "river", "rives", "rivet", "riyal", "roach", "roads", "roams", "roans", "roars", "roast",
  "robed", "robes", "robin", "roble", "robot", "rocks", "rocky", "rodeo", "rodes", "roger",
  "rogue", "roils", "roily", "roles", "rolfs", "rolls", "roman", "romeo", "romps", "rondo",
  "roods", "roofs", "rooks", "rooky", "rooms", "roomy", "roose", "roost", "roots", "rooty",
  "roped", "roper", "ropes", "ropey", "roque", "roses", "roset", "roshi", "rosin", "rotas",
  "rotch", "rotes", "rotis", "rotls", "rotor", "rotos", "rotte", "rouen", "roues", "rouge",
  "rough", "round", "roups", "roupy", "rouse", "roust", "route", "routh", "routs", "roved",
  "roven", "rover", "roves", "rowan", "rowdy", "rowed", "rowel", "rowen", "rower", "rowth",
  "royal", "rozed", "rozes", "rubby", "rubes", "ruble", "rubli", "rubus", "ruche", "rucks",
  "rudds", "ruddy", "ruder", "ruers", "ruffs", "rugby", "ruggy", "ruing", "ruins", "ruled",
  "ruler", "rules", "rumba", "rumen", "rummy", "rumor", "rumps", "runch", "runes", "rungs",
  "runic", "runny", "runts", "runty", "rupee", "rural", "ruses", "rushy", "rusks", "rusts",
  "rusty", "ruths", "rutin", "rutty", "sabal", "sabed", "saber", "sabes", "sabin", "sabir",
  "sable", "sabot", "sabra", "sabre", "sacks", "sacra", "sadhe", "sadhu", "sadly", "safer",
  "safes", "sagas", "sager", "sages", "saggy", "sagos", "sahib", "saice", "saids", "saiga",
  "sails", "sains", "saint", "saith", "sajou", "saker", "sakes", "sakis", "salad", "salal",
  "salat", "salep", "sales", "salic", "sally", "salmi", "salon", "salpa", "salps", "salsa",
  "salts", "salty", "salve", "salvo", "samba", "sambo", "samek", "samps", "sands", "sandy",
  "saned", "saner", "sanes", "sanga", "sangh", "sapid", "sapor", "sappy", "saree", "sarge",
  "sarin", "saris", "sarks", "sarky", "sarod", "saros", "sasin", "sassy", "satay", "sated",
  "satem", "sates", "satin", "satis", "satyr", "sauce", "sauch", "saucy", "saugh", "sauls",
  "sauna", "saunt", "saury", "saute", "sauts", "saved", "saver", "saves", "savin", "savor",
  "savoy", "savvy", "sawed", "sawer", "saxes", "sayer", "sayin", "sayid", "sayst", "sazes",
  "scabs", "scads", "scags", "scald", "scale", "scall", "scalp", "scaly", "scamp", "scams",
  "scans", "scant", "scape", "scare", "scarf", "scarp", "scars", "scart", "scary", "scats",
  "scatt", "scaup", "scaur", "scena", "scend", "scene", "scent", "schmo", "schul", "schwa",
  "scion", "scoff", "scold", "scone", "scoop", "scoot", "scope", "scops", "score", "scorn",
  "scots", "scour", "scout", "scowl", "scows", "scram", "scrap", "scree", "screw", "scrim",
  "scrip", "scrod", "scrub", "scrum", "scuba", "scudi", "scudo", "scuds", "scuff", "sculk",
  "scull", "sculp", "scums", "scurf", "scuta", "scute", "scuts", "seals", "seams", "seamy",
  "sears", "seats", "sebum", "secco", "sects", "sedan", "seder", "sedge", "sedgy", "sedum",
  "seeds", "seedy", "seeks", "seels", "seely", "seems", "seeps", "seepy", "seers", "segni",
  "segno", "segos", "segue", "seifs", "seine", "seise", "seism", "seize", "selah", "selfs",
  "sella", "selle", "sells", "semen", "semes", "semis", "sends", "sengi", "senna", "senor",
  "sensa", "sense", "sente", "senti", "sepal", "sepia", "sepic", "sepoy", "septa", "septs",
  "serac", "serai", "seral", "sered", "serer", "seres", "serfs", "serge", "serif", "serin",
  "serow", "serry", "serum", "serve", "servo", "setup", "seven", "sever", "sewan", "sewar",
  "sewed", "sewer", "sexed", "sexes", "sexts", "shack", "shade", "shads", "shady", "shaft",
  "shags", "shahs", "shake", "shako", "shaky", "shale", "shall", "shalt", "shaly", "shame",
  "shams", "shank", "shape", "shard", "share", "shark", "sharn", "sharp", "shave", "shawl",
  "shawm", "shawn", "shaws", "shays", "sheaf", "sheal", "shear", "sheas", "sheds", "sheen",
  "sheep", "sheer", "sheet", "sheik", "shelf", "shell", "shend", "shent", "sheol", "sherd",
  "shewn", "shews", "shied", "shiel", "shier", "shies", "shift", "shill", "shily", "shims",
  "shine", "shins", "shiny", "ships", "shire", "shirk", "shirr", "shirt", "shist", "shits",
  "shiva", "shive", "shivs", "shlep", "shlub", "shmoe", "shoal", "shoat", "shock", "shoed",
  "shoer", "shoes", "shogs", "shoji", "shone", "shook", "shool", "shoon", "shoos", "shoot",
  "shops", "shore", "shorl", "shorn", "short", "shote", "shots", "shott", "shout", "shove",
  "shown", "shows", "showy", "shoyu", "shred", "shrew", "shris", "shrub", "shrug", "shtik",
  "shuck", "shuls", "shuns", "shunt", "shura", "shush", "shute", "shuts", "shyer", "shyly",
  "sials", "sibbs", "sibyl", "sicko", "sicks", "sided", "sider", "sides", "sidhe", "sidle",
  "siege", "sieur", "sieve", "sifts", "sighs", "sight", "sigma", "signa", "signs", "sikas",
  "siker", "sikes", "silds", "silex", "silks", "silky", "sills", "silly", "silos", "silts",
  "silty", "silva", "simar", "simas", "simps", "since", "sines", "sinew", "singe", "sings",
  "sinhs", "sinks", "sinus", "siped", "sipes", "sippy", "sired", "siree", "siren", "sires",
  "sirra", "sirup", "sisal", "sises", "sissy", "sitar", "sited", "sites", "situp", "situs",
  "siver", "sixes", "sixmo", "sixte", "sixth", "sixty", "sizar", "sized", "sizer", "sizes",
  "skags", "skald", "skank", "skate", "skats", "skean", "skeed", "skeen", "skees", "skeet",
  "skegs", "skein", "skell", "skelm", "skelp", "skene", "skeps", "skews", "skied", "skier",
  "skies", "skiey", "skiff", "skill", "skimp", "skims", "skink", "skins", "skint", "skips",
  "skirl", "skirr", "skirt", "skite", "skits", "skive", "skoal", "skort", "skosh", "skulk",
  "skull", "skunk", "skyed", "skyey", "slabs", "slack", "slags", "slain", "slake", "slams",
  "slang", "slank", "slant", "slaps", "slash", "slate", "slats", "slaty", "slave", "slaws",
  "slays", "sleds", "sleek", "sleep", "sleet", "slept", "slews", "slice", "slick", "slide",
  "slier", "slily", "slime", "slims", "slimy", "sling", "slink", "slips", "slipt", "slits",
  "slobs", "slogs", "slojd", "slomo", "slops", "slope", "slosh", "sloth", "slots", "slows",
  "sloyd", "slubs", "slued", "slues", "sluff", "slugs", "slums", "slung", "slunk", "slurb",
  "slurp", "slurs", "slush", "slyer", "slyly", "smack", "small", "smalt", "smarm", "smart",
  "smash", "smaze", "smear", "smeek", "smell", "smelt", "smerk", "smews", "smile", "smirk",
  "smite", "smith", "smock", "smogs", "smoke", "smoky", "smolt", "smorg", "smote", "smush",
  "snack", "snafu", "snags", "snail", "snake", "snaky", "snaps", "snare", "snark", "snarl",
  "snash", "snath", "snaws", "sneak", "sneap", "sneck", "sneds", "sneer", "snell", "snibs",
  "snick", "snide", "sniff", "snipe", "snips", "snits", "snobs", "snogs", "snood", "snook",
  "snool", "snoop", "snoot", "snore", "snort", "snots", "snout", "snows", "snowy", "snubs",
  "snuck", "snuff", "snugs", "soaks", "soaps", "soapy", "soars", "sobas", "sober", "socas",
  "socks", "socko", "sodas", "soddy", "sodic", "sofar", "sofas", "softa", "softs", "softy",
  "soggy", "soils", "sojas", "sokes", "sokol", "solar", "soled", "solei", "soler", "soles",
  "solid", "solos", "solum", "solus", "solve", "somas", "sonar", "sonde", "sones", "songs",
  "sonic", "sonly", "sonny", "sonsy", "sooey", "sooks", "sooth", "soots", "sooty", "sophs",
  "sophy", "sopor", "soppy", "soras", "sorbs", "sords", "sorel", "sorer", "sores", "sorgo",
  "sorns", "sorry", "sorts", "sorus", "soths", "sotol", "sough", "souks", "souls", "sound",
  "soups", "soupy", "sours", "souse", "south", "sowar", "sowed", "sower", "soyas", "soyuz",
  "sozin", "space", "spacy", "spade", "spado", "spaed", "spaes", "spahi", "spail", "spait",
  "spake", "spale", "spall", "spams", "spang", "spank", "spans", "spare", "spark", "spars",
  "spasm", "spate", "spats", "spawn", "spays", "speak", "spean", "spear", "speck", "specs",
  "speed", "speel", "speer", "speil", "speir", "spell", "spelt", "spend", "spent", "sperm",
  "spews", "spica", "spice", "spicy", "spied", "spiel", "spier", "spies", "spiff", "spike",
  "spiky", "spile", "spill", "spilt", "spine", "spins", "spiny", "spire", "spirt", "spiry",
  "spite", "spits", "spitz", "spivs", "splat", "splay", "split", "spode", "spoil", "spoke",
  "spoof", "spook", "spool", "spoon", "spoor", "spore", "sport", "spots", "spout", "sprag",
  "sprat", "spray", "spree", "sprig", "sprit", "sprue", "spuds", "spued", "spues", "spume",
  "spumy", "spunk", "spurn", "spurs", "spurt", "sputa", "squab", "squad", "squat", "squaw",
  "squib", "squid", "stabs", "stack", "stade", "staff", "stage", "stags", "stagy", "staid",
  "staig", "stain", "stair", "stake", "stale", "stalk", "stall", "stamp", "stand", "stane",
  "stang", "stank", "staph", "stare", "stark", "stars", "start", "stash", "state", "stats",
  "stave", "stays", "stead", "steak", "steal", "steam", "steed", "steek", "steel", "steep",
  "steer", "stein", "stela", "stele", "stems", "steno", "stens", "steps", "stere", "stern",
  "stets", "stews", "stewy", "stick", "stied", "sties", "stiff", "stile", "still", "stilt",
  "stime", "stimy", "sting", "stink", "stint", "stipe", "stirk", "stirp", "stirs", "stoat",
  "stobs", "stock", "stogy", "stoic", "stoke", "stole", "stoll", "stomp", "stone", "stony",
  "stood", "stook", "stool", "stoop", "stope", "stops", "stopt", "store", "stork", "storm",
  "story", "stoss", "stots", "stoup", "stour", "stout", "stove", "stows", "strap", "straw",
  "stray", "strep", "strew", "stria", "strip", "strop", "strow", "stroy", "strum", "strut",
  "stuck", "studs", "study", "stuff", "stull", "stump", "stums", "stung", "stunk", "stuns",
  "stunt", "stupa", "stupe", "sturt", "styed", "styes", "style", "styli", "stylo", "styme",
  "stymy", "suave", "subah", "subas", "suber", "sucks", "sucre", "sudds", "sudor", "sudsy",
  "suede", "suers", "suets", "suety", "sugar", "sughs", "suing", "suint", "suite", "suits",
  "sulci", "sulfa", "sulfo", "sulks", "sulky", "sully", "sulus", "sumac", "summa", "sumos",
  "sumps", "sunks", "sunna", "sunns", "sunny", "sunup", "super", "supes", "supra", "surah",
  "sural", "suras", "surds", "surer", "surfs", "surfy", "surge", "surgy", "surly", "surra",
  "sushi", "sutra", "sutta", "swabs", "swage", "swags", "swail", "swain", "swale", "swami",
  "swamp", "swang", "swank", "swans", "swaps", "sward", "sware", "swarf", "swarm", "swart",
  "swash", "swath", "swats", "sways", "swear", "sweat", "swede", "sweep", "sweet", "swell",
  "swept", "swift", "swigs", "swill", "swims", "swine", "swing", "swink", "swipe", "swirl",
  "swish", "swiss", "swith", "swive", "swobs", "swoon", "swoop", "swops", "sword", "swore",
  "sworn", "swots", "swoun", "swung", "sycee", "syces", "sykes", "sylph", "sylva", "syncs",
  "synod", "synth", "syphs", "syren", "syrup", "tabby", "taber", "tabes", "tabid", "tabla",
  "table", "taboo", "tabor", "tabun", "tabus", "taces", "tacet", "tache", "tachs", "tacit",
  "tacks", "tacky", "tacos", "tacts", "taels", "tafia", "tahrs", "taiga", "tails", "tains",
  "taint", "tajes", "takas", "taken", "taker", "takes", "takin", "talar", "talas", "talcs",
  "talcy", "taler", "tales", "talks", "talky", "talls", "tally", "talon", "taluk", "talus",
  "tamal", "tamed", "tamer", "tames", "tamis", "tammy", "tamps", "tango", "tangs", "tangy",
  "tanka", "tanks", "tansy", "tanto", "tapas", "taped", "taper", "tapes", "tapir", "tapis",
  "tardo", "tardy", "tared", "tares", "targa", "targe", "tarns", "taroc", "tarok", "taros",
  "tarot", "tarps", "tarre", "tarry", "tarsi", "tarts", "tarty", "tasks", "tasse", "taste",
  "tasty", "tatar", "tater", "tates", "tatty", "taunt", "tauon", "taupe", "tauts", "tawed",
  "tawer", "tawie", "tawse", "taxed", "taxer", "taxes", "taxis", "taxol", "taxon", "taxus",
  "tayra", "tazza", "tazze", "teach", "teaks", "teals", "teams", "tears", "teary", "tease",
  "teats", "techs", "techy", "tecta", "teddy", "teems", "teens", "teeny", "teeth", "teffs",
  "teggs", "tegua", "tegus", "teiid", "teind", "telco", "teles", "telex", "telia", "telic",
  "tells", "telly", "telos", "tempi", "tempo", "temps", "tempt", "tench", "tends", "tenet",
  "tenge", "tenia", "tenon", "tenor", "tense", "tenth", "tents", "tenty", "tepal", "tepas",
  "tepee", "tepid", "terai", "terce", "terga", "terms", "terne", "terns", "terra", "terry",
  "terse", "tesla", "testa", "tests", "testy", "teths", "tetra", "tetri", "teuch", "teugh",
  "tewed", "texas", "texts", "thack", "thane", "thank", "tharm", "thaws", "thebe", "theca",
  "theft", "thegn", "thein", "their", "theme", "thens", "there", "therm", "these", "theta",
  "thews", "thewy", "thick", "thief", "thigh", "thill", "thine", "thing", "think", "thins",
  "thiol", "third", "thole", "thong", "thorn", "thoro", "thorp", "those", "thous", "thraw",
  "three", "threw", "thrip", "throb", "throe", "throw", "thrum", "thuds", "thugs", "thuja",
  "thumb", "thump", "thunk", "thurl", "thuya", "thyme", "thymi", "thymy", "tiara", "tibia",
  "tical", "ticks", "tidal", "tided", "tides", "tiers", "tiger", "tight", "tigon", "tikes",
  "tikis", "tilak", "tilde", "tiled", "tiler", "tiles", "tilts", "timed", "timer", "times",
  "timid", "tinct", "tinea", "tined", "tines", "tinge", "tings", "tinny", "tints", "tipis",
  "tippy", "tipsy", "tired", "tires", "tirls", "tiros", "titan", "titer", "tithe", "titis",
  "title", "titre", "titty", "tizzy", "toads", "toady", "toast", "today", "toddy", "toeas",
  "toffs", "toffy", "tofts", "tofus", "togae", "togas", "togue", "toile", "toils", "tokay",
  "toked", "token", "toker", "tokes", "tolan", "tolar", "tolas", "toled", "toles", "tolls",
  "tolyl", "toman", "tombs", "tomes", "tommy", "tonal", "tondi", "tondo", "toned", "toner",
  "tones", "toney", "tonga", "tongs", "tonic", "tonne", "tonus", "tools", "toons", "tooth",
  "toots", "topaz", "toped", "topee", "toper", "topes", "tophe", "tophi", "tophs", "topic",
  "topis", "topoi", "topos", "toque", "torah", "toras", "torch", "torcs", "tored", "tores",
  "toric", "torii", "toros", "torot", "torse", "torsi", "torsk", "torso", "torte", "torts",
  "torus", "total", "toted", "totem", "toter", "totes", "touch", "tough", "tours", "touse",
  "touts", "towed", "towel", "tower", "towie", "towns", "towny", "toxic", "toxin", "toyed",
  "toyer", "toyon", "toyos", "trace", "track", "tract", "trade", "trads", "tragi", "trail",
  "train", "trait", "tramp", "trams", "trank", "trans", "traps", "trapt", "trash", "trass",
  "trave", "trawl", "trays", "tread", "treat", "treed", "treen", "trees", "treks", "trend",
  "tress", "trets", "trews", "treys", "triad", "trial", "tribe", "trice", "trick", "tried",
  "trier", "tries", "trigs", "trike", "trill", "trims", "trine", "triol", "trios", "tripe",
  "trips", "trite", "troad", "troak", "trock", "trode", "trois", "troke", "troll", "tromp",
  "trona", "trone", "troop", "trooz", "trope", "troth", "trots", "trout", "trove", "trows",
  "troys", "truce", "truck", "trued", "truer", "trues", "trugs", "trull", "truly", "trump",
  "trunk", "truss", "trust", "truth", "tryer", "tryma", "tryst", "tsade", "tsadi", "tsars",
  "tsked", "tsuba", "tubae", "tubal", "tubas", "tubby", "tubed", "tuber", "tubes", "tucks",
  "tufas", "tuffs", "tufts", "tufty", "tules", "tulip", "tulle", "tumid", "tummy", "tumor",
  "tumps", "tunas", "tuned", "tuner", "tunes", "tungs", "tunic", "tunny", "tupik", "tuque",
  "turbo", "turds", "turfs", "turfy", "turns", "turps", "tushy", "tusks", "tusky", "tutee",
  "tutor", "tutti", "tutty", "tutus", "tuxes", "tuyer", "twaes", "twain", "twang", "twats",
  "tweak", "tweed", "tweet", "twerp", "twice", "twigs", "twill", "twine", "twins", "twiny",
  "twirl", "twirp", "twist", "twits", "twixt", "twyer", "tyees", "tyers", "tying", "tykes",
  "tyned", "tynes", "typed", "types", "typic", "typos", "typps", "tyres", "tyros", "tzars",
  "udder", "udons", "ughed", "uhlan", "ukase", "ulama", "ulans", "ulcer", "ulema", "ulnad",
  "ulnae", "ulnar", "ulnas", "ulpan", "ultra", "ulvas", "umami", "umbel", "umber", "umbos",
  "umbra", "umiac", "umiak", "umiaq", "umped", "umphs", "umpty", "unapt", "unarm", "unary",
  "unaus", "unban", "unbar", "unbid", "unbox", "uncap", "uncia", "uncle", "uncos", "uncoy",
  "uncus", "uncut", "undee", "under", "undid", "undue", "unfed", "unfit", "unfix", "ungot",
  "unhip", "unify", "union", "unite", "units", "unity", "unjam", "unked", "unkey", "unkid",
  "unlay", "unled", "unlet", "unlit", "unman", "unmet", "unmew", "unmix", "unpeg", "unpen",
  "unpin", "unred", "unref", "unrig", "unrip", "unsay", "unset", "unsew", "unsex", "untie",
  "until", "unwed", "unwet", "unwit", "unwon", "unzip", "upbow", "upbye", "updip", "updos",
  "updry", "upend", "uplit", "upped", "upper", "upset", "ureal", "ureas", "uredo", "ureic",
  "urged", "urger", "urges", "urial", "urine", "urned", "ursid", "usage", "useds", "usees",
  "users", "usher", "using", "usnea", "usque", "usual", "usurp", "usury", "uteri", "utero",
  "utile", "utter", "uveal", "uveas", "uvula", "vacua", "vague", "vagus", "vails", "vaire",
  "vairs", "vakil", "vales", "valet", "valid", "valor", "valse", "value", "valve", "vamps",
  "vampy", "vanda", "vaned", "vanes", "vangs", "vapid", "vapor", "varas", "varia", "varix",
  "varna", "varus", "varve", "vasal", "vases", "vasts", "vasty", "vatic", "vatus", "vault",
  "vaunt", "veals", "vealy", "veena", "veeps", "veers", "veery", "vegan", "vegas", "veges",
  "veils", "veily", "veins", "veiny", "velar", "velds", "veldt", "velum", "venae", "venal",
  "vends", "venge", "venin", "venom", "vents", "venue", "venus", "verbs", "verge", "verse",
  "verso", "verst", "verts", "vertu", "verve", "vesta", "vests", "vetch", "vexed", "vexer",
  "vexes", "vexil", "vials", "viand", "vibes", "vicar", "viced", "vices", "vichy", "video",
  "viers", "views", "viewy", "vigas", "vigil", "vigor", "viler", "villa", "vills", "vimen",
  "vinal", "vinas", "vinca", "vined", "viner", "vines", "vinic", "vinos", "vinyl", "viola",
  "viols", "viper", "viral", "vireo", "vires", "virga", "virid", "virls", "virus", "visas",
  "vised", "vises", "visit", "visor", "vista", "vitas", "vitro", "vitta", "vivas", "vivat",
  "viver", "vives", "vivid", "vixen", "vizir", "vizor", "vocab", "vocal", "voces", "vodka",
  "vodun", "vogue", "voice", "voids", "voila", "voile", "volar", "voled", "voles", "volta",
  "volte", "volti", "volts", "volva", "vomer", "vomit", "voted", "voter", "votes", "vouch",
  "vowed", "vowel", "vower", "vroom", "vrouw", "vrows", "vulgo", "vulns", "vulva", "vying",
  "wacke", "wacko", "wacks", "wacky", "waddy", "waded", "wader", "wades", "wadis", "wafer",
  "waffs", "wafts", "waged", "wager", "wages", "wagon", "wahoo", "waifs", "wails", "wains",
  "wairs", "waist", "waits", "waive", "waked", "waken", "waker", "wakes", "waldo", "waled",
  "waler", "wales", "walks", "walla", "walls", "wally", "waltz", "wames", "wamus", "wands",
  "waned", "waner", "wanes", "waney", "wangs", "wanks", "wanly", "wanna", "wants", "warfs",
  "warks", "warms", "warns", "warps", "warts", "warty", "washy", "wasps", "waspy", "waste",
  "wasts", "watch", "water", "watts", "waugh", "wauks", "wauls", "waved", "waver", "waves",
  "wavey", "wawls", "waxed", "waxen", "waxer", "waxes", "weald", "weals", "weans", "wears",
  "weary", "weave", "webby", "weber", "wecht", "wedel", "wedge", "wedgy", "weeds", "weedy",
  "weeks", "weens", "weeny", "weeps", "weepy", "weest", "weets", "wefts", "weigh", "weird",
  "weirs", "wekas", "welch", "welds", "wells", "welly", "welsh", "welts", "wench", "wends",
  "wenny", "wests", "wetly", "whack", "whale", "whamo", "whams", "whang", "whaps", "wharf",
  "whats", "whaup", "wheal", "wheat", "wheel", "wheep", "whelk", "whelm", "whelp", "whens",
  "where", "whets", "whews", "wheys", "which", "whids", "whiff", "whigs", "while", "whims",
  "whine", "whins", "whiny", "whips", "whipt", "whirl", "whirr", "whirs", "whish", "whisk",
  "whist", "white", "whits", "whity", "whizz", "whole", "whomp", "whoof", "whoop", "whops",
  "whore", "whorl", "whort", "whose", "whoso", "whump", "whups", "wicks", "widdy", "widen",
  "wider", "wides", "widow", "width", "wield", "wifed", "wifes", "wifey", "wifty", "wigan",
  "wiggy", "wight", "wilco", "wilds", "wiled", "wiles", "wills", "willy", "wilts", "wimps",
  "wimpy", "wince", "winch", "winds", "windy", "wined", "wines", "winey", "wings", "wingy",
  "winks", "winky", "winos", "winze", "wiped", "wiper", "wipes", "wired", "wirer", "wires",
  "wised", "wiser", "wises", "wisps", "wispy", "witch", "wited", "wites", "withe", "withs",
  "withy", "witty", "wived", "wiver", "wives", "wizen", "wizes", "woads", "woald", "wocks",
  "wodge", "woful", "woken", "wolds", "wolfs", "woman", "wombs", "womby", "women", "womyn",
  "wonks", "wonky", "wonts", "woods", "woody", "wooed", "wooer", "woofs", "wools", "wooly",
  "woops", "woosh", "woozy", "words", "wordy", "works", "world", "worms", "wormy", "worry",
  "worse", "worst", "worth", "worts", "would", "wound", "woven", "wowed", "wowee", "wrack",
  "wrang", "wraps", "wrapt", "wrath", "wreak", "wreck", "wrest", "wrick", "wried", "wrier",
  "wries", "wring", "wrist", "write", "writs", "wrong", "wrote", "wroth", "wrung", "wryer",
  "wryly", "wurst", "wushu", "wussy", "wyled", "wyles", "wynds", "wynns", "wyted", "wytes",
  "xebec", "xenia", "xenic", "xenon", "xeric", "xerox", "xerus", "xylan", "xylem", "xylol",
  "xylyl", "xysti", "xysts", "yacht", "yacks", "yaffs", "yager", "yages", "yahoo", "yaird",
  "yamen", "yamis", "yamun", "yangs", "yanks", "yapok", "yapon", "yappy", "yards", "yarer",
  "yarns", "yauds", "yauld", "yaups", "yawed", "yawey", "yawls", "yawns", "yawny", "yawps",
  "yeahs", "yearn", "years", "yeast", "yeggs", "yelks", "yells", "yelps", "yenta", "yente",
  "yerba", "yerks", "yeses", "yetis", "yetts", "yeuks", "yeuky", "yield", "yikes", "yills",
  "yince", "yipes", "yirds", "yirrs", "yirth", "ylems", "yobbo", "yobby", "yocks", "yodel",
  "yodhs", "yodle", "yogas", "yogee", "yoghs", "yogic", "yogin", "yogis", "yoked", "yokel",
  "yoker", "yokes", "yolks", "yolky", "yonic", "yonis", "yores", "young", "yourn", "yours",
  "youse", "youth", "yowes", "yowie", "yowls", "yuans", "yucas", "yucca", "yucch", "yucks",
  "yucky", "yugas", "yukky", "yulan", "yules", "yummy", "yuppy", "yurta", "yurts", "zappy",
  "zarfs", "zaxes", "zayin", "zazen", "zeals", "zebec", "zebra", "zebus", "zeins", "zendo",
  "zerks", "zeros", "zests", "zesty", "zetas", "zibet", "zilch", "zills", "zincs", "zincy",
  "zineb", "zines", "zings", "zingy", "zinky", "zippy", "ziram", "zitis", "zizit", "zlote",
  "zloty", "zoeae", "zoeal", "zoeas", "zombi", "zonal", "zoned", "zoner", "zones", "zonks",
  "zooey", "zooid", "zooks", "zooms", "zoons", "zooty", "zoril", "zoris", "zouks", "zowie",
  "zuzim", "zymes"
])

type LetterState = "correct" | "present" | "absent" | "empty" | "tbd"

interface TileProps {
  letter: string
  state: LetterState
  isRevealing?: boolean
  delay?: number
}

function Tile({ letter, state, isRevealing, delay = 0 }: TileProps) {
  const [revealed, setRevealed] = useState(!isRevealing)

  useEffect(() => {
    if (isRevealing) {
      const timer = setTimeout(() => setRevealed(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isRevealing, delay])

  const bgColor = revealed ? {
    correct: "bg-green-500 border-green-500 text-white",
    present: "bg-yellow-500 border-yellow-500 text-white",
    absent: "bg-zinc-500 border-zinc-500 text-white",
    empty: "bg-transparent border-zinc-300 dark:border-zinc-600",
    tbd: "bg-transparent border-zinc-400 dark:border-zinc-500"
  }[state] : "bg-transparent border-zinc-400 dark:border-zinc-500"

  return (
    <div
      className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase transition-all duration-300 ${bgColor} ${isRevealing && !revealed ? "scale-y-0" : "scale-y-100"}`}
      style={{ transitionDelay: isRevealing ? `${delay}ms` : "0ms" }}
    >
      {letter}
    </div>
  )
}

interface KeyboardProps {
  onKey: (key: string) => void
  letterStates: Record<string, LetterState>
}

function Keyboard({ onKey, letterStates }: KeyboardProps) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
  ]

  const getKeyColor = (key: string) => {
    const state = letterStates[key]
    if (state === "correct") return "bg-green-500 text-white hover:bg-green-600"
    if (state === "present") return "bg-yellow-500 text-white hover:bg-yellow-600"
    if (state === "absent") return "bg-zinc-500 text-white hover:bg-zinc-600"
    return "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
  }

  return (
    <div className="flex flex-col gap-1.5 items-center">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1.5">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className={`${key.length > 1 ? "px-2 sm:px-4 text-xs" : "w-8 sm:w-10"} h-12 sm:h-14 rounded font-semibold uppercase transition-colors ${getKeyColor(key)}`}
            >
              {key === "backspace" ? "←" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Wordle() {
  const [targetWord, setTargetWord] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [revealingRow, setRevealingRow] = useState<number | null>(null)
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState("")
  const [stats, setStats] = useState({ played: 0, won: 0, streak: 0, maxStreak: 0 })
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({})

  const initGame = useCallback(() => {
    const word = ANSWER_WORDS[Math.floor(Math.random() * ANSWER_WORDS.length)]
    setTargetWord(word)
    setGuesses([])
    setCurrentGuess("")
    setGameOver(false)
    setWon(false)
    setRevealingRow(null)
    setMessage("")
    setLetterStates({})
  }, [])

  useEffect(() => {
    initGame()
    const saved = localStorage.getItem("wordle-stats")
    if (saved) setStats(JSON.parse(saved))
  }, [initGame])

  const saveStats = (didWin: boolean) => {
    const newStats = {
      played: stats.played + 1,
      won: stats.won + (didWin ? 1 : 0),
      streak: didWin ? stats.streak + 1 : 0,
      maxStreak: didWin ? Math.max(stats.maxStreak, stats.streak + 1) : stats.maxStreak
    }
    setStats(newStats)
    localStorage.setItem("wordle-stats", JSON.stringify(newStats))
  }

  const getLetterStates = (guess: string): LetterState[] => {
    const states: LetterState[] = Array(WORD_LENGTH).fill("absent")
    const targetLetters = targetWord.split("")
    const guessLetters = guess.split("")

    // First pass: mark correct letters
    guessLetters.forEach((letter, i) => {
      if (letter === targetLetters[i]) {
        states[i] = "correct"
        targetLetters[i] = ""
      }
    })

    // Second pass: mark present letters
    guessLetters.forEach((letter, i) => {
      if (states[i] !== "correct") {
        const targetIndex = targetLetters.indexOf(letter)
        if (targetIndex !== -1) {
          states[i] = "present"
          targetLetters[targetIndex] = ""
        }
      }
    })

    return states
  }

  const updateKeyboardStates = (guess: string, states: LetterState[]) => {
    const newLetterStates = { ...letterStates }
    guess.split("").forEach((letter, i) => {
      const current = newLetterStates[letter]
      const newState = states[i]
      // Only upgrade states: absent -> present -> correct
      if (!current || 
          (current === "absent" && (newState === "present" || newState === "correct")) ||
          (current === "present" && newState === "correct")) {
        newLetterStates[letter] = newState
      }
    })
    setLetterStates(newLetterStates)
  }

  const submitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setShake(true)
      setMessage("Not enough letters")
      setTimeout(() => {
        setShake(false)
        setMessage("")
      }, 1000)
      return
    }

    if (!VALID_WORDS.has(currentGuess.toLowerCase())) {
      setShake(true)
      setMessage("Not in word list")
      setTimeout(() => {
        setShake(false)
        setMessage("")
      }, 1000)
      return
    }

    const guess = currentGuess.toLowerCase()
    const states = getLetterStates(guess)
    
    setRevealingRow(guesses.length)
    setGuesses([...guesses, guess])
    setCurrentGuess("")

    // Update keyboard after reveal animation
    setTimeout(() => {
      updateKeyboardStates(guess, states)
      setRevealingRow(null)

      if (guess === targetWord) {
        setWon(true)
        setGameOver(true)
        setMessage("Brilliant!")
        saveStats(true)
      } else if (guesses.length + 1 >= MAX_GUESSES) {
        setGameOver(true)
        setMessage(`The word was: ${targetWord.toUpperCase()}`)
        saveStats(false)
      }
    }, WORD_LENGTH * 300 + 300)
  }

  const handleKey = useCallback((key: string) => {
    if (gameOver) return

    if (key === "enter") {
      submitGuess()
    } else if (key === "backspace") {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (key.length === 1 && /^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key.toLowerCase())
    }
  }, [gameOver, currentGuess])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      
      if (e.key === "Enter") {
        handleKey("enter")
      } else if (e.key === "Backspace") {
        handleKey("backspace")
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKey])

  const renderGrid = () => {
    const rows = []
    
    for (let i = 0; i < MAX_GUESSES; i++) {
      const guess = guesses[i] || ""
      const isCurrentRow = i === guesses.length && !gameOver
      const isRevealing = i === revealingRow
      const displayGuess = isCurrentRow ? currentGuess : guess
      const states = guess ? getLetterStates(guess) : []

      rows.push(
        <div key={i} className={`flex gap-1.5 ${isCurrentRow && shake ? "animate-shake" : ""}`}>
          {Array(WORD_LENGTH).fill(null).map((_, j) => {
            const letter = displayGuess[j] || ""
            let state: LetterState = "empty"
            if (letter && !guess) state = "tbd"
            else if (states[j]) state = states[j]

            return (
              <Tile
                key={j}
                letter={letter}
                state={state}
                isRevealing={isRevealing}
                delay={j * 300}
              />
            )
          })}
        </div>
      )
    }

    return rows
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Stats */}
      <div className="flex gap-6 text-center text-sm">
        <div>
          <div className="text-2xl font-bold">{stats.played}</div>
          <div className="text-muted-foreground">Played</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.played ? Math.round((stats.won / stats.played) * 100) : 0}%</div>
          <div className="text-muted-foreground">Win %</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.streak}</div>
          <div className="text-muted-foreground">Streak</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.maxStreak}</div>
          <div className="text-muted-foreground">Max</div>
        </div>
      </div>

      {/* Message */}
      <div className="h-8 flex items-center justify-center">
        {message && (
          <div className="px-4 py-2 bg-foreground text-background rounded-md font-semibold text-sm animate-fade-in">
            {message}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-1.5">
        {renderGrid()}
      </div>

      {/* Keyboard */}
      <div className="mt-4">
        <Keyboard onKey={handleKey} letterStates={letterStates} />
      </div>

      {/* New Game Button */}
      {gameOver && (
        <Button onClick={initGame} className="mt-4">
          New Game
        </Button>
      )}

      {/* Add shake animation */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
