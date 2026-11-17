/* popup.js — logika plug, tampilan ala pro */
(() => {
  const PRESETS = window.G1_ZERO_COST_PRESETS || [];
  const ALIAS = window.G1_PK_ALIAS || {};
  const stateEl = document.getElementById("state");
  const usBtn = document.getElementById("us-addr");

  let skuKey = "20tb";
  let months = 12;

  function paintState(text, kind) {
    stateEl.textContent = text;
    stateEl.title = text;
    stateEl.className = kind === "ok" ? "ok" : kind === "err" ? "err" : "warn";
  }

  function findPreset(id) {
    const real = ALIAS[id] || id;
    return PRESETS.find((p) => p.id === real) || null;
  }

  function currentPreset() {
    return PRESETS.find((p) => p.skuKey === skuKey && p.months === months) || PRESETS[0] || null;
  }

  function paint() {
    document.querySelectorAll("#sku-row .chip").forEach((b) => b.classList.toggle("is-on", b.dataset.sku === skuKey));
    document.querySelectorAll("#period-row .chip").forEach((b) => b.classList.toggle("is-on", Number(b.dataset.months) === months));
  }

  function mountedText(p) {
    return "Terpasang: " + p.title + " — siap klik 'Get discount'";
  }

  function queryTab(preset) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs && tabs[0];
      if (!tab || !tab.id || !(tab.url || "").includes("one.google.com")) {
        paintState("Tidak ada injeksi di halaman ini (buka one.google.com/plans lalu refresh)", "warn");
        return;
      }
      chrome.tabs.sendMessage(tab.id, { action: "GET_PAGE_STATUS" }, () => {
        void chrome.runtime.lastError;
        paintState(preset ? mountedText(preset) : "Injeksi terpasang", "ok");
      });
    });
  }

  function selectCurrent() {
    const p = currentPreset();
    if (!p) return;
    chrome.storage.local.set({ g1ZcSelected: p.id });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs && tabs[0];
      if (tab && tab.id && (tab.url || "").includes("one.google.com")) {
        chrome.tabs.sendMessage(tab.id, { action: "SELECT_PRESET", presetId: p.id }, () => {
          void chrome.runtime.lastError;
          paintState(mountedText(p), "ok");
        });
      } else {
        paintState("Disimpan: " + p.title + " (buka one.google.com/plans lalu refresh)", "warn");
      }
    });
    paint();
  }

  document.querySelectorAll("#sku-row .chip").forEach((b) => {
    b.addEventListener("click", () => {
      skuKey = b.dataset.sku;
      selectCurrent();
    });
  });

  document.querySelectorAll("#period-row .chip").forEach((b) => {
    b.addEventListener("click", () => {
      months = Number(b.dataset.months);
      selectCurrent();
    });
  });

  chrome.storage.local.get(["g1ZcSelected"], (res) => {
    const saved = findPreset(res && res.g1ZcSelected);
    if (saved) {
      skuKey = saved.skuKey;
      months = saved.months;
    }
    paint();
    queryTab(currentPreset());
  });

  if (usBtn) {
    usBtn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs[0];
        if (tab && tab.id && (tab.url || "").includes("payments.google.com")) {
          chrome.tabs.sendMessage(tab.id, { action: "FILL_US_ADDRESS" }, () => {
            void chrome.runtime.lastError;
            paintState("Alamat OR 97201 terisi", "ok");
          });
        } else {
          chrome.tabs.create({ url: "https://payments.google.com/gp/w/home/settings" });
          window.close();
        }
      });
    });
  }

  setInterval(() => queryTab(currentPreset()), 2000);
})();
