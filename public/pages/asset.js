// Asset detail page

export function title(params) {
  return `Asset - Tree Clipper`;
}

export function template(params) {
  return `
    <a href="/" class="back-button">←</a>
    <h1>
      <span id="asset-title" style="color: #232323;">&nbsp;</span>
    </h1>
    
    <div class="asset-layout">
      <div id="asset-img-container" class="asset-img-container">
        <img id="asset-img" src="" class="asset-img">
      </div>
      <div class="copy-asset">
        <p>Asset data:</p>
        <pre id="asset-data">Loading...</pre>
        <button id="copy-button" class="copy-button">Copy</button>
      </div>
    </div>
    
    <!-- Compatibility info section -->
    <div id="compat-info" class="asset-tags-detail" style="display: none;"></div>
    
    <div id="asset-meta" class="asset-meta"></div>
  `;
}

export async function init(params) {
  // Set up copy button
  const copyBtn = document.getElementById('copy-button');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyAssetData);
  }
  
  // Load asset
  await loadAsset(params.username, params.slug);
  
  // Return cleanup function
  return () => {
    if (copyBtn) {
      copyBtn.removeEventListener('click', copyAssetData);
    }
  };
}

function copyAssetData() {
  const assetData = document.getElementById('asset-data');
  const text = assetData.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const button = document.getElementById('copy-button');
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

async function loadAsset(username, slug) {
  if (!username || !slug) {
    document.getElementById("asset-title").textContent = "No Asset";
    document.getElementById("asset-data").textContent = "Please provide an asset in the URL";
    return;
  }
  
  const apiUrl = `/api/asset/${encodeURIComponent(username)}/${encodeURIComponent(slug)}`;
  
  try {
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      if (res.status === 404) {
        document.getElementById("asset-title").textContent = "Asset Not Found";
        document.getElementById("asset-data").textContent = "The requested asset does not exist";
        return;
      }
      throw new Error(`HTTP ${res.status}`);
    }
    
    const asset = await res.json();
    
    // Update page title
    document.title = `${asset.title || "Asset"} - Tree Clipper`;
    
    // Update title
    const titleEl = document.getElementById("asset-title");
    titleEl.textContent = asset.title || "Untitled Asset";
    
    // Update meta info (author, description, dates)
    const metaEl = document.getElementById("asset-meta");
    const author = asset.author || "Unknown";
    const description = asset.description || "";
    const authorUrl = `/${encodeURIComponent(author)}`;
    
    // Format dates
    const createdDate = asset.creation_date ? formatDate(asset.creation_date) : null;
    const updatedDate = asset.last_update ? formatDate(asset.last_update) : null;
    
    let metaHtml = `by <a href="${authorUrl}" class="author-link"><strong>@${escapeHtml(author)}</strong></a>`;
    if (description) metaHtml += `<br><span class="asset-description">${escapeHtml(description)}</span>`;
    if (createdDate) {
      metaHtml += `<br><span class="date-info">Created: ${createdDate}`;
      if (updatedDate && updatedDate !== createdDate) {
        metaHtml += ` · Updated: ${updatedDate}`;
      }
      metaHtml += `</span>`;
    }
    metaEl.innerHTML = metaHtml;
    
    // Update compatibility info (node type, Blender version, TreeClipper version)
    const compatEl = document.getElementById("compat-info");
    const hasCompatInfo = asset.node_type || asset.blender_version || asset.treeclipper_version;
    
    if (hasCompatInfo) {
      let compatHtml = '';
      
      if (asset.node_type) {
        const nodeTypeLabel = formatNodeType(asset.node_type);
        const nodeTypeIcon = getNodeTypeIcon(asset.node_type);
        compatHtml += `<span class="asset-tag asset-tag--${asset.node_type}">${nodeTypeIcon} ${nodeTypeLabel}</span>`;
      }
      
      if (asset.blender_version) {
        compatHtml += `<span class="asset-tag asset-tag--blender">Blender ${escapeHtml(asset.blender_version)}</span>`;
      }
      
      if (asset.treeclipper_version) {
        compatHtml += `<span class="asset-tag asset-tag--treeclipper">TreeClipper ${escapeHtml(asset.treeclipper_version)}</span>`;
      }
      
      compatEl.innerHTML = compatHtml;
      compatEl.style.display = 'flex';
    }
    
    // Update asset data
    const dataEl = document.getElementById("asset-data");
    dataEl.textContent = asset.asset_data || "No data available";
    
    // Update image if available
    const imgEl = document.getElementById("asset-img");
    const containerEl = document.getElementById("asset-img-container");
    const imageUrl = asset.image_data;
    
    if (imageUrl) {
      // Preload image before showing
      const preloadImg = new Image();
      preloadImg.onload = () => {
        imgEl.src = imageUrl;
        containerEl.classList.add("loaded");
      };
      preloadImg.onerror = () => {
        // Hide container if image fails to load
        containerEl.classList.add("hidden");
      };
      preloadImg.src = imageUrl;
    } else {
      // No image for this asset - hide the container
      containerEl.classList.add("hidden");
    }
  } catch (err) {
    console.error("Failed to load asset:", err);
    document.getElementById("asset-title").textContent = "Error";
    document.getElementById("asset-data").textContent = "Failed to load: " + err.message;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatNodeType(nodeType) {
  const labels = {
    'geonodes': 'Geometry Nodes',
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
