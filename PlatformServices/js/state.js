// --- State Management ---
const AppState = {
    currentTopTab: 'Home',
    currentSidebarSelection: null, // If null, show Overview (if Home)
    isSidebarCollapsed: false,

    // Helpers
    setCurrentTab(tab) {
        this.currentTopTab = tab;
        this.currentSidebarSelection = null; // Reset sidebar focus
    },

    setSidebarSelection(key) {
        this.currentSidebarSelection = key;
    },

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
};
