// --- App Controller ---
// Depends on: AppState, Render

const App = {
    init() {
        Render.init();
    },

    switchTopTab(key) {
        if (key === 'Home') {
            this.loadPlatformOverview();
        } else {
            AppState.setCurrentTab(key);
            Render.init();
        }
    },

    loadPlatformOverview() {
        AppState.setCurrentTab('Home');
        Render.renderMainContent(); // Renders Overview by default when sidebarSelection is null
        Render.renderTopNav(); // Update active state
        Render.renderSidebar(); // Show directory
    },

    selectSidebarItem(key) {
        AppState.setSidebarSelection(key);
        Render.renderSidebar(); // Update active
        Render.renderMainContent(); // Show details
    },

    toggleSidebar() {
        AppState.toggleSidebar();
        Render.renderSidebar(); // Update classes
    }
};

// Auto-start
window.onload = () => {
    App.init();
};
