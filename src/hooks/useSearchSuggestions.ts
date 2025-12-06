import { useState, useEffect, useRef } from 'react';
import { getSearchSuggestions } from '../services/geminiService';
import { useDebounce } from './useDebounce';

/**
 * Hook for managing search suggestions with debouncing
 */
export const useSearchSuggestions = (query: string, lastSelectedTopic: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Don't fetch if query is short or identical to what we just selected/searched
      if (debouncedQuery.trim().length >= 3 && debouncedQuery !== lastSelectedTopic) {
        const sugs = await getSearchSuggestions(debouncedQuery);
        if (sugs && sugs.length > 0) {
          setSuggestions(sugs);
          setShowSuggestions(true);
        }
      } else {
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, lastSelectedTopic]);

  return {
    suggestions,
    showSuggestions,
    setShowSuggestions,
  };
};
