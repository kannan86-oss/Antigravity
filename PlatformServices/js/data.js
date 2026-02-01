// --- Data Layer ---
const TopNavItems = [
    "Home", "Team details", "SOW", "Shift Tracker", "Leave Tracker",
    "MOR Report", "Escalation", "NEMS", "Training", "Certification",
    "Audit", "Reports"
];

// Content Helpers
const createAchievement = (text, date, isOk = true) => ({ text, date, status: isOk ? 'ok' : 'pending' });

const ServiceData = {
    Overview: {
        description: "Advanced Windows Server troubleshooting, Active Directory architecture management, and high-availability clustering support.",
        achievements: [
            createAchievement("Migrated 500 servers to Azure Hybrid", "8/10/2023 at 05:30 PM"),
            createAchievement("Reduced login latency by 40%", "9/1/2023 at 02:00 PM")
        ],
        events: [
            "Windows Server 2025 Preview",
            "Security Compliance Workshop"
        ]
    },

    Services: {
        "SA L3 Services": {
            "Unix L3": {
                description: "Deep dive diagnostics, kernel tuning, and root cause analysis for mission-critical Unix environments across the enterprise.",
                achievements: [
                    createAchievement("99.99% Uptime in Q3", "10/1/2023 at 03:30 PM"),
                    createAchievement("Automated Patching Pipeline deployed", "9/15/2023 at 09:00 PM"),
                    createAchievement("Zero Severity 1 incidents in October", "11/1/2023 at 02:30 PM")
                ],
                events: [
                    "RedHat 9 Upgrade Training",
                    "Global Unix Townhall"
                ]
            },
            "Wintel L3": {
                description: "Expert-level Windows Server administration, including failover clustering, Active Directory federation, and complex group policy management.",
                achievements: [
                    createAchievement("Decommissioned Legacy 2008 Servers", "8/20/2023 at 10:00 AM"),
                    createAchievement("Implemented LAPS globally", "9/05/2023 at 11:30 AM")
                ],
                events: [
                    "Azure Stack HCI Demo",
                    "PowerShell Summit Recap"
                ]
            }
        },
        "Platform L2 Services": {
            "Unix L2": {
                description: "Standard Unix server maintenance, user management, and filesystem expansion request handling.",
                achievements: [
                    createAchievement("Resolved 500+ tickets in August", "9/01/2023 at 09:00 AM")
                ],
                events: ["L2 Shift Handoff Meeting"]
            },
            "Wintel L2": {
                description: "Routine Windows server operations, patching execution, and basic alert remediation.",
                achievements: [
                    createAchievement("Patch cycle completion 100%", "9/15/2023 at 06:00 AM")
                ],
                events: ["Monthly Patch Review"]
            }
        },
        "Build & Delivery": {
            "APAC Build": {
                description: "Server provisioning and image management for the Asia-Pacific region.",
                achievements: [],
                events: []
            },
            "NAM Build": {
                description: "Server provisioning and image management for North America.",
                achievements: [],
                events: []
            }
        },
        "Virtualization Services": {
            "VM Guest Services": {
                description: "Management of virtual machine resources, snapshots, and performance tuning.",
                achievements: [
                    createAchievement("Reclaimed 50TB storage", "8/25/2023 at 04:00 PM")
                ],
                events: ["VMware Aria Operations Training"]
            },
            "CAS Services": {
                description: "Container Assessment and Strategy services.",
                achievements: [],
                events: []
            }
        }
    }
};
