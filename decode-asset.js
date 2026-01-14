// --- Pure JS, no external libraries required! ---
// Helper: Base64 decode to Uint8Array (browser, no atob)
function base64ToUint8Array(b64) {
    // Remove whitespace
    b64 = b64.replace(/\s/g, '');
    // modern browsers: atob
    const binaryString = atob(b64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// Gzip (RFC 1952) decompress using DecompressionStream (Chrome, Edge, Firefox 117+)
async function ungzip(bytes) {
    if (typeof DecompressionStream === "undefined") {
        throw new Error("This browser does not support DecompressionStream (required for gzip decompression). Try Chromium/Edge/Firefox 117+.");
    }
    const cs = new DecompressionStream('gzip');
    const blob = new Blob([bytes]);
    const decompressedStream = blob.stream().pipeThrough(cs);
    const decompressed = await new Response(decompressedStream).arrayBuffer();
    // Decode ArrayBuffer → string
    const dec = new TextDecoder();
    return dec.decode(decompressed);
}

function getTreeClipperData() {
    const el = document.getElementById('asset-data');
    let raw = el.textContent.trim();
    if (!raw.startsWith('TreeClipper::')) return null;
    let arr = raw.split('::');
    if (arr.length !== 2) return null;
    return arr[1];
}

// Async show function due to ungzip
async function showDecodedAsset() {
    const b64 = getTreeClipperData();
    if (!b64) {
        document.getElementById('decoded-asset').textContent = "Could not find TreeClipper asset data.";
        return;
    }
    try {
        const bytes = base64ToUint8Array(b64);
        const json = await ungzip(bytes);
        const obj = JSON.parse(json);
        document.getElementById('decoded-asset').textContent = JSON.stringify(obj, null, 2);
    } catch (e) {
        document.getElementById('decoded-asset').textContent = "Failed to decode asset: " + e;
    }
}
// Load and then decode (async/await version)
window.addEventListener('DOMContentLoaded', function() {
    showDecodedAsset();
});
