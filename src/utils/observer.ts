export function observeElements(
  selector: string,
  callback: (element: Element) => void,
  options: IntersectionObserverInit = {}
) {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  // Query elements with retry for dynamic content
  const queryAndObserve = () => {
    const elements = document.querySelectorAll(selector);
    let foundCount = 0;
    
    elements.forEach((element) => {
      if (!element.classList.contains('visible')) {
        observer.observe(element);
        foundCount++;
      }
    });
    
    return foundCount;
  };
  
  // Initial query
  queryAndObserve();
  
  // Watch for dynamically added elements
  const mutationObserver = new MutationObserver(() => {
    queryAndObserve();
  });
  
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}
