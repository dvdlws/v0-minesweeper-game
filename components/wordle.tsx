"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

const WORD_LENGTH = 5
const MAX_GUESSES = 6

const WORDS = [
  // A words
  "aback", "abate", "abbey", "abbot", "abide", "abled", "abode", "abort", "about", "above",
  "abuse", "abyss", "acorn", "acrid", "actor", "acute", "adage", "adapt", "added", "adder",
  "adept", "admin", "admit", "adobe", "adopt", "adult", "aegis", "aeons", "affix", "afire",
  "after", "again", "agate", "agent", "agile", "aging", "agony", "agree", "ahead", "aider",
  "aimed", "aisle", "alarm", "album", "alert", "algae", "alibi", "alien", "align", "alike",
  "alive", "allay", "alley", "allot", "allow", "alloy", "aloft", "alone", "along", "aloof",
  "alpha", "altar", "alter", "amaze", "amber", "amble", "amend", "amiss", "amity", "among",
  "ample", "amuse", "angel", "anger", "angle", "angry", "angst", "anime", "ankle", "annex",
  "annoy", "antic", "anvil", "aorta", "apart", "aphid", "apple", "apply", "apron", "aptly",
  "arbor", "ardor", "arena", "argue", "arise", "armor", "aroma", "arose", "array", "arrow",
  "arson", "artsy", "ascot", "ashen", "aside", "askew", "asset", "atlas", "atone", "attic",
  "audio", "audit", "augur", "aural", "avail", "avert", "avian", "avoid", "await", "awake",
  "award", "aware", "awash", "awful", "awoke", "axial", "axiom", "azure",
  // B words
  "babel", "bacon", "badge", "badly", "bagel", "baggy", "baker", "baler", "balmy", "banal",
  "banjo", "barge", "baron", "basal", "basic", "basil", "basin", "basis", "batch", "baton",
  "beach", "beady", "beard", "beast", "began", "begin", "begun", "being", "belly", "below",
  "bench", "berry", "beset", "bible", "biddy", "binge", "bingo", "biome", "birch", "birth",
  "bison", "black", "blade", "blame", "bland", "blank", "blare", "blast", "blaze", "bleak",
  "bleat", "bleed", "blend", "bless", "blimp", "blind", "blink", "bliss", "blitz", "bloat",
  "block", "bloke", "blond", "blood", "bloom", "blown", "blues", "bluff", "blunt", "blurb",
  "blurt", "blush", "board", "boast", "bobby", "boded", "boggy", "bogus", "boils", "boney",
  "bonus", "booby", "boost", "booth", "booty", "booze", "boozy", "borax", "bored", "borne",
  "bosom", "bossy", "botch", "bough", "bound", "boxer", "brace", "braid", "brain", "brake",
  "brand", "brash", "brass", "brave", "bravo", "brawl", "brawn", "bread", "break", "breed",
  "briar", "bribe", "brick", "bride", "brief", "brier", "brine", "bring", "brink", "briny",
  "brisk", "broad", "broil", "broke", "brood", "brook", "broom", "broth", "brown", "brunt",
  "brush", "brute", "buddy", "budge", "buggy", "build", "built", "bulge", "bulky", "bully",
  "bunch", "bunny", "burnt", "burst", "bushy", "butch", "butte", "buyer", "bylaw",
  // C words
  "cabal", "cabby", "cabin", "cable", "cacao", "cache", "cacti", "cadet", "cadge", "caged",
  "cagey", "cairn", "camel", "cameo", "canal", "candy", "canny", "canoe", "canon", "caper",
  "caput", "carat", "cargo", "carol", "carry", "carve", "caste", "catch", "cater", "catty",
  "caulk", "cause", "cavil", "cease", "cedar", "cello", "chafe", "chaff", "chain", "chair",
  "chalk", "champ", "chant", "chaos", "chard", "charm", "chart", "chase", "chasm", "cheap",
  "cheat", "check", "cheek", "cheer", "chess", "chest", "chick", "chide", "chief", "child",
  "chili", "chill", "chimp", "china", "chirp", "chive", "choir", "choke", "chord", "chore",
  "chose", "chunk", "churn", "cider", "cigar", "cinch", "circa", "civic", "civil", "clack",
  "claim", "clamp", "clang", "clank", "clash", "clasp", "class", "clean", "clear", "cleat",
  "cleft", "clerk", "click", "cliff", "climb", "cling", "clink", "cloak", "clock", "clone",
  "close", "cloth", "cloud", "clout", "clove", "clown", "clubs", "cluck", "clued", "clump",
  "clung", "coach", "coast", "cobra", "cocoa", "colon", "color", "comet", "comfy", "comic",
  "comma", "conch", "condo", "conic", "coral", "cords", "corer", "corny", "couch", "cough",
  "could", "count", "coupe", "court", "cover", "covet", "covey", "cower", "crack", "craft",
  "cramp", "crane", "crank", "crash", "crass", "crate", "crave", "crawl", "craze", "crazy",
  "creak", "cream", "creed", "creek", "creep", "creme", "crepe", "crept", "cress", "crest",
  "crick", "cried", "crime", "crimp", "crisp", "croak", "crock", "crone", "crony", "crook",
  "cross", "croup", "crowd", "crown", "crude", "cruel", "crumb", "crush", "crust", "crypt",
  "cubic", "cumin", "cupid", "curds", "cured", "curly", "curry", "curse", "curve", "curvy",
  "cushy", "cutie", "cyber", "cycle", "cynic",
  // D words
  "daddy", "daily", "dairy", "daisy", "dance", "dandy", "datum", "dated", "dealt", "death",
  "debit", "debug", "debut", "decal", "decay", "decor", "decoy", "decry", "defer", "deity",
  "delay", "delta", "delve", "demon", "demur", "denim", "dense", "depot", "depth", "derby",
  "deter", "detox", "deuce", "devil", "diary", "dicey", "digit", "dilly", "dimly", "diner",
  "dingo", "dingy", "dirty", "disco", "ditch", "ditto", "ditty", "diver", "dizzy", "dodge",
  "dodgy", "dogma", "doing", "dolly", "donor", "donut", "dopey", "dough", "doubt", "dowdy",
  "dowel", "downy", "dowry", "dozen", "draft", "drain", "drake", "drama", "drank", "drape",
  "drawl", "drawn", "dread", "dream", "dress", "dried", "drier", "drift", "drill", "drink",
  "drive", "droit", "droll", "drone", "drool", "droop", "dross", "drove", "drown", "drugs",
  "druid", "drunk", "dryer", "dryly", "ducky", "dully", "dummy", "dumpy", "dunce", "dunes",
  "dusty", "dutch", "duvet", "dwarf", "dwell", "dwelt", "dying",
  // E words
  "eager", "eagle", "early", "earth", "easel", "eaten", "eater", "eaves", "ebony", "edged",
  "edict", "edify", "eerie", "eight", "eject", "elbow", "elder", "elect", "elegy", "elfin",
  "elite", "elope", "elude", "email", "embed", "ember", "emcee", "empty", "enact", "ended",
  "endow", "enemy", "enjoy", "ennui", "ensue", "enter", "entry", "envoy", "epoch", "equal",
  "equip", "erase", "erect", "erode", "error", "erupt", "essay", "ether", "ethic", "ethos",
  "evade", "event", "every", "evict", "evoke", "exact", "exalt", "excel", "exert", "exile",
  "exist", "expat", "expel", "extra", "exude", "exult", "eying",
  // F words
  "fable", "facet", "facto", "faddy", "faded", "faery", "fagot", "faint", "fairy", "faith",
  "faker", "false", "famed", "fancy", "fanny", "farce", "fatal", "fatty", "fault", "fauna",
  "favor", "feast", "feats", "fecal", "feign", "feint", "fella", "felon", "femur", "fence",
  "feral", "ferry", "fetal", "fetch", "fetid", "fetus", "feud", "fever", "fiber", "fibre",
  "ficus", "field", "fiend", "fiery", "fifth", "fifty", "fight", "filch", "filet", "filly",
  "filmy", "filth", "final", "finch", "fined", "finer", "fired", "firer", "firms", "first",
  "fishy", "fists", "fitly", "fixed", "fixer", "fizzy", "fjord", "flack", "flags", "flair",
  "flake", "flaky", "flame", "flank", "flaps", "flare", "flash", "flask", "flats", "flaws",
  "fleas", "fleck", "flesh", "flick", "flier", "flies", "fling", "flint", "flips", "flirt",
  "float", "flock", "flood", "floor", "flops", "flora", "floss", "flour", "flout", "flows",
  "flubs", "fluff", "fluid", "fluke", "flung", "flunk", "flush", "flute", "foamy", "focal",
  "focus", "foggy", "foist", "folly", "fonts", "foray", "force", "forge", "forgo", "forms",
  "forte", "forth", "forty", "forum", "fossil", "foster", "foul", "found", "fount", "fowl",
  "foyer", "frail", "frame", "frank", "fraud", "freak", "freed", "fresh", "friar", "fried",
  "fries", "frill", "frisk", "fritz", "frizz", "frock", "frogs", "frolic", "from", "front",
  "frost", "froth", "frown", "froze", "fruit", "frump", "fudge", "fuels", "fugue", "fully",
  "fumed", "fumes", "funds", "fungi", "funky", "funny", "furry", "fused", "fuses", "fussy",
  "fusty", "fuzzy",
  // G words
  "gaily", "gains", "gaits", "gamer", "gamma", "gamut", "gassy", "gaudy", "gauge", "gaunt",
  "gauze", "gauzy", "gavel", "gawks", "gawky", "gazer", "gecko", "geeks", "geeky", "geese",
  "genie", "genre", "ghost", "giant", "giddy", "gilds", "gilts", "girth", "given", "giver",
  "gizmo", "glade", "gland", "glare", "glass", "glaze", "gleam", "glean", "glebe", "gleed",
  "gleen", "glees", "glens", "glide", "glims", "glint", "glitz", "gloat", "globe", "globs",
  "gloom", "glops", "glory", "gloss", "glove", "glows", "glued", "glues", "gluey", "glugs",
  "gluts", "glyph", "gnarl", "gnars", "gnash", "gnats", "gnawn", "gnaws", "gnome", "goads",
  "goals", "goats", "godly", "goers", "going", "goner", "gongs", "gonna", "goods", "gooey",
  "goofs", "goofy", "goons", "goose", "gored", "gores", "gorge", "gotta", "gouge", "gourd",
  "gouts", "gowns", "grace", "grade", "graft", "grail", "grain", "grams", "grand", "grant",
  "grape", "graph", "grasp", "grass", "grate", "grave", "gravy", "grays", "graze", "great",
  "greed", "greek", "green", "greet", "grief", "grill", "grime", "grimy", "grind", "grins",
  "gripe", "grips", "grist", "grits", "groan", "groat", "groin", "groom", "grope", "gross",
  "group", "grout", "grove", "growl", "grown", "grows", "grubs", "gruel", "gruff", "grump",
  "grunt", "guano", "guard", "guava", "guess", "guest", "guide", "guild", "guilt", "guise",
  "gulch", "gulfs", "gulls", "gulps", "gummy", "gunks", "gunky", "gunny", "guppy", "gusto",
  "gusty", "gutsy", "gypsy",
  // H words
  "habit", "haiku", "hairs", "hairy", "haled", "haler", "hales", "halfs", "halls", "halos",
  "halts", "halve", "hands", "handy", "hangs", "hanks", "happy", "hardy", "harem", "harms",
  "harps", "harry", "harsh", "haste", "hasty", "hatch", "hated", "hater", "hates", "hauls",
  "haunt", "haven", "havoc", "hawks", "hazel", "heads", "heady", "heals", "heaps", "heard",
  "hears", "heart", "heats", "heave", "heavy", "hedge", "heeds", "heels", "hefts", "hefty",
  "heirs", "heist", "helix", "hello", "helps", "hence", "henna", "herbs", "herds", "heron",
  "heros", "hertz", "hewed", "hewer", "hexed", "hexes", "hider", "hides", "highs", "hiked",
  "hiker", "hikes", "hills", "hilly", "hilts", "hinds", "hinge", "hints", "hippo", "hippy",
  "hired", "hirer", "hires", "hitch", "hives", "hoard", "hoary", "hobby", "hobos", "hocks",
  "hoist", "holds", "holed", "holes", "holly", "homer", "homes", "homey", "honey", "honor",
  "hoods", "hooey", "hoofs", "hooks", "hooky", "hoops", "hoots", "hoped", "hoper", "hopes",
  "horde", "horns", "horny", "horse", "horsy", "hosed", "hoses", "hotel", "hotly", "hound",
  "hours", "house", "hovel", "hover", "howdy", "howls", "hubby", "huffs", "huffy", "huger",
  "hulks", "hulky", "hulls", "human", "humid", "humps", "humpy", "humus", "hunch", "hunks",
  "hunky", "hunts", "hurds", "hurls", "hurry", "hurts", "husks", "husky", "hussy", "hutch",
  "hydra", "hyena", "hymen", "hymns", "hyped", "hyper", "hypes",
  // I words
  "icier", "icily", "icing", "ideal", "ideas", "idiom", "idiot", "idled", "idler", "idles",
  "idols", "igloo", "image", "imbue", "impel", "imply", "inane", "incur", "index", "indie",
  "inept", "inert", "infer", "ingot", "inlet", "inner", "input", "inter", "intro", "ionic",
  "irate", "irked", "irony", "isles", "issue", "itchy", "items", "ivory",
  // J words
  "jab", "jabs", "jacks", "jaded", "jades", "jails", "jakes", "jambs", "james", "jammy",
  "japan", "japed", "japer", "japes", "jasper", "jaunt", "jazzy", "jeans", "jeeps", "jeers",
  "jelly", "jenny", "jerks", "jerky", "jesus", "jetty", "jewel", "jibed", "jiber", "jibes",
  "jiffy", "jilts", "jimmy", "jingo", "jinks", "jinni", "jived", "jiver", "jives", "jockey",
  "johns", "joins", "joint", "joist", "joked", "joker", "jokes", "jokey", "jolly", "jolts",
  "jones", "joust", "joyed", "judge", "juice", "juicy", "julep", "jumbo", "jumps", "jumpy",
  "junco", "junks", "junky", "juror", "justs", "jutes",
  // K words
  "kayak", "kazoo", "kebab", "keels", "keens", "keeps", "kelps", "kempt", "ketch", "keyed",
  "khaki", "kicks", "kicky", "kiddo", "kilns", "kilts", "kinds", "kinda", "kings", "kinks",
  "kinky", "kiosk", "kirks", "kited", "kiter", "kites", "kiths", "kitty", "kiwis", "knack",
  "knave", "knead", "kneed", "kneel", "knees", "knell", "knelt", "knife", "knits", "knobs",
  "knock", "knoll", "knots", "known", "knows", "koala", "koran", "kraal", "kraft", "krill",
  // L words
  "label", "labor", "laced", "lacer", "laces", "lacey", "lacks", "laden", "ladle", "lager",
  "lair", "lairs", "laity", "lakes", "lamas", "lambs", "lamed", "lamer", "lames", "lamps",
  "lance", "lands", "lanes", "lanky", "lapel", "lapse", "large", "largo", "larks", "larva",
  "laser", "lasso", "lasts", "latch", "later", "latex", "lathe", "laths", "laugh", "lavas",
  "lawns", "layer", "layup", "lazed", "lazes", "leach", "leads", "leafy", "leaks", "leaky",
  "leans", "leant", "leaps", "leapt", "learn", "lease", "leash", "least", "leave", "ledge",
  "leech", "leeks", "leers", "leery", "lefts", "lefty", "legal", "leggy", "lemma", "lemon",
  "lemur", "lends", "leper", "level", "lever", "liana", "liars", "libel", "licks", "liege",
  "liens", "lifts", "light", "liked", "liken", "liker", "likes", "lilac", "lilts", "limbo",
  "limbs", "limed", "limes", "limey", "limit", "limps", "lined", "linen", "liner", "lines",
  "lingo", "lings", "links", "lions", "lipid", "lisps", "lists", "liter", "lithe", "litre",
  "lived", "liven", "liver", "lives", "livid", "llama", "loads", "loafs", "loamy", "loans",
  "loath", "lobby", "lobed", "lobes", "local", "locus", "lodge", "lofts", "lofty", "logic",
  "loins", "loner", "longs", "looks", "looms", "loons", "loony", "loops", "loopy", "loose",
  "loots", "loped", "loper", "lopes", "lords", "lorry", "loser", "loses", "lossy", "lotus",
  "louse", "lousy", "louts", "loved", "lover", "loves", "lowed", "lower", "lowly", "loyal",
  "lucid", "lucks", "lucky", "lucre", "luffs", "luged", "luger", "luges", "lulls", "lumen",
  "lumps", "lumpy", "lunar", "lunch", "lunge", "lungs", "lupus", "lurch", "lured", "lurer",
  "lures", "lurks", "lusts", "lusty", "lying", "lymph", "lynch", "lyric",
  // M words
  "macho", "macro", "madam", "madly", "mafia", "magic", "magma", "maids", "mails", "maims",
  "mains", "maize", "major", "maker", "makes", "males", "malls", "malts", "mamba", "mamma",
  "mammy", "mango", "mangy", "mania", "manic", "manly", "manor", "maple", "march", "mares",
  "marks", "marry", "marsh", "masks", "mason", "masse", "masts", "match", "mated", "mater",
  "mates", "matte", "mauls", "maven", "maxed", "maxes", "maxim", "maybe", "mayor", "mazes",
  "meads", "meals", "mealy", "means", "meant", "meats", "meaty", "medal", "media", "medic",
  "meets", "melds", "melee", "melon", "melts", "memos", "mends", "menus", "meows", "mercy",
  "merge", "merit", "merry", "messy", "metal", "meter", "metro", "micro", "midst", "might",
  "miked", "mikes", "milks", "milky", "mills", "mimed", "mimer", "mimes", "mimic", "mince",
  "minds", "mined", "miner", "mines", "minor", "mints", "minty", "minus", "mired", "mires",
  "mirth", "miser", "missy", "mists", "misty", "miter", "mitts", "mixed", "mixer", "mixes",
  "moans", "moats", "mocks", "modal", "model", "modem", "modes", "moist", "molar", "molds",
  "moldy", "moles", "molts", "momma", "mommy", "money", "monks", "month", "moods", "moody",
  "moons", "moony", "moors", "moose", "moped", "moper", "mopes", "moral", "moray", "morel",
  "mores", "morns", "moron", "morph", "morse", "mossy", "motel", "motes", "moths", "motif",
  "motor", "motto", "mould", "moult", "mound", "mount", "mourn", "mouse", "mousy", "mouth",
  "moved", "mover", "moves", "movie", "mowed", "mower", "mucks", "mucky", "mucus", "muddy",
  "muffs", "mulch", "mules", "mulls", "mummy", "mumps", "munch", "muons", "mural", "murks",
  "murky", "mused", "muser", "muses", "mushy", "music", "musks", "musky", "musts", "musty",
  "muted", "muter", "mutes", "mutts", "muzzy", "myrrh", "myths",
  // N words
  "nails", "naive", "naked", "named", "namer", "names", "nanny", "napes", "nappy", "narcs",
  "nasal", "nasty", "natal", "natty", "naval", "navel", "naves", "navvy", "nazis", "neaps",
  "nears", "neath", "necks", "needs", "needy", "negro", "neigh", "neons", "nerds", "nerdy",
  "nerve", "nervy", "nests", "netty", "never", "newer", "newly", "newsy", "newts", "nexus",
  "nicer", "niche", "nicks", "niece", "nifty", "night", "nimbi", "ninja", "ninny", "ninth",
  "nippy", "nitro", "nitwit", "nixed", "nixes", "nixie", "noble", "nobly", "nodal", "noddy",
  "nodes", "noise", "noisy", "nomad", "nonce", "nooks", "noons", "noose", "norms", "north",
  "nosed", "noser", "noses", "nosey", "notch", "noted", "noter", "notes", "nouns", "novel",
  "nudes", "nudge", "nuked", "nukes", "nulls", "numbs", "nurse", "nutty", "nylon", "nymph",
  // O words
  "oaken", "oakum", "oared", "oases", "oasis", "oaten", "oater", "oaths", "obese", "obeys",
  "occur", "ocean", "ocher", "ochre", "octal", "octet", "octet", "odder", "oddly", "odium",
  "odors", "offal", "offed", "offer", "often", "ogled", "ogler", "ogles", "ogres", "oiled",
  "oiler", "oinks", "okays", "okras", "olden", "older", "oldie", "olive", "ombre", "omega",
  "omens", "omits", "onion", "onset", "oohed", "oomph", "oozed", "oozes", "opals", "opens",
  "opera", "opine", "opium", "opted", "optic", "orals", "orate", "orbit", "orcas", "order",
  "organ", "orgys", "oscar", "osier", "other", "otters", "ought", "ounce", "ousts", "outdo",
  "outed", "outer", "outgo", "outre", "ouzel", "ovals", "ovary", "ovate", "ovens", "overt",
  "owing", "owlet", "owned", "owner", "oxide", "ozone",
  // P words
  "paced", "pacer", "paces", "packs", "pacts", "paddy", "padre", "paean", "pagan", "paged",
  "pager", "pages", "pails", "pains", "paint", "pairs", "paled", "paler", "pales", "palms",
  "palmy", "palsy", "panel", "panes", "pangs", "panic", "pansy", "pants", "panty", "papal",
  "papas", "papaw", "paper", "pappy", "parch", "pared", "parer", "pares", "paris", "parka",
  "parks", "parry", "parse", "parts", "party", "passe", "pasta", "paste", "pasty", "patch",
  "pater", "paths", "patio", "patsy", "patty", "pause", "paved", "paver", "paves", "pawed",
  "pawns", "payed", "payee", "payer", "peace", "peach", "peaks", "peaky", "peals", "pearl",
  "pears", "pease", "peats", "peaty", "pecks", "pedal", "peeks", "peels", "peens", "peeps",
  "peers", "peeve", "penal", "pence", "pends", "penne", "penny", "peony", "peppy", "perch",
  "perks", "perky", "perms", "perry", "pesky", "pesos", "pests", "petal", "petit", "petty",
  "phase", "phone", "phony", "photo", "piano", "picks", "picky", "piece", "piers", "pieta",
  "piety", "piggy", "piked", "piker", "pikes", "piled", "piles", "pills", "pilot", "pimps",
  "pinch", "pined", "pines", "pings", "pinko", "pinks", "pinky", "pinto", "pints", "pinup",
  "pious", "piped", "piper", "pipes", "pipet", "pique", "pitch", "piths", "pithy", "piton",
  "pitta", "pivot", "pixel", "pixie", "pizza", "place", "plaid", "plain", "plait", "plane",
  "plank", "plans", "plant", "plate", "plats", "plays", "plaza", "plead", "pleas", "pleat",
  "plebe", "plebs", "pledge", "plied", "plier", "plies", "plods", "plonk", "plops", "plots",
  "plows", "ploys", "pluck", "plugs", "plumb", "plume", "plump", "plums", "plumy", "plunk",
  "plush", "plyer", "poach", "pocks", "podgy", "poems", "poesy", "poets", "point", "poise",
  "poked", "poker", "pokes", "pokey", "polar", "poled", "poles", "polka", "polls", "polyp",
  "pomps", "ponds", "pones", "pooch", "pooed", "pools", "poops", "popes", "poppy", "porch",
  "pored", "porer", "pores", "porgy", "porks", "porky", "ports", "posed", "poser", "poses",
  "posit", "posse", "posts", "potty", "pouch", "poufs", "pound", "pours", "pouts", "pouty",
  "power", "prams", "prank", "prate", "prawn", "prays", "preen", "preps", "press", "preys",
  "price", "prick", "pride", "pried", "prier", "pries", "prigs", "prime", "primp", "prims",
  "print", "prior", "prise", "prism", "privy", "prize", "probe", "prods", "promo", "proms",
  "prone", "prong", "proof", "props", "prose", "prosy", "proud", "prove", "prowl", "prows",
  "proxy", "prude", "prune", "pryer", "psalm", "psych", "pubes", "pubic", "pubis", "pucks",
  "pudgy", "puffs", "puffy", "puked", "pukes", "pulls", "pulps", "pulpy", "pulse", "pumas",
  "pumps", "punch", "punks", "punky", "punny", "punts", "pupae", "pupal", "pupas", "pupil",
  "puppy", "puree", "purer", "purge", "purim", "purls", "purrs", "purse", "pussy", "putts",
  "putty", "pygmy", "pylon", "pyres",
  // Q words
  "quack", "quaff", "quail", "quake", "qualm", "quark", "quart", "quasi", "quays", "queen",
  "queer", "quell", "query", "quest", "queue", "quick", "quiet", "quiff", "quill", "quilt",
  "quirk", "quite", "quits", "quota", "quote", "quoth",
  // R words
  "rabbi", "rabid", "raced", "racer", "races", "racks", "radar", "radii", "radio", "radon",
  "rafts", "raged", "rages", "raids", "rails", "rains", "rainy", "raise", "rajah", "raked",
  "raker", "rakes", "rally", "ramps", "ranch", "rands", "range", "rangy", "ranks", "rants",
  "rapid", "raped", "raper", "rapes", "rapid", "rarer", "rasps", "raspy", "rated", "rater",
  "rates", "ratio", "ratty", "raved", "ravel", "raven", "raver", "raves", "rawer", "rawly",
  "rayon", "razed", "razer", "razes", "razor", "reach", "react", "reads", "ready", "realm",
  "reams", "reaps", "rears", "rebel", "rebid", "rebuy", "recap", "recur", "redid", "redly",
  "reeds", "reedy", "reefs", "reeks", "reeky", "reels", "refer", "refit", "regal", "reign",
  "reins", "relax", "relay", "relic", "remit", "renal", "rends", "renew", "rents", "repay",
  "repel", "reply", "repos", "rerun", "reset", "resin", "rests", "retch", "retro", "retry",
  "reuse", "revel", "revue", "rhino", "rhyme", "riced", "ricer", "rices", "rider", "rides",
  "ridge", "rifle", "rifts", "right", "rigid", "rigor", "riled", "riles", "rills", "rinds",
  "rings", "rinks", "rinse", "riots", "ripen", "riper", "risen", "riser", "rises", "risks",
  "risky", "rites", "ritzy", "rival", "riven", "river", "rivet", "roach", "roads", "roams",
  "roars", "roast", "robed", "robes", "robin", "robot", "rocks", "rocky", "rodeo", "rogue",
  "roles", "rolls", "roman", "romps", "roods", "roofs", "rooks", "rooms", "roomy", "roost",
  "roots", "roped", "roper", "ropes", "roses", "rosin", "rotor", "rouge", "rough", "round",
  "rouse", "route", "rover", "roves", "rowdy", "rowed", "rower", "royal", "rubby", "rubes",
  "ruble", "ruddy", "ruder", "ruffs", "rugby", "ruins", "ruled", "ruler", "rules", "rumba",
  "rummy", "rumor", "rumps", "runes", "rungs", "runny", "runts", "runty", "rupee", "rural",
  "rusts", "rusty", "rutty",
  // S words
  "saber", "sable", "sabre", "sacks", "sadly", "safer", "safes", "sagas", "sages", "sahib",
  "sails", "saint", "sakes", "salad", "sales", "sally", "salon", "salsa", "salts", "salty",
  "salve", "salvo", "samba", "sands", "sandy", "saner", "sappy", "sassy", "sated", "satin",
  "satyr", "sauce", "saucy", "sauna", "saute", "saved", "saver", "saves", "savor", "savoy",
  "savvy", "sawed", "sawer", "saxes", "sayer", "scabs", "scads", "scald", "scale", "scalp",
  "scaly", "scamp", "scams", "scans", "scare", "scarf", "scars", "scary", "scene", "scent",
  "schmo", "scion", "scoff", "scold", "scone", "scoop", "scoot", "scope", "score", "scorn",
  "scots", "scour", "scout", "scowl", "scram", "scrap", "scree", "screw", "scrub", "scrum",
  "scuba", "scuds", "scuff", "seals", "seams", "seamy", "sears", "seats", "sects", "sedan",
  "seeds", "seedy", "seeks", "seems", "seeps", "seize", "sells", "sends", "sense", "sepia",
  "septa", "serfs", "serge", "serif", "serum", "serve", "setup", "seven", "sever", "sewed",
  "sewer", "sexed", "sexes", "shack", "shade", "shady", "shaft", "shake", "shaky", "shale",
  "shall", "shame", "shams", "shank", "shape", "shard", "share", "shark", "sharp", "shave",
  "shawl", "shawm", "sheaf", "shear", "sheds", "sheen", "sheep", "sheer", "sheet", "shelf",
  "shell", "shied", "shier", "shift", "shims", "shine", "shins", "shiny", "ships", "shire",
  "shirk", "shirt", "shits", "shivs", "shoal", "shock", "shoed", "shoer", "shoes", "shone",
  "shook", "shoos", "shoot", "shops", "shore", "shorn", "short", "shots", "shout", "shove",
  "shown", "shows", "showy", "shred", "shrew", "shrub", "shrug", "shuck", "shuns", "shunt",
  "shush", "shuts", "sided", "sider", "sides", "siege", "sieve", "sighs", "sight", "sigma",
  "signs", "silks", "silky", "sills", "silly", "silts", "silty", "since", "sinew", "singe",
  "sings", "sinks", "sinus", "siren", "sires", "sissy", "sites", "sixth", "sixty", "sized",
  "sizer", "sizes", "skate", "skeds", "skeet", "skein", "skied", "skier", "skies", "skiff",
  "skill", "skimp", "skims", "skins", "skips", "skirt", "skits", "skulk", "skull", "skunk",
  "slabs", "slack", "slags", "slain", "slake", "slams", "slang", "slant", "slaps", "slash",
  "slate", "slats", "slave", "slays", "sleds", "sleek", "sleep", "sleet", "slept", "slice",
  "slick", "slide", "slime", "slimy", "sling", "slink", "slips", "slits", "slobs", "slogs",
  "slope", "slops", "slosh", "sloth", "slots", "slows", "slubs", "slued", "slues", "slugs",
  "slums", "slung", "slunk", "slurp", "slurs", "slush", "slyly", "smack", "small", "smart",
  "smash", "smear", "smell", "smelt", "smile", "smirk", "smite", "smith", "smock", "smoke",
  "smoky", "smote", "snack", "snafu", "snags", "snail", "snake", "snaky", "snaps", "snare",
  "snarl", "sneak", "sneer", "snide", "sniff", "snips", "snits", "snobs", "snoop", "snore",
  "snort", "snots", "snout", "snowy", "snubs", "snuck", "snuff", "snugs", "soaks", "soaps",
  "soapy", "soars", "sober", "socks", "sodas", "sofas", "softy", "soggy", "soils", "solar",
  "soled", "soles", "solid", "solos", "solve", "sonar", "songs", "sonic", "sonny", "sooth",
  "soots", "sooty", "soppy", "sorer", "sores", "sorry", "sorts", "sought", "souls", "sound",
  "soups", "soupy", "sours", "south", "sowed", "sower", "space", "spade", "spams", "spans",
  "spare", "spark", "spars", "spasm", "spate", "spawn", "speak", "spear", "speck", "specs",
  "speed", "spell", "spend", "spent", "sperm", "spice", "spicy", "spied", "spiel", "spier",
  "spies", "spike", "spiky", "spill", "spilt", "spine", "spins", "spiny", "spire", "spite",
  "spits", "splat", "split", "spoke", "spoof", "spook", "spool", "spoon", "spore", "sport",
  "spots", "spout", "spray", "spree", "sprig", "sprue", "sprung", "spuds", "spume", "spumy",
  "spunk", "spurn", "spurs", "spurt", "squad", "squat", "squaw", "squib", "squid", "stabs",
  "stack", "staff", "stage", "stags", "stagy", "staid", "stain", "stair", "stake", "stale",
  "stalk", "stall", "stamp", "stand", "stank", "staph", "stare", "stark", "stars", "start",
  "stash", "state", "stave", "stays", "stead", "steak", "steal", "steam", "steed", "steel",
  "steep", "steer", "stems", "steno", "steps", "stern", "stews", "stick", "stiff", "still",
  "stilt", "sting", "stink", "stint", "stirs", "stock", "stoic", "stoke", "stole", "stomp",
  "stone", "stony", "stood", "stool", "stoop", "stops", "store", "stork", "storm", "story",
  "stout", "stove", "stows", "strap", "straw", "stray", "strep", "strew", "strip", "strode",
  "strum", "strung", "strut", "stuck", "studs", "study", "stuff", "stump", "stumps", "stung",
  "stunk", "stuns", "stunt", "style", "suave", "sucks", "sugar", "suing", "suite", "suits",
  "sulks", "sulky", "sully", "sumac", "sumps", "sunks", "sunny", "sunup", "super", "surer",
  "surge", "surly", "sushi", "swabs", "swami", "swamp", "swams", "swank", "swans", "swaps",
  "swarm", "swath", "swats", "sways", "swear", "sweat", "sweep", "sweet", "swell", "swept",
  "swift", "swigs", "swill", "swims", "swine", "swing", "swipe", "swirl", "swish", "swiss",
  "sword", "swore", "sworn", "swung", "syrup",
  // T words
  "tabby", "table", "taboo", "tacit", "tacks", "tacky", "tacos", "taffy", "tails", "taint",
  "taken", "taker", "takes", "tales", "talks", "tally", "talon", "tamed", "tamer", "tames",
  "tamps", "tangs", "tangy", "tanks", "tapes", "tapir", "tardy", "tarps", "tarry", "tarts",
  "tasks", "taste", "tasty", "tatty", "taunt", "tawny", "taxed", "taxer", "taxes", "taxis",
  "teach", "teaks", "teams", "tears", "teary", "tease", "techs", "teddy", "teems", "teens",
  "teeny", "teeth", "tells", "tempo", "temps", "tends", "tenor", "tense", "tenth", "tents",
  "tepee", "tepid", "terms", "terns", "terra", "terry", "terse", "tests", "testy", "texts",
  "thank", "thaws", "theft", "their", "theme", "thens", "there", "these", "thick", "thief",
  "thigh", "thine", "thing", "think", "thins", "third", "thong", "thorn", "those", "three",
  "threw", "throb", "throw", "thuds", "thugs", "thumb", "thump", "thyme", "tiara", "tibia",
  "ticks", "tidal", "tided", "tides", "tiers", "tiger", "tight", "tikes", "tilde", "tiled",
  "tiler", "tiles", "tilts", "timed", "timer", "times", "timid", "tinge", "tinny", "tints",
  "tipsy", "tired", "tires", "titan", "title", "titty", "toast", "today", "toddy", "toffs",
  "togas", "toils", "token", "tolls", "tombs", "tonal", "toned", "toner", "tones", "tongs",
  "tonic", "tonne", "tools", "tooth", "topaz", "topic", "topis", "toque", "torch", "torso",
  "torts", "torus", "total", "totem", "touch", "tough", "tours", "touts", "towed", "towel",
  "tower", "towns", "toxic", "toxin", "trace", "track", "tract", "trade", "trail", "train",
  "trait", "tramp", "trams", "traps", "trash", "trawl", "trays", "tread", "treat", "treed",
  "trees", "trend", "tress", "triad", "trial", "tribe", "trice", "trick", "tried", "trier",
  "tries", "trike", "trill", "trims", "trios", "trips", "trite", "troll", "tromp", "troop",
  "trope", "troth", "trots", "trout", "trove", "truce", "truck", "trued", "truer", "trues",
  "truly", "trump", "trunk", "truss", "trust", "truth", "tryst", "tubas", "tubby", "tubed",
  "tuber", "tubes", "tucks", "tufts", "tulip", "tulle", "tumid", "tummy", "tumor", "tunas",
  "tuned", "tuner", "tunes", "tunic", "turbo", "turds", "turfs", "turns", "tutor", "tutu",
  "twain", "twang", "tweak", "tweed", "tweet", "twice", "twigs", "twill", "twine", "twins",
  "twirl", "twist", "tying", "tykes", "typed", "types", "typos",
  // U words
  "udder", "ulcer", "ultra", "umbra", "umped", "unarm", "unary", "uncle", "uncut", "under",
  "undid", "undue", "unfed", "unfit", "unify", "union", "unite", "units", "unity", "unlit",
  "unmet", "unsay", "unset", "untie", "until", "unwed", "unzip", "updos", "upper", "upset",
  "urban", "urged", "urger", "urges", "urine", "usage", "usher", "using", "usual", "usurp",
  "utter",
  // V words
  "vague", "valet", "valid", "valor", "value", "valve", "vamps", "vanes", "vapid", "vapor",
  "vases", "vault", "vaunt", "veers", "vegan", "veils", "veins", "veiny", "veldt", "venom",
  "vents", "venue", "verbs", "verge", "verse", "verso", "verve", "vests", "vexed", "vexes",
  "vials", "vibes", "vicar", "video", "views", "vigil", "vigor", "viler", "villa", "vinca",
  "vined", "vines", "vinyl", "viola", "viols", "viper", "viral", "virus", "visar", "vised",
  "vises", "visit", "visor", "vista", "vital", "vivid", "vixen", "vocal", "vodka", "vogue",
  "voice", "voila", "volts", "vomit", "voted", "voter", "votes", "vouch", "vowed", "vowel",
  "vroom", "vulva",
  // W words
  "wacko", "wacky", "waddy", "waded", "wader", "wades", "wafer", "wafts", "waged", "wager",
  "wages", "wagon", "waifs", "wails", "waist", "waits", "waive", "waked", "waken", "waker",
  "wakes", "walks", "walla", "walls", "waltz", "wands", "waned", "wanes", "wants", "wards",
  "wares", "warms", "warns", "warps", "warts", "warty", "washy", "wasps", "waste", "watch",
  "water", "watts", "waved", "waver", "waves", "waxed", "waxen", "waxer", "waxes", "weals",
  "weans", "wears", "weary", "weave", "wedge", "weeds", "weedy", "weeks", "weeny", "weeps",
  "weepy", "weigh", "weird", "welds", "wells", "welsh", "welts", "wench", "wends", "wetly",
  "whack", "whale", "whams", "wharf", "wheat", "wheel", "whelk", "whelm", "whelp", "where",
  "which", "whiff", "while", "whims", "whine", "whiny", "whips", "whirl", "whirs", "whisk",
  "white", "whole", "whoop", "whose", "wicks", "widen", "wider", "widow", "width", "wield",
  "wifed", "wifes", "wifey", "wiggy", "wilds", "wiled", "wiles", "wills", "willy", "wilts",
  "wimps", "wimpy", "wince", "winch", "winds", "windy", "wined", "wines", "wings", "winks",
  "wiped", "wiper", "wipes", "wired", "wirer", "wires", "wised", "wiser", "wisps", "wispy",
  "witch", "withe", "withs", "witty", "wived", "wiver", "wives", "wizen", "woken", "wolfs",
  "woman", "wombs", "women", "wonks", "wonky", "woods", "woody", "wooed", "wooer", "woofs",
  "wooly", "woozy", "words", "wordy", "works", "world", "worms", "wormy", "worry", "worse",
  "worst", "worth", "would", "wound", "woven", "wowed", "wrack", "wraps", "wrath", "wreak",
  "wreck", "wrest", "wrier", "wring", "wrist", "write", "wrong", "wrote", "wrung",
  // X words
  "xenon", "xerox",
  // Y words
  "yacht", "yahoo", "yanks", "yards", "yarns", "yawls", "yawns", "yeahs", "yearn", "years",
  "yeast", "yells", "yelps", "yenta", "yield", "yikes", "yobbo", "yodel", "yokel", "yolks",
  "young", "yourn", "yours", "youth", "yowls", "yucca", "yucky", "yukky", "yummy", "yuppy",
  // Z words
  "zappy", "zebra", "zeros", "zests", "zesty", "zilch", "zincs", "zingy", "zippy", "zitis",
  "zloty", "zombi", "zonal", "zoned", "zones", "zooms"
]

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
    const word = WORDS[Math.floor(Math.random() * WORDS.length)]
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

    if (!WORDS.includes(currentGuess.toLowerCase())) {
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
