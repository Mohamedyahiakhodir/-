
import { Language } from './types';

type UiText = {
  [key in Language]: {
    title: string;
    description: string;
    ingredientsLabel: string;
    ingredientsPlaceholder: string;
    mealTypeLabel: string;
    generateButton: string;
    generating: string;
    toggleLanguage: string;
    error: {
      noIngredients: string;
      apiError: string;
    };
  }
};

export const uiText: UiText = {
  [Language.AR]: {
    title: 'مولد الوصفات الذكي',
    description: 'هل لديك مكونات ولا تعرف ماذا تطبخ؟ أدخل المكونات التي لديك أدناه ودع الذكاء الاصطناعي يبدع لك وصفة شهية!',
    ingredientsLabel: 'ما هي المكونات المتوفرة لديك؟',
    ingredientsPlaceholder: 'مثال: دجاج، أرز، طماطم، بصل...',
    mealTypeLabel: 'اختر نوع الوجبة',
    generateButton: 'اصنع لي وصفة!',
    generating: '...جاري التحضير',
    toggleLanguage: 'التبديل إلى اللغة الإنجليزية',
    error: {
      noIngredients: 'الرجاء إدخال بعض المكونات أولاً.',
      apiError: 'حدث خطأ ما. الرجاء المحاولة مرة أخرى لاحقًا.',
    },
  },
  [Language.EN]: {
    title: 'Smart Recipe Generator',
    description: 'Got ingredients but not sure what to cook? Enter the ingredients you have below and let AI create a delicious recipe for you!',
    ingredientsLabel: 'What ingredients do you have?',
    ingredientsPlaceholder: 'e.g., chicken, rice, tomatoes, onion...',
    mealTypeLabel: 'Choose a meal type',
    generateButton: 'Generate Recipe!',
    generating: 'Generating...',
    toggleLanguage: 'Switch to Arabic',
    error: {
      noIngredients: 'Please enter some ingredients first.',
      apiError: 'Something went wrong. Please try again later.',
    },
  }
};

export const mealTypes = [
  { value: 'any', label: { [Language.AR]: 'أي نوع', [Language.EN]: 'Any' } },
  { value: 'breakfast', label: { [Language.AR]: 'فطور', [Language.EN]: 'Breakfast' } },
  { value: 'lunch', label: { [Language.AR]: 'غداء', [Language.EN]: 'Lunch' } },
  { value: 'dinner', label: { [Language.AR]: 'عشاء', [Language.EN]: 'Dinner' } },
  { value: 'dessert', label: { [Language.AR]: 'حلى', [Language.EN]: 'Dessert' } },
  { value: 'snack', label: { [Language.AR]: 'وجبة خفيفة', [Language.EN]: 'Snack' } },
];
