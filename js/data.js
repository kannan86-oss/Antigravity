export const MOCK_DATA = {
    "Home": {
        description: "Welcome to the Home of Platform Services. Here you can find the latest updates, announcements, and general information about our platform capabilities.",
        events: [
            { title: "Platform Upgrade v2.0", date: "2023-10-15", description: "Successful rollout of the new hybrid cloud infrastructure." },
            { title: "Quarterly Town Hall", date: "2023-10-20", description: "Join us for business updates and Q&A." }
        ]
    },
    "Team details": {
        "SA L3 Services": {
            "Unix L3": {
                description: "Deep dive operational support for Enterprise Global Unix Infrastructure.",
                managers: {
                    l1: "Sarah Jenkins",
                    l2: "Mike Ross",
                    l3: "Jessica Pearson"
                },
                employees: [
                    { name: "Engineer Unix L3 1", region: "APAC", role: "Unix L3 Specialist", status: "Leave" },
                    { name: "Engineer Unix L3 2", region: "EMEA", role: "Unix L3 Specialist", status: "Active" },
                    { name: "Engineer Unix L3 3", region: "NAM", role: "Unix L3 Specialist", status: "Active" },
                    { name: "Engineer Unix L3 4", region: "APAC", role: "Unix L3 Specialist", status: "Active" },
                    { name: "Engineer Unix L3 5", region: "EMEA", role: "Unix L3 Specialist", status: "Active" }
                ]
            },
            "Wintel L3": {
                description: "Advanced Windows Server administration and critical incident management.",
                managers: { l1: "Louis Litt", l2: "Harvey Specter", l3: "Daniel Hardman" },
                employees: [
                    { name: "Donna Paulsen", region: "NAM", role: "Windows Lead", status: "Active" },
                    { name: "Rachel Zane", region: "NAM", role: "Associate", status: "Active" }
                ]
            }
        },
        "Platform L2 Services": {
            "Unix L2": {
                description: "24/7 Monitoring and L2 incident resolution for Unix environments.",
                managers: { l1: "Emily Gilmore", l2: "Richard Gilmore", l3: "Lorelai Gilmore" },
                employees: [
                    { name: "Rory Gilmore", region: "APAC", role: "L2 Analyst", status: "Active" },
                    { name: "Paris Geller", region: "EMEA", role: "Senior Analyst", status: "Active" }
                ]
            },
            "Wintel L2": {
                description: "Windows Server fleet health maintenance and patching.",
                managers: { l1: "Luke Danes", l2: "Christopher Hayden", l3: "Jason Stiles" },
                employees: [
                    { name: "Jess Mariano", region: "NAM", role: "Analyst", status: "Active" },
                    { name: "Logan Huntzberger", region: "WAM", role: "Analyst", status: "Active" }
                ]
            }
        },
        "Build & Delivery": {
            "APAC Build": {
                description: "Infrastructure provisioning and delivery for the APAC region.",
                managers: { l1: "Jim Halpert", l2: "Michael Scott", l3: "David Wallace" },
                employees: [
                    { name: "Dwight Schrute", region: "APAC", role: "Build Master", status: "Active" }
                ]
            },
            "NAM Build": {
                description: "Infrastructure provisioning and delivery for North America.",
                managers: { l1: "Pam Beesly", l2: "Jan Levinson", l3: "Ryan Howard" },
                employees: [
                    { name: "Ryan Howard", region: "NAM", role: "Builder", status: "Active" }
                ]
            }
        },
        "Virtualization Services": {
            "VM Guest Services": {
                description: "Guest OS lifecycle management on virtualized platforms.",
                managers: { l1: "Ted Mosby", l2: "Marshall Eriksen", l3: "Barney Stinson" },
                employees: [
                    { name: "Lily Aldrin", region: "Global", role: "Virtualization Eng", status: "Active" }
                ]
            },
            "CAS Services": {
                description: "Cloud Automation Services and orchestration.",
                managers: { l1: "Robin Scherbatsky", l2: "Ranject Singh", l3: "Patrice" },
                employees: [
                    { name: "Kevin", region: "Global", role: "Automation Lead", status: "Active" }
                ]
            }
        }
    },
    // Mocking other tabs with generic structure to prevent errors
    "SOW": { "General": { "Docs": { description: "Statement of Work documents repository.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "Shift Tracker": { "Rosters": { "Current Shift": { description: "Shift tracking and handover.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "Leave Tracker": { "Approvals": { "Pending": { description: "Leave requests pending approval.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "MOR Report": { "Monthly": { "Jan 2023": { description: "Monthly Operational Review.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "Escalation": { "Matrix": { "Contacts": { description: "Escalation contacts and matrix.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "NEMS": { "Alerts": { "Active": { description: "Network Event Monitoring System.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "Training": { "Courses": { "Required": { description: "Mandatory training modules.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "Certification": { "Status": { "Team": { description: "Certification tracking.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "Audit": { "Logs": { "Access": { description: "System access logs.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } },
    "Reports": { "Daily": { "Summary": { description: "Daily operational reports.", managers: { l1: "TBD", l2: "TBD", l3: "TBD" }, employees: [] } } }
};
