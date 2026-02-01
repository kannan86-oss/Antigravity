// Helper to create empty service structure
const emptyService = () => ({
    description: "Click to add description...",
    achievements: [],
    events: []
});

export const MOCK_DATA = {
    "Home": {
        "SA L3 Services": {
            "Unix L3": emptyService(),
            "Wintel L3": emptyService()
        },
        "Platform L2 Services": {
            "Unix L2": emptyService(),
            "Wintel L2": emptyService()
        },
        "Build & Delivery": {
            "APAC Build": emptyService(),
            "NAM Build": emptyService()
        },
        "Virtualization Services": {
            "VM Guest Services": emptyService(),
            "CAS Services": emptyService()
        }
    },
    "Team details": {
        "General Service": {
            description: "Default service placeholder.",
            managers: {},
            employees: []
        }
    },
    "SOW": {},
    "Shift Tracker": {},
    "Leave Tracker": {},
    "MOR Report": {},
    "Escalation": {},
    "NEMS": {},
    "Training": {},
    "Certification": {},
    "Audit": {},
    "Reports": {}
};
