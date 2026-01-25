// Home page - lists all assets

export const title = 'Tree Clipper';

export function template() {
  return `
    <h1>Tree Clipper</h1>
    
    <ul id="assets-list" class="assets-list">
      <li class="loading-item">Loading assets...</li>
    </ul>

    <a href="/upload-asset" class="upload-btn">+ Upload Asset</a>
    
    <footer class="site-footer">
      <a href="/terms">Terms</a> · <a href="/imprint">Imprint</a>
    </footer>
  `;
}

export async function init() {
  await loadAssets();
}

async function loadAssets() {
  const listEl = document.getElementById("assets-list");
  if (!listEl) return;
  
  try {
    const res = await fetch("/api/entries");
    const entries = await res.json();
    
    if (!entries || entries.length === 0) {
      listEl.innerHTML = '<li class="empty-item">No assets yet. Be the first to upload!</li>';
      return;
    }
    
    listEl.innerHTML = entries.map(entry => {
      const title = entry.title || "Untitled Asset";
      const author = entry.author || "Unknown";
      const imageUrl = entry.image_data;
      const imageHtml = imageUrl 
        ? `<img src="${escapeHtml(imageUrl)}" alt="" class="asset-thumb" loading="lazy">`
        : `<div class="asset-thumb-placeholder">📦</div>`;
      
      // Build tags HTML
      let tagsHtml = '';
      if (entry.node_type || entry.blender_version) {
        tagsHtml = '<div class="asset-tags">';
        if (entry.node_type) {
          const nodeLabel = formatNodeType(entry.node_type);
          const nodeIcon = getNodeTypeIcon(entry.node_type);
          tagsHtml += `<span class="asset-tag asset-tag--${entry.node_type}">${nodeIcon} ${nodeLabel}</span>`;
        }
        if (entry.blender_version) {
          tagsHtml += `<span class="asset-tag asset-tag--blender">Blender ${escapeHtml(entry.blender_version)}</span>`;
        }
        tagsHtml += '</div>';
      }
      
      const assetUrl = `/${encodeURIComponent(author)}/${encodeURIComponent(entry.slug)}`;
      
      return `
        <li>
          <a href="${assetUrl}">
            ${imageHtml}
            <div class="asset-info">
              <span class="asset-title">${escapeHtml(title)}</span>
              <span class="asset-author">by @${escapeHtml(author)}</span>
              ${tagsHtml}
            </div>
          </a>
        </li>
      `;
    }).join('');
    
  } catch (err) {
    console.error("Failed to load assets:", err);
    listEl.innerHTML = '<li class="error-item">Failed to load assets. Please try again later.</li>';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatNodeType(nodeType) {
  const labels = {
    'geonodes': 'Geo Nodes',
    'shader': 'Shader',
    'compositor': 'Compositor'
  };
  return labels[nodeType] || nodeType;
}

function getNodeTypeIcon(nodeType) {
  const icons = {
    'geonodes': '◇',
    'shader': '◐',
    'compositor': '▣'
  };
  return icons[nodeType] || '●';
}
