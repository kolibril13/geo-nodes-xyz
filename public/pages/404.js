// 404 Not Found page

export const title = 'Not Found - Tree Clipper';

export function template() {
  return `
    <a href="/" class="back-button">←</a>
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <p><a href="/">Go back to the homepage</a></p>
  `;
}

export function init() {
  // Nothing to initialize
}
