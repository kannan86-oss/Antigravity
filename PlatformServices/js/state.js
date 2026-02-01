// --- State Management ---
const AppState = {
    currentTopTab: 'Home',
    currentSidebarSelection: null, // e.g., "SA L3 Services"
    currentSubService: null,       // e.g., "Unix L3"
    isSidebarCollapsed: false,

    // Actions
    setCurrentTab(tab) {
        this.currentTopTab = tab;
        this.currentSidebarSelection = null;
        this.currentSubService = null;
    },

    setSidebarSelection(key) {
        this.currentSidebarSelection = key;
        // Reset sub-service, App logic will default it
        this.currentSubService = null;
    },

    setSubService(key) {
        this.currentSubService = key;
    },

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
};
