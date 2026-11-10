import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

const { window } = dom;

// Properti utama browser didefinisikan langsung
const utama = {
  window,
  document: window.document,
  navigator: window.navigator,
};

for (const [key, value] of Object.entries(utama)) {
  Object.defineProperty(globalThis, key, {
    configurable: true,
    writable: true,
    value,
  });
}

// Salin properti browser lain (HTMLElement, Event, dll.) yang belum ada di Node
for (const key of Object.getOwnPropertyNames(window)) {
  if (key in globalThis) continue;
  Object.defineProperty(globalThis, key, {
    configurable: true,
    get: () => window[key],
  });
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;