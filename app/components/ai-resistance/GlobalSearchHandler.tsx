'use client';

import { useEffect, useRef } from 'react';

export default function GlobalSearchHandler() {
  // Track if we've already set up the listener to avoid duplicates
  const handlerSetupRef = useRef(false);
  
  useEffect(() => {
    // Only set up the handler once
    if (handlerSetupRef.current) return;
    
    // Delay setting up the handler to ensure the DOM is fully loaded
    const setupHandler = () => {
      // Try to find the search form using various selectors to be robust
      const searchForm = document.querySelector('form[role="search"]');
      const searchInput = document.querySelector('input[placeholder*="Search for a specific job"]');
      
      if (!searchForm || !searchInput) {
        console.warn('Search form or input not found. Will retry in 500ms.');
        // Retry after a short delay
        setTimeout(setupHandler, 500);
        return;
      }
      
      console.log('GlobalSearchHandler: Search form and input found');
      
      // Create a handler for the form submit event
      const handleSubmit = (e: Event) => {
        e.preventDefault();
        
        const inputElement = searchInput as HTMLInputElement;
        const query = inputElement.value.trim();
        
        if (query) {
          console.log(`GlobalSearchHandler: Searching for "${query}"`);
          
          // Dispatch a custom event that OverviewTabs component will listen for
          const searchEvent = new CustomEvent('job-search', {
            detail: { query }
          });
          
          window.dispatchEvent(searchEvent);
        }
      };
      
      // Attach the event listener to the search form
      searchForm.addEventListener('submit', handleSubmit);
      
      // Mark that we've set up the handler
      handlerSetupRef.current = true;
      
      // Clean up function to remove event listener when component unmounts
      return () => {
        if (searchForm) {
          searchForm.removeEventListener('submit', handleSubmit);
        }
      };
    };
    
    // Start the setup process
    setupHandler();
    
    // Cleanup function for the effect
    return () => {
      // Nothing to clean up in the outer effect
    };
  }, []); // Empty dependency array means this effect runs once after the initial render
  
  // This is a utility component that doesn't render anything
  return null;
} 