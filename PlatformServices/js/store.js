export const Store = {
    currentTopTab: null,
    currentSidebarTab: null,
    currentSubTab: null,

    // Default User Role
    userRole: 'admin', // admin, editor, viewer

    setCurrentTopTab(val) { this.currentTopTab = val; },
    setCurrentSidebarTab(val) { this.currentSidebarTab = val; },
    setCurrentSubTab(val) { this.currentSubTab = val; }
};
