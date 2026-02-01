// --- App Controller ---
const App = {
    init() {
        Render.init();
    },

    switchTopTab(key) {
        if (key === 'Home') {
            this.loadPlatformOverview();
        } else {
            AppState.setCurrentTab(key);
            Render.init(); // Refresh Nav & Content
        }
    },

    loadPlatformOverview() {
        AppState.setCurrentTab('Home');
        Render.renderMainContent(); // Defaults to Overview
        Render.renderTopNav();
        Render.renderSidebar();
    },

    selectSidebarItem(key) {
        AppState.setSidebarSelection(key);

        // Default to first sub-service
        const groupData = ServiceData.Services[key];
        if (groupData) {
            const firstSub = Object.keys(groupData)[0];
            AppState.setSubService(firstSub);
        }

        Render.renderSidebar();   // Update active class
        Render.renderMainContent(); // Show Service View
    },

    switchSubService(key) {
        AppState.setSubService(key);
        Render.renderMainContent(); // Re-render Service View with new sub-service data
    },

    toggleSidebar() {
        AppState.toggleSidebar();
        Render.renderSidebar();
    }
};

window.onload = () => App.init();
