// --- Data Layer ---
const TopNavItems = [
    "Home", "Team details", "SOW", "Shift Tracker", "Leave Tracker",
    "MOR Report", "Escalation", "NEMS", "Training", "Certification",
    "Audit", "Reports"
];

const emptyService = () => ({
    description: "Click to edit description...",
    achievements: [],
    events: []
});

// Helper to create basic hierarchy
const ServiceData = {
    Overview: {
        description: "Advanced Windows Server troubleshooting, Active Directory architecture management, and high-availability clustering support.",
        achievements: [
            { text: "Migrated 500 servers to Azure Hybrid", date: "8/10/2023 at 05:30 PM" },
            { text: "Reduced login latency by 40%", date: "9/1/2023 at 02:00 PM" }
        ],
        events: [
            "Windows Server 2025 Preview",
            "Security Compliance Workshop"
        ]
    },
    Services: {
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
    }
};
