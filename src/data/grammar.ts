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
    title: 'Present Perfect (Hozirgi tugallangan zamon)',
    description: 'Biz Present Perfect ni hayotiy tajribalar, yaqin o\'tmishdagi ish-harakatlar va hozirgi paytga aloqasi bor bo\'lgan ish-harakatlar uchun ishlatamiz.',
    structure: 'have / has + V3 (past participle)',
    examples: [
      'I have postponed the meeting.',
      'She has already finished the task.'
    ],
    keyPoint: 'Asosiy e\'tibor ish-harakatning qachon sodir bo\'lganiga emas, balki hozirgi natijasiga qaratiladi.',
    detailedExplanation: 'Present Perfect o\'tmish va hozirgi zamonni bog\'laydi. U ko\'pincha "just", "already", "yet", "ever" va "never" kabi so\'zlar bilan ishlatiladi. Uni aniq o\'tmish vaqtini bildiruvchi so\'zlar (masalan, "yesterday") bilan ishlata olmaysiz.'
  },
  {
    id: 'past_simple',
    title: 'Past Simple (Oddiy o\'tgan zamon)',
    description: 'O\'tmishda aniq bir vaqtda sodir bo\'lib tugagan ish-harakatlar uchun ishlatiladi.',
    structure: 'V2 (past tense) yoki did + V1',
    examples: [
      'I postponed the meeting yesterday.',
      'Did she finish the task?'
    ],
    keyPoint: 'Doim tugallangan vaqt oralig\'iga ishora qiladi.',
    detailedExplanation: 'Past Simple ni ish-harakat vaqti tugagan bo\'lsa (masalan, "last week", "yesterday" yoki "in 2010") ishlating. To\'g\'ri fe\'llarga "-ed" qo\'shiladi. Noto\'g\'ri fe\'llarni esa yodlash kerak.'
  },
  {
    id: 'present_continuous',
    title: 'Present Continuous (Hozirgi davomiy zamon)',
    description: 'Ayni paytda sodir bo\'layotgan ish-harakatlar yoki vaqtinchalik holatlar uchun ishlatiladi.',
    structure: 'am / is / are + V-ing',
    examples: [
      'I am working on the project now.',
      'They are studying English this month.'
    ],
    keyPoint: 'Vaqtinchalik yoki davom etayotgan harakatlarni ta\'kidlaydi.',
    detailedExplanation: 'Present Continuous ish-harakat gapirilayotgan vaqtda davom etayotganini ta\'kidlaydi. Shuningdek, u vaqtinchalik odatlar yoki kelajakdagi aniq rejalar uchun ham ishlatilishi mumkin.'
  },
  {
    id: 'gerund_vs_infinitive',
    title: 'Gerund va Infinitive',
    description: 'Ba\'zi fe\'llardan keyin V-ing (gerund), boshqalaridan keyin esa to + V1 (infinitive) keladi.',
    structure: 'Verb + V-ing / Verb + to + V1',
    examples: [
      'I enjoy reading. (enjoy + gerund)',
      'I want to read. (want + infinitive)'
    ],
    keyPoint: 'Har bir guruh uchun eng ko\'p ishlatiladigan fe\'llarni yodlab oling.',
    detailedExplanation: 'Gerund ot kabi vazifani bajaradi (masalan, reading, swimming). Enjoy, mind va avoid kabi fe\'llar gerund talab qiladi. Want, decide va hope kabi fe\'llar infinitive (to + fe\'l) talab qiladi.'
  },
  {
    id: 'first_conditional',
    title: 'First Conditional (Birinchi shart ergash gap)',
    description: 'Kelajakdagi real yoki bo\'lishi mumkin bo\'lgan holatlar uchun ishlatiladi.',
    structure: 'If + Present Simple, will + V1',
    examples: [
      'If it rains, we will stay home.',
      'If you study hard, you will pass.'
    ],
    keyPoint: 'Natija yuz berishi uchun avval shart bajarilishi kerak.',
    detailedExplanation: 'First Conditional hozirgi zamondagi "if" (agar) qismi va kelajak zamondagi (will) asosiy qismdan tuziladi. U haqiqiy va yuz berishi ehtimoli yuqori bo\'lgan stsenariylarni tasvirlaydi.'
  },
  {
    id: 'passive_voice',
    title: 'Passive Voice (Majhul nisbat)',
    description: 'Ish-harakatni kim bajarganiga emas, balki ish-harakatning o\'ziga va obyektga e\'tibor qaratadi.',
    structure: 'be + V3 (past participle)',
    examples: [
      'The meeting was postponed.',
      'The house is being cleaned.'
    ],
    keyPoint: 'Harakatni bajaruvchi noma\'lum yoki ahamiyatsiz bo\'lganda foydalaning.',
    detailedExplanation: 'Majhul nisbatda (passive voice) aniq nisbatdagi (active) gapning obyekti egaga aylanadi. Zamon "to be" fe\'li bilan ko\'rsatiladi va undan keyin asosiy fe\'lning o\'tgan zamon sifatdoshi (V3) keladi.'
  }
];

