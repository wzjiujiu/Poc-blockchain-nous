// --- Funzioni per parsing e formattazione ---
function parseNestedJSON(obj) {
  if (typeof obj === "string") {
    try {
      return parseNestedJSON(JSON.parse(obj));
    } catch {
      return obj; // non è JSON valido
    }
  } else if (Array.isArray(obj)) {
    return obj.map(parseNestedJSON);
  } else if (obj && typeof obj === "object") {
    const parsed = {};
    for (const [key, value] of Object.entries(obj)) {
      parsed[key] = parseNestedJSON(value);
    }
    return parsed;
  }
  return obj;
}

function cleanKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(cleanKeys);
  } else if (obj && typeof obj === "object") {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanKey = key.replace(/.*[\/#]/, ""); // rimuove prefissi URL
      cleaned[cleanKey] = cleanKeys(value);
    }
    return cleaned;
  }
  return obj;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderAsList(obj) {
  if (typeof obj !== "object" || obj === null) return `<span>${obj}</span>`;

  let html = "<ul style='list-style:none;padding-left:0;margin:0'>";

  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === "object" && val !== null) {
      html += `<li><b>${key}:</b> ${renderAsList(val)}</li>`;
    } else {
      html += `<li><b>${key}:</b> <span>${val}</span></li>`;
    }
  }

  html += "</ul>";
  return html;
}

module.exports = { parseNestedJSON, cleanKeys,escapeHtml,renderAsList };