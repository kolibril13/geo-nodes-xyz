// Imprint page

export const title = 'Imprint – Tree Clipper';

export function template() {
  return `
    <a href="/" class="back-button">←</a>
    
    <h1>Imprint</h1>
    
    <div class="legal-content">
      <p><strong>Tree Clipper</strong></p>
      <p>A community project for sharing Blender geometry node trees.</p>
      
      <h2>Contact</h2>
      <p>For questions or takedown requests, open an issue on GitHub or reach out via <a href="https://discord.gg/T8wwzGQ8Ax" target="_blank">Discord</a>.</p>
    </div>
    
    <p style="margin-top: 2em;"><a href="/terms">Terms & Conditions</a></p>
  `;
}

export function init() {
  // Static page, nothing to initialize
}
