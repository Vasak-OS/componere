import type { Language } from "@/types/Language";

const languages: Language[] = [
  { abbr: 'aa', lang: 'Afar' },
  { abbr: 'ab', lang: 'Abkhazian' },
  { abbr: 'af', lang: 'Afrikaans' },
  { abbr: 'ak', lang: 'Akan' },
  { abbr: 'am', lang: 'Amharic' },
  { abbr: 'ar', lang: 'Arabic' },
  { abbr: 'an', lang: 'Aragonese' },
  { abbr: 'as', lang: 'Assamese' },
  { abbr: 'av', lang: 'Avaric' },
  { abbr: 'ae', lang: 'Avestan' },
  { abbr: 'ay', lang: 'Aymara' },
  { abbr: 'az', lang: 'Azerbaijani' },
  { abbr: 'ba', lang: 'Bashkir' },
  { abbr: 'bm', lang: 'Bambara' },
  { abbr: 'be', lang: 'Belarusian' },
  { abbr: 'bn', lang: 'Bengali' },
  { abbr: 'bi', lang: 'Bislama' },
  { abbr: 'bo', lang: 'Tibetan' },
  { abbr: 'bs', lang: 'Bosnian' },
  { abbr: 'br', lang: 'Breton' },
  { abbr: 'bg', lang: 'Bulgarian' },
  { abbr: 'ca', lang: 'Catalan' },
  { abbr: 'cs', lang: 'Czech', translated_lang: 'čeština' },
  { abbr: 'ch', lang: 'Chamorro' },
  { abbr: 'ce', lang: 'Chechen' },
  { abbr: 'cu', lang: 'Church Slavic' },
  { abbr: 'cv', lang: 'Chuvash' },
  { abbr: 'kw', lang: 'Cornish' },
  { abbr: 'co', lang: 'Corsican' },
  { abbr: 'cr', lang: 'Cree' },
  { abbr: 'cy', lang: 'Welsh' },
  { abbr: 'da', lang: 'Danish', translated_lang: 'Dansk' },
  { abbr: 'de', lang: 'German', translated_lang: 'Deutsch' },
  { abbr: 'dv', lang: 'Dhivehi' },
  { abbr: 'dz', lang: 'Dzongkha' },
  { abbr: 'el', lang: 'Modern Greek (1453-)', translated_lang: 'Ελληνικά' },
  { abbr: 'en', lang: 'English' },
  { abbr: 'eo', lang: 'Esperanto' },
  { abbr: 'et', lang: 'Estonian', translated_lang: 'Eesti' },
  { abbr: 'eu', lang: 'Basque' },
  { abbr: 'ee', lang: 'Ewe' },
  { abbr: 'fo', lang: 'Faroese' },
  { abbr: 'fa', lang: 'Persian' },
  { abbr: 'fj', lang: 'Fijian' },
  { abbr: 'fi', lang: 'Finnish' },
  { abbr: 'fr', lang: 'French', translated_lang: 'Français' },
  { abbr: 'fy', lang: 'Western Frisian' },
  { abbr: 'ff', lang: 'Fulah' },
  { abbr: 'gd', lang: 'Scottish Gaelic' },
  { abbr: 'ga', lang: 'Irish' },
  { abbr: 'gl', lang: 'Galician' },
  { abbr: 'gv', lang: 'Manx' },
  { abbr: 'gn', lang: 'Guarani' },
  { abbr: 'gu', lang: 'Gujarati' },
  { abbr: 'ht', lang: 'Haitian' },
  { abbr: 'ha', lang: 'Hausa' },
  { abbr: 'sh', lang: 'Serbo-Croatian' },
  { abbr: 'he', lang: 'Hebrew' },
  { abbr: 'hz', lang: 'Herero' },
  { abbr: 'hi', lang: 'Hindi' },
  { abbr: 'ho', lang: 'Hiri Motu' },
  { abbr: 'hr', lang: 'Croatian' },
  { abbr: 'hu', lang: 'Hungarian' },
  { abbr: 'hy', lang: 'Armenian' },
  { abbr: 'ig', lang: 'Igbo' },
  { abbr: 'io', lang: 'Ido' },
  { abbr: 'ii', lang: 'Sichuan Yi' },
  { abbr: 'iu', lang: 'Inuktitut' },
  { abbr: 'ie', lang: 'Interlingue' },
  { abbr: 'ia', lang: 'Interlingua (International Auxiliary Language Association)' },
  { abbr: 'id', lang: 'Indonesian', translated_lang: 'Indonesian' },
  { abbr: 'ik', lang: 'Inupiaq' },
  { abbr: 'is', lang: 'Icelandic' },
  { abbr: 'it', lang: 'Italian', translated_lang: 'Italiano' },
  { abbr: 'jv', lang: 'Javanese' },
  { abbr: 'ja', lang: 'Japanese' },
  { abbr: 'kl', lang: 'Kalaallisut' },
  { abbr: 'kn', lang: 'Kannada' },
  { abbr: 'ks', lang: 'Kashmiri' },
  { abbr: 'ka', lang: 'Georgian' },
  { abbr: 'kr', lang: 'Kanuri' },
  { abbr: 'kk', lang: 'Kazakh' },
  { abbr: 'km', lang: 'Central Khmer' },
  { abbr: 'ki', lang: 'Kikuyu' },
  { abbr: 'rw', lang: 'Kinyarwanda' },
  { abbr: 'ky', lang: 'Kirghiz' },
  { abbr: 'kv', lang: 'Komi' },
  { abbr: 'kg', lang: 'Kongo' },
  { abbr: 'ko', lang: 'Korean', translated_lang: '한글', external_dep: true },
  { abbr: 'kj', lang: 'Kuanyama' },
  { abbr: 'ku', lang: 'Kurdish' },
  { abbr: 'lo', lang: 'Lao' },
  { abbr: 'la', lang: 'Latin' },
  { abbr: 'lv', lang: 'Latvian' },
  { abbr: 'li', lang: 'Limburgan' },
  { abbr: 'ln', lang: 'Lingala' },
  { abbr: 'lt', lang: 'Lithuanian', translated_lang: 'Lietuvių' },
  { abbr: 'lb', lang: 'Luxembourgish' },
  { abbr: 'lu', lang: 'Luba-Katanga' },
  { abbr: 'lg', lang: 'Ganda' },
  { abbr: 'mh', lang: 'Marshallese' },
  { abbr: 'ml', lang: 'Malayalam' },
  { abbr: 'mr', lang: 'Marathi' },
  { abbr: 'mk', lang: 'Macedonian' },
  { abbr: 'mg', lang: 'Malagasy' },
  { abbr: 'mt', lang: 'Maltese' },
  { abbr: 'mn', lang: 'Mongolian' },
  { abbr: 'mi', lang: 'Maori' },
  { abbr: 'ms', lang: 'Malay (macrolanguage)' },
  { abbr: 'my', lang: 'Burmese' },
  { abbr: 'na', lang: 'Nauru' },
  { abbr: 'nv', lang: 'Navajo' },
  { abbr: 'nr', lang: 'South Ndebele' },
  { abbr: 'nd', lang: 'North Ndebele' },
  { abbr: 'ng', lang: 'Ndonga' },
  { abbr: 'ne', lang: 'Nepali (macrolanguage)' },
  { abbr: 'nl', lang: 'Dutch', translated_lang: 'Nederlands' },
  { abbr: 'nn', lang: 'Norwegian Nynorsk' },
  { abbr: 'nb', lang: 'Norwegian Bokmål' },
  { abbr: 'no', lang: 'Norwegian' },
  { abbr: 'ny', lang: 'Nyanja' },
  { abbr: 'oc', lang: 'Occitan (post 1500)' },
  { abbr: 'oj', lang: 'Ojibwa' },
  { abbr: 'or', lang: 'Oriya (macrolanguage)' },
  { abbr: 'om', lang: 'Oromo' },
  { abbr: 'os', lang: 'Ossetian' },
  { abbr: 'pa', lang: 'Panjabi' },
  { abbr: 'pi', lang: 'Pali' },
  { abbr: 'pl', lang: 'Polish', translated_lang: 'Polski' },
  { abbr: 'pt', lang: 'Portuguese', translated_lang: 'Português' },
  { abbr: 'pt_BR', lang: 'Brazilian Portuguese', translated_lang: 'Português do Brasil' },
  { abbr: 'ps', lang: 'Pushto' },
  { abbr: 'qu', lang: 'Quechua' },
  { abbr: 'rm', lang: 'Romansh' },
  { abbr: 'ro', lang: 'Romanian', translated_lang: 'Română' },
  { abbr: 'rn', lang: 'Rundi' },
  { abbr: 'ru', lang: 'Russian', translated_lang: 'Русский' },
  { abbr: 'sg', lang: 'Sango' },
  { abbr: 'sa', lang: 'Sanskrit' },
  { abbr: 'si', lang: 'Sinhala' },
  { abbr: 'sk', lang: 'Slovak' },
  { abbr: 'sl', lang: 'Slovenian' },
  { abbr: 'se', lang: 'Northern Sami' },
  { abbr: 'sm', lang: 'Samoan' },
  { abbr: 'sn', lang: 'Shona' },
  { abbr: 'sd', lang: 'Sindhi' },
  { abbr: 'so', lang: 'Somali' },
  { abbr: 'st', lang: 'Southern Sotho' },
  { abbr: 'es', lang: 'Spanish', translated_lang: 'Español' },
  { abbr: 'sq', lang: 'Albanian' },
  { abbr: 'sc', lang: 'Sardinian' },
  { abbr: 'sr', lang: 'Serbian' },
  { abbr: 'ss', lang: 'Swati' },
  { abbr: 'su', lang: 'Sundanese' },
  { abbr: 'sw', lang: 'Swahili (macrolanguage)' },
  { abbr: 'sv', lang: 'Swedish', translated_lang: 'Svenska' },
  { abbr: 'ty', lang: 'Tahitian' },
  { abbr: 'ta', lang: 'Tamil', translated_lang: 'தமிழ்' },
  { abbr: 'tt', lang: 'Tatar' },
  { abbr: 'te', lang: 'Telugu' },
  { abbr: 'tg', lang: 'Tajik' },
  { abbr: 'tl', lang: 'Tagalog' },
  { abbr: 'th', lang: 'Thai' },
  { abbr: 'ti', lang: 'Tigrinya' },
  { abbr: 'to', lang: 'Tonga (Tonga Islands)' },
  { abbr: 'tn', lang: 'Tswana' },
  { abbr: 'ts', lang: 'Tsonga' },
  { abbr: 'tk', lang: 'Turkmen' },
  { abbr: 'tr', lang: 'Turkish', translated_lang: 'Türkçe' },
  { abbr: 'tw', lang: 'Twi' },
  { abbr: 'ug', lang: 'Uighur' },
  { abbr: 'uk', lang: 'Ukrainian' },
  { abbr: 'ur', lang: 'Urdu', translated_lang: 'اردو' },
  { abbr: 'uz', lang: 'Uzbek' },
  { abbr: 've', lang: 'Venda' },
  { abbr: 'vi', lang: 'Vietnamese' },
  { abbr: 'vo', lang: 'Volapük' },
  { abbr: 'wa', lang: 'Walloon' },
  { abbr: 'wo', lang: 'Wolof' },
  { abbr: 'xh', lang: 'Xhosa' },
  { abbr: 'yi', lang: 'Yiddish' },
  { abbr: 'yo', lang: 'Yoruba' },
  { abbr: 'za', lang: 'Zhuang' },
  { abbr: 'zh-CN', lang: 'Simplified Chinese', translated_lang: '简体中文' },
  { abbr: 'zh-TW', lang: 'Traditional Chinese', translated_lang: '繁體中文' },
  { abbr: 'zu', lang: 'Zulu' }
];

export default languages;
