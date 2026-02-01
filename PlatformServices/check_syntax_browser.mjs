// Mock Browser Environment
global.window = {
    location: { href: 'http://localhost:8000' },
    addEventListener: () => { },
};
global.document = {
    getElementById: () => ({
        addEventListener: () => { },
        style: {},
        classList: { add: () => { }, remove: () => { } }
    }),
    querySelector: () => ({ addEventListener: () => { } }),
    createElement: () => ({
        style: {},
        classList: { add: () => { } },
        appendChild: () => { },
        addEventListener: () => { }
    }),
    addEventListener: () => { },
};
global.HTMLElement = class { };
global.FileReader = class { readAsText() { } };

// Try importing the modules
try {
    await import('./js/store.js');
    console.log('Store.js: OK');

    await import('./js/utils.js');
    console.log('Utils.js: OK');

    await import('./js/data.js');
    console.log('Data.js: OK');

    await import('./js/render.js');
    console.log('Render.js: OK');

    await import('./js/main.js');
    console.log('Main.js: OK');

    console.log('ALL SYNTAX OK');
} catch (e) {
    console.error('SYNTAX ERROR DETECTED:');
    console.error(e);
}
