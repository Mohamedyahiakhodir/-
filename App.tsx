
import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './types';
import { uiText, mealTypes } from './constants';
import { generateRecipe } from './services/geminiService';
import { ChefHat, Languages, UtensilsCrossed } from 'lucide-react';

// Helper components defined outside the main component to prevent re-creation on re-renders.

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
    <p className="text-emerald-700 dark:text-emerald-300">جاري تحضير وصفتك...</p>
    <p className="text-emerald-700 dark:text-emerald-300">Preparing your recipe...</p>
  </div>
);

interface RecipeDisplayProps {
  recipe: string;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6 animate-fade-in w-full">
    <h3 className="flex items-center text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300">
      <UtensilsCrossed className="inline-block me-3" />
      <span>وصفتك جاهزة! / Your Recipe is Ready!</span>
    </h3>
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
      {recipe}
    </div>
  </div>
);


const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.AR);
  const [ingredients, setIngredients] = useState<string>('');
  const [mealType, setMealType] = useState<string>('any');
  const [generatedRecipe, setGeneratedRecipe] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.AR ? Language.EN : Language.AR);
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (!ingredients.trim()) {
      setError(uiText[language].error.noIngredients);
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedRecipe('');

    try {
      const recipe = await generateRecipe(ingredients, mealType, language);
      setGeneratedRecipe(recipe);
    } catch (err) {
      setError(uiText[language].error.apiError);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, mealType, language]);

  const currentUiText = uiText[language];
  const isRtl = language === Language.AR;

  return (
    <div className="bg-cream-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="flex items-center text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-300">
            <ChefHat size={40} className={isRtl ? 'ml-3' : 'mr-3'} />
            {currentUiText.title}
          </h1>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
            aria-label={currentUiText.toggleLanguage}
          >
            <Languages size={20} />
            <span className="font-semibold">{language === Language.AR ? 'English' : 'العربية'}</span>
          </button>
        </header>

        <main className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
            {currentUiText.description}
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="ingredients" className="block text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {currentUiText.ingredientsLabel}
              </label>
              <textarea
                id="ingredients"
                rows={4}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder={currentUiText.ingredientsPlaceholder}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label htmlFor="mealType" className="block text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {currentUiText.mealTypeLabel}
              </label>
              <select
                id="mealType"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 bg-gray-50 dark:bg-gray-700"
              >
                {mealTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label[language]}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading}
              className={`w-full py-4 px-6 text-xl font-bold text-white rounded-lg transition-all duration-300 flex items-center justify-center
                ${isLoading 
                  ? 'bg-emerald-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800'}`}
            >
              {isLoading ? currentUiText.generating : currentUiText.generateButton}
            </button>
          </div>
        </main>
        
        <div className="mt-8 flex justify-center">
            {isLoading && <LoadingSpinner />}
            {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/50 border border-red-500 p-4 rounded-lg text-center animate-fade-in">{error}</div>}
            {generatedRecipe && <RecipeDisplay recipe={generatedRecipe} />}
        </div>

      </div>
    </div>
  );
};

export default App;
