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

