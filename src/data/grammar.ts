export interface GrammarRule {
  id: string;
  title: string;
  description: string;
  structure: string;
  examples: string[];
  keyPoint: string;
  detailedExplanation: string;
}

export const englishGrammarRules: GrammarRule[] = [
  {
    id: 'present_perfect',
    title: 'Present Perfect',
    description: 'We use Present Perfect for experiences, recent actions, and actions connected to the present.',
    structure: 'have / has + V3 (past participle)',
    examples: [
      'I have postponed the meeting.',
      'She has already finished the task.'
    ],
    keyPoint: 'Focus is on the result now, not when it happened.',
    detailedExplanation: 'The Present Perfect connects the past and the present. It is often used with words like "just", "already", "yet", "ever", and "never". You cannot use it with specific past time expressions (like "yesterday").'
  },
  {
    id: 'past_simple',
    title: 'Past Simple',
    description: 'Used for completed actions in the past at a specific time.',
    structure: 'V2 (past tense) or did + V1',
    examples: [
      'I postponed the meeting yesterday.',
      'Did she finish the task?'
    ],
    keyPoint: 'Always refers to a finished time period.',
    detailedExplanation: 'Use the Past Simple when the time of the action is finished, such as "last week", "yesterday", or "in 2010". For regular verbs, add "-ed". Irregular verbs must be memorized.'
  },
  {
    id: 'present_continuous',
    title: 'Present Continuous',
    description: 'Used for actions happening right now, or temporary situations.',
    structure: 'am / is / are + V-ing',
    examples: [
      'I am working on the project now.',
      'They are studying English this month.'
    ],
    keyPoint: 'Highlights temporary or ongoing actions.',
    detailedExplanation: 'The Present Continuous emphasizes that an action is in progress at the time of speaking. It can also describe temporary habits or future arrangements.'
  },
  {
    id: 'gerund_vs_infinitive',
    title: 'Gerund vs Infinitive',
    description: 'Some verbs are followed by V-ing (gerund), others by to + V1 (infinitive).',
    structure: 'Verb + V-ing / Verb + to + V1',
    examples: [
      'I enjoy reading. (enjoy + gerund)',
      'I want to read. (want + infinitive)'
    ],
    keyPoint: 'Memorize the common verbs for each group.',
    detailedExplanation: 'A gerund acts like a noun (e.g., reading, swimming). Verbs like enjoy, mind, and avoid take gerunds. Verbs like want, decide, and hope take infinitives (to + verb).'
  },
  {
    id: 'first_conditional',
    title: 'First Conditional',
    description: 'Used for real or possible situations in the future.',
    structure: 'If + Present Simple, will + V1',
    examples: [
      'If it rains, we will stay home.',
      'If you study hard, you will pass.'
    ],
    keyPoint: 'Condition must happen first for the result to occur.',
    detailedExplanation: 'The First Conditional is built with an "if" clause in the present tense, and a main clause in the future (will). It describes realistic scenarios.'
  },
  {
    id: 'passive_voice',
    title: 'Passive Voice',
    description: 'Focuses on the action and the object, rather than who did it.',
    structure: 'be + V3 (past participle)',
    examples: [
      'The meeting was postponed.',
      'The house is being cleaned.'
    ],
    keyPoint: 'Use when the actor is unknown or unimportant.',
    detailedExplanation: 'In passive sentences, the object of an active sentence becomes the subject. The tense is shown by the verb "to be", followed by the past participle of the main verb.'
  }
];

