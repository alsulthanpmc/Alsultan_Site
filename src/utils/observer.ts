export function observeElements(
  selector: string,
  callback: (element: Element) => void,
  options: IntersectionObserverInit = {}
) {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
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

    elements.forEach((element) => {
      if (!element.classList.contains('visible')) {
        // If the element is already in the viewport, trigger immediately
        const rect = element.getBoundingClientRect();
        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.width > 0 &&
          rect.height > 0
        ) {
          callback(element);
        } else {
          observer.observe(element);
        }
      }
    });
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
