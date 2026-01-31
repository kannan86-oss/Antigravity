import { MOCK_DATA } from './data.js';
import { Store } from './store.js';
import { Render } from './render.js';
import { parseCSV } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authOverlay = document.getElementById('auth-overlay');
    const detailsView = document.getElementById('details-view');
    const contentPlaceholder = document.getElementById('content-placeholder');
    const importBtn = document.getElementById('import-btn');
    const fileInput = document.getElementById('file-input');
    const searchInput = document.getElementById('global-search');
    const settingsBtn = document.getElementById('settings-btn');
    const closeSettings = document.getElementById('close-settings');

    // --- Auth Simulation ---
    setTimeout(() => {
        authOverlay.style.opacity = '0';
        setTimeout(() => {
            authOverlay.classList.add('hidden');
            initApp();
        }, 500);
    }, 1000);

    function initApp() {
        Render.renderTopNav(Object.keys(MOCK_DATA), handleTopTabClick);
        handleTopTabClick('Team details'); // Default open for demo
    }

    // --- Handlers ---

    function handleTopTabClick(key) {
        Store.setCurrentTopTab(key);
        // Re-render Nav to show active state
        Render.renderTopNav(Object.keys(MOCK_DATA), handleTopTabClick);

        const dataObj = MOCK_DATA[key];

        let keys = [];
        if (key === 'Home') {
            keys = []; // Home has custom view in this logic
            showHomeView(dataObj);
        } else {
            // Filter Sidebar keys
            keys = Object.keys(dataObj).filter(k => k !== 'description');
            Render.renderSidebar(keys, handleSidebarClick);

            // Auto Select First
            if (keys.length > 0) handleSidebarClick(keys[0]);
        }
    }

    function handleSidebarClick(key) {
        Store.setCurrentSidebarTab(key);
        // Re-render Sidebar Active State
        Render.renderSidebar(Object.keys(MOCK_DATA[Store.currentTopTab]).filter(k => k !== 'description'), handleSidebarClick);

        const subData = MOCK_DATA[Store.currentTopTab][key];

        // Find sub-keys that are objects (Layout 2)
        const subKeys = Object.keys(subData).filter(k => typeof subData[k] === 'object' && !['managers', 'employees'].includes(k));

        if (subKeys.length > 0) {
            Render.renderSubTabs(subKeys, (subKey) => handleSubTabClick(subKey, subData[subKey]));
            handleSubTabClick(subKeys[0], subData[subKeys[0]]);
        } else {
            // Direct Leaf
            Render.renderSubTabs([], () => { });
            // Render directly if it has data
            Render.renderDataView(key, subData);
            Render.renderTable(subData.employees);
        }

        detailsView.classList.remove('hidden');
        contentPlaceholder.classList.add('hidden');
    }

    function handleSubTabClick(key, data) {
        Store.setCurrentSubTab(key);

        // Re-render Subtabs active state
        // Need to traverse back to find siblings?
        // Easier: Just re-render based on currentSidebarTab
        const parentData = MOCK_DATA[Store.currentTopTab][Store.currentSidebarTab];
        const subKeys = Object.keys(parentData).filter(k => typeof parentData[k] === 'object');

        Render.renderSubTabs(subKeys, (subKey) => handleSubTabClick(subKey, parentData[subKey]));

        Render.renderDataView(key, data);
        Render.renderTable(data.employees);
    }

    function showHomeView(data) {
        // ... (Basic Home View Logic if needed)
        // For now focusing on the Team Details flow
    }

    // --- File Input ---
    importBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const newData = parseCSV(text);
            if (newData.length > 0) {
                // Update Table
                Render.renderTable(newData);
                alert('Team details updated successfully!');
            }
        };
        reader.readAsText(file);
    });

    // --- Search ---
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        // Implement filtering on the CURRENT table data
        // For now, simpler: Just console log (Proper filter requires storing current table data in state)
        // Feature for next iteration: Store currentEmployees in Store.
    });

    // --- Settings ---
    settingsBtn.addEventListener('click', () => Render.toggleSettingsModal(true));
    closeSettings.addEventListener('click', () => Render.toggleSettingsModal(false));

});