export const russianGrammarRules: GrammarRule[] = [
  {
    id: 'ru_nominative',
    title: 'Именительный падеж (Bosh kelishik)',
    description: 'Otlarning asosiy lug\'at shakli, gapda ega vazifasini bajaradi.',
    structure: 'Kim? Nima? (Кто? Что?)',
    examples: [
      'Это мой дом. (Bu mening uyim.)',
      'Студент читает. (Talaba o\'qiyapti.)'
    ],
    keyPoint: 'Harakatni kim/nima bajarayotganini bildiradi.',
    detailedExplanation: 'Именительный падеж (Bosh kelishik) so\'zning lug\'at shakli hisoblanadi. U har doim gapning egasi (harakatni bajaruvchisi) uchun yoki "to be" (bo\'lmoq) ma\'nosida biror narsani tanishtirishda ishlatiladi.'
  },
  {
    id: 'ru_accusative',
    title: 'Винительный падеж (Tushum kelishigi)',
    description: 'Harakatning to\'g\'ridan-to\'g\'ri obyektini ko\'rsatish uchun ishlatiladi (harakat nima/kim ustida bajarilayotgani).',
    structure: 'Kimni? Nimani? (Кого? Что?)',
    examples: [
      'Я читаю книгу. (Men kitobni o\'qiyapman.)',
      'Я вижу Анну. (Men Annani ko\'ryapman.)'
    ],
    keyPoint: 'Muannas (Jenskiy) jinsidagi otlar (-а → -у) ga o\'zgaradi, shuningdek jonli muzhskoy jinsdagi otlar o\'zgaradi.',
    detailedExplanation: 'Винительный падеж to\'g\'ri to\'ldiruvchini ko\'rsatadi. -a bilan tugaydigan muannas jinsidagi otlar -y ga o\'zgaradi. Jonli (odamlar/hayvonlar) muzhskoy jinsdagi otlar qaratqich kelishigi (Genitive) qo\'shimchasini oladi, jonsiz muzhskoy va sredniy jinsdagi otlar esa o\'zgarmaydi.'
  },
  {
    id: 'ru_genitive',
    title: 'Родительный падеж (Qaratqich kelishigi)',
    description: 'Tegishlilik (qaratqichlik), yo\'qlik (нет) yoki miqdorni bildiradi.',
    structure: 'Kimning? Nimaning? (Кого? Чего?)',
    examples: [
      'У меня нет брата. (Mening akam yo\'q.)',
      'Книга студента. (Talabaning kitobi.)'
    ],
    keyPoint: '"Нет" (yo\'q) so\'zidan keyin va egalikni bildirish uchun ko\'p ishlatiladi.',
    detailedExplanation: 'Родительный падеж ingliz tilidagi "of" va o\'zbek tilidagi "-ning" qo\'shimchasiga to\'g\'ri keladi. Muzhskoy/sredniy jinsdagi otlar asosan -а yoki -я qo\'shimchasini oladi. Muannas jinsidagi otlarda -а o\'rniga -ы yoki -и keladi. U shuningdek из (-dan), до (-gacha), va без (-siz) kabi predloglar bilan ko\'p ishlatiladi.'
  },
  {
    id: 'ru_dative',
    title: 'Дательный падеж (Jo\'nalish kelishigi)',
    description: 'Vositali to\'ldiruvchini bildiradi (kimga yoki nimaga).',
    structure: 'Kimga? Nimaga? (Кому? Чему?)',
    examples: [
      'Я даю книгу Анне. (Men kitobni Annaga beryapman.)',
      'Мне нравится это. (Bu menga yoqadi.)'
    ],
    keyPoint: 'Berish, aytish, va tuyg\'ularni ifodalovchi fe\'llar bilan tez-tez ishlatiladi.',
    detailedExplanation: 'Дательный падеж harakatni qabul qiluvchiga nisbatan ishlatiladi. Muzhskoy jinsdagi otlar odatda -у/-ю ni, -a bilan tugaydigan muannas jinsidagi otlar esa -e ni qabul qiladi. Shuningdek u yoshni aytishda ham ishlatiladi (Ему 20 лет = Unga 20 yosh).'
  },
  {
    id: 'ru_instrumental',
    title: 'Творительный падеж (Vosita kelishigi)',
    description: 'Biror narsani bajarish vositasini yoki hamrohlikni (bilan) ko\'rsatadi.',
    structure: 'Kim tomonidan? Nima bilan? (Кем? Чем?)',
    examples: [
      'Я пишу карандашом. (Men qalam bilan yozyapman.)',
      'Я иду с другом. (Men do\'stim bilan ketyapman.)'
    ],
    keyPoint: '"С" (bilan) predlogidan keyin va kasblarni (bo\'lgan/bo\'ladi) aytishda ishlatiladi.',
    detailedExplanation: 'Vosita kelishigi harakat qanday vosita yordamida bajarilganini bildiradi. Muzhskoy jinsdagi otlar asosan -ом/-ем bilan, muannas jinsidagilar esa -ой/-ей bilan tugaydi. Ko\'pincha kim/nima bilan ma\'nosidagi "с" predlogi bilan keladi.'
  },
  {
    id: 'ru_prepositional',
    title: 'Предложный падеж (O\'rin-payt kelishigi)',
    description: 'Faqat predloglar bilan ishlatiladi va joylashuvni (-da) yoki mavzuni (haqida) ko\'rsatadi.',
    structure: 'Kim haqida? Nima haqida? (О ком? О чём?) / Qayerda? (Где?)',
    examples: [
      'Я живу в Москве. (Men Moskvada yashayman.)',
      'Мы говорим о работе. (Biz ish haqida gaplashyapmiz.)'
    ],
    keyPoint: 'Hech qachon predlogsiz ishlatilmaydi.',
    detailedExplanation: 'Предложный падеж (Prepositional case) odatda joylashuvni bildirish uchun "в" (ichida) va "на" (ustida/-da) bilan yoki mavzuni bildirish uchun "о" (haqida) bilan ishlatiladi. Barcha jinsdagi birlik otlar uchun eng ko\'p tarqalgan qo\'shimcha bu -е dir.'
  },
  {
    id: 'ru_verb_aspects',
    title: 'Глаголы (Fe\'l turlari)',
    description: 'Rus tilidagi fe\'llar ikkiga bo\'linadi: Novermukammal (jarayon/odat) va Mukammal (natija/yakunlanganlik).',
    structure: 'Imperfective (НСВ) vs Perfective (СВ)',
    examples: [
      'Я читал книгу. (Men kitobni o\'qiyotgan edim. - jarayon)',
      'Я прочитал книгу. (Men kitobni to\'liq o\'qib bo\'ldim. - natija)'
    ],
    keyPoint: 'Mukammal (Perfective) fe\'llar hozirgi zamonda ishlatilmaydi.',
    detailedExplanation: 'Imperfective (НСВ) fe\'llar harakatning o\'ziga, uning takrorlanishiga yoki davomiyligiga e\'tibor qaratadi. Perfective (СВ) fe\'llar esa harakatning to\'liq tugashiga, natijaga yoki aniq bir marta yuz bergan hodisaga qaratiladi. Perfective fe\'llarda faqat o\'tgan va kelasi zamon mavjud.'
  },
  {
    id: 'ru_past_tense',
    title: 'Прошедшее время (O\'tgan zamon)',
    description: 'Rus tilida o\'tgan zamon shaxsga qarab emas, balki eganing jinsi va soniga qarab o\'zgaradi.',
    structure: '-ть ni olib tashlang, o\'rniga -л (erkak), -ла (ayol), -ло (sredniy), yoki -ли (ko\'plik) qo\'shing',
    examples: [
      'Он читал. (U o\'qidi - o\'g\'il bola.)',
      'Она читала. (U o\'qidi - qiz bola.)',
      'Они читали. (Ular o\'qishdi.)'
    ],
    keyPoint: 'O\'tgan zamonda so\'z jinsga (erkak/ayol) qat\'iy moslashishi kerak.',
    detailedExplanation: 'Hozirgi zamondan farqli o\'laroq (men, sen, u ga qarab o\'zgaradi), o\'tgan zamon ko\'proq sifatga o\'xshab ketadi. Agar ayol kishi gapirayotgan bo\'lsa, u albatta "Я читала" (ayol jinsi) deyishi kerak, erkak kishi esa "Я читал" deydi.'
  },
  {
    id: 'ru_motion_verbs',
    title: 'Глаголы движения (Harakat fe\'llari)',
    description: 'Rus tili bir yo\'nalishli (bir tomonga) va ko\'p yo\'nalishli (qaytish/odat) harakatlarni farqlaydi.',
    structure: 'Идти (bir yo\'nalish) vs Ходить (ko\'p yo\'nalish/odat)',
    examples: [
      'Я иду в магазин. (Men hozir do\'konga ketyapman.)',
      'Я хожу в магазин каждый день. (Men do\'konga har kuni boraman.)'
    ],
    keyPoint: 'Safaringiz odatiy bo\'lishiga yoki ayni paytda bir yo\'nalishda ketayotganingizga qarab fe\'lni tanlang.',
    detailedExplanation: 'Harakat fe\'llari guruhlarga ajratilgan (bir yo\'nalishli / ko\'p yo\'nalishli). Yana bir muhim jihat - qanday sayohat qilish: идти/ходить piyoda yurish bo\'lsa, ехать/ездить transport vositasida yurishni bildiradi.'
  },
  {
    id: 'ru_to_have',
    title: '"Bor/Ega bo\'lmoq" (У меня есть...)',
    description: 'Ingliz tilidagi "to have" fe\'li o\'rniga, rus tili "Menda ... bor" degan maxsus qurilmani ishlatadi.',
    structure: 'У + [Qaratqich kelishigi (Genitive)] + есть + [Bosh kelishik (Nominative)]',
    examples: [
      'У меня есть машина. (Menda mashina bor. / Mening mashinam bor.)',
      'У брата есть проблема. (Akamda muammo bor.)'
    ],
    keyPoint: 'Egalik qilinayotgan narsa ega (Nominative) hisoblanadi, egasi esa Genitive da bo\'ladi.',
    detailedExplanation: 'Ushbu qurilma aynan "Mening oldimda ... bor" degan ma\'noni beradi. Yo\'qlikni bildirish ("yo\'q") uchun "есть" so\'zini olib tashlang va obyektni Qaratqich kelishigida qoldiring: "У меня нет машины" (Menda mashina yo\'q).'
  }
];