export const russianGrammarRules: GrammarRule[] = [
  {
    id: 'ru_nominative',
    title: 'Nominative Case (Именительный падеж)',
    description: 'The basic form of a noun, used for the subject of a sentence.',
    structure: 'Who? What? (Кто? Что?)',
    examples: [
      'Это мой дом. (This is my house.)',
      'Студент читает. (The student is reading.)'
    ],
    keyPoint: 'Always answers Who/What is performing the action.',
    detailedExplanation: 'The Nominative case is the dictionary form of a word. It is used exclusively for the subject of the sentence (the doer of the action) and after the verb "to be" in identifying something.'
  },
  {
    id: 'ru_accusative',
    title: 'Accusative Case (Винительный падеж)',
    description: 'Used for the direct object of an action (what is being acted upon).',
    structure: 'Whom? What? (Кого? Что?)',
    examples: [
      'Я читаю книгу. (I am reading a book.)',
      'Я вижу Анну. (I see Anna.)'
    ],
    keyPoint: 'Changes ending for feminine (-а → -у) and animate masculine nouns.',
    detailedExplanation: 'The Accusative case indicates the direct object. Feminine nouns ending in -а change to -у. Masculine animate nouns (people/animals) take the Genitive ending, while inanimate masculine and neuter nouns do not change.'
  },
  {
    id: 'ru_genitive',
    title: 'Genitive Case (Родительный падеж)',
    description: 'Indicates possession (of), absence, or quantities.',
    structure: 'Whom? What? (Кого? Чего?)',
    examples: [
      'У меня нет брата. (I do not have a brother.)',
      'Книга студента. (The student\'s book.)'
    ],
    keyPoint: 'Used heavily after "нет" (there is no) and to show ownership.',
    detailedExplanation: 'Genitive case translates to "of" in English. Masculine/neuter nouns generally add -а or -я. Feminine nouns change -а to -ы or -и. It is also used after many prepositions like из (from), до (until), and без (without).'
  },
  {
    id: 'ru_dative',
    title: 'Dative Case (Дательный падеж)',
    description: 'Indicates the indirect object (to whom or for whom).',
    structure: 'To whom? To what? (Кому? Чему?)',
    examples: [
      'Я даю книгу Анне. (I am giving the book to Anna.)',
      'Мне нравится это. (I like this. / This is pleasing to me.)'
    ],
    keyPoint: 'Very common with verbs of giving, telling, and feelings.',
    detailedExplanation: 'Dative case is used for the receiver of an action. Masculine nouns usually add -у/-ю, while feminine nouns ending in -а change to -е. It is also used with ages (Ему 20 лет = To him is 20 years).'
  },
  {
    id: 'ru_instrumental',
    title: 'Instrumental Case (Творительный падеж)',
    description: 'Shows the instrument used to do something, or accompaniment (with).',
    structure: 'By whom? With what? (Кем? Чем?)',
    examples: [
      'Я пишу карандашом. (I am writing with a pencil.)',
      'Я иду с другом. (I am walking with a friend.)'
    ],
    keyPoint: 'Used after the preposition "с" (with) and for professions (was/will be).',
    detailedExplanation: 'Instrumental indicates the means by which an action is performed. Masculine nouns usually end in -ом/-ем, and feminine nouns end in -ой/-ей. It is frequently used with the preposition "с" (meaning "with" someone/something).'
  },
  {
    id: 'ru_prepositional',
    title: 'Prepositional Case (Предложный падеж)',
    description: 'Used only with prepositions to indicate location (in, at, on) or topic (about).',
    structure: 'About whom? About what? (О ком? О чём?) / Where? (Где?)',
    examples: [
      'Я живу в Москве. (I live in Moscow.)',
      'Мы говорим о работе. (We are talking about work.)'
    ],
    keyPoint: 'Never used without a preposition.',
    detailedExplanation: 'The Prepositional case usually indicates location with "в" (in) and "на" (on/at), or topic with "о" (about). The most common ending for singular nouns of all genders is -е.'
  },
  {
    id: 'ru_verb_aspects',
    title: 'Verb Aspects (Виды глагола)',
    description: 'Russian verbs come in pairs: Imperfective (process/habit) and Perfective (result/completion).',
    structure: 'Imperfective vs Perfective',
    examples: [
      'Я читал книгу. (I was reading a book. - process)',
      'Я прочитал книгу. (I completely read the book. - result)'
    ],
    keyPoint: 'Perfective verbs cannot be used in the present tense.',
    detailedExplanation: 'Imperfective verbs focus on the action itself, repetition, or duration. Perfective verbs focus on the completion, result, or a single specific event. Perfective verbs only have past and future tenses.'
  },
  {
    id: 'ru_past_tense',
    title: 'Past Tense (Прошедшее время)',
    description: 'Russian past tense changes based on the gender and number of the subject, not the person.',
    structure: 'Drop -ть, add -л (m), -ла (f), -ло (n), or -ли (pl)',
    examples: [
      'Он читал. (He read.)',
      'Она читала. (She read.)',
      'Они читали. (They read.)'
    ],
    keyPoint: 'Gender agreement is strictly required in the past tense.',
    detailedExplanation: 'Unlike present tense which conjugates by person (I, you, he), past tense acts more like an adjective. If a woman is speaking, she must say "Я читала" (I read - feminine), while a man says "Я читал".'
  },
  {
    id: 'ru_motion_verbs',
    title: 'Verbs of Motion (Глаголы движения)',
    description: 'Russian distinguishes between unidirectional (one way) and multidirectional (round trip/habit) motion.',
    structure: 'Идти (one way) vs Ходить (multidirectional)',
    examples: [
      'Я иду в магазин. (I am on my way to the store right now.)',
      'Я хожу в магазин каждый день. (I go to the store every day.)'
    ],
    keyPoint: 'Choose the verb based on whether the trip is habitual or happening right now in one direction.',
    detailedExplanation: 'Motion verbs are grouped in pairs (unidirectional / multidirectional). Another important distinction is how you travel: идти/ходить are on foot, while ехать/ездить imply using a vehicle.'
  },
  {
    id: 'ru_to_have',
    title: 'Expressing "To Have" (У меня есть...)',
    description: 'Instead of a verb "to have", Russian uses a construction meaning "by me there is".',
    structure: 'У + [Genitive] + есть + [Nominative]',
    examples: [
      'У меня есть машина. (I have a car.)',
      'У брата есть проблема. (The brother has a problem.)'
    ],
    keyPoint: 'The thing possessed is the subject (Nominative), and the owner is in Genitive.',
    detailedExplanation: 'This structure literally translates to "At me there is...". To express lack ("do not have"), drop "есть" and put the object in the Genitive case: "У меня нет машины" (I do not have a car).'
  }
];
