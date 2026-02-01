/**
 * Platform Services Portal - Single Page Application
 * No modules, no build steps. Runs directly in browser.
 */

// --- 1. Data Structure ---
const emptyService = () => ({
    description: "Click to add description...",
    achievements: [],
    events: []
});

const ServiceData = {
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
    // ... other placeholders can be empty objects
};

// --- 2. State Management ---
const AppState = {
    currentTopTab: 'Home',
    currentSidebarSelection: null,
    isSidebarCollapsed: false
};

// --- 3. DOM Elements & Helpers ---
const Elements = {
    app: document.getElementById('app'),
    sidebar: () => document.getElementById('sidebar'), // Dynamic lookup
    mainContent: () => document.getElementById('main-content'),
    topNav: () => document.getElementById('top-nav')
};

// --- 4. Rendering Logic ---

const Render = {
    init() {
        this.renderTopNav();
        this.renderSidebar();
        this.renderMainContent();
    },

    renderTopNav() {
        const nav = Elements.topNav();
        if (!nav) return;
        nav.innerHTML = '';
        Object.keys(ServiceData).forEach(key => {
            const el = document.createElement('div');
            el.className = 'nav-item';
            el.textContent = key;
            if (key === AppState.currentTopTab) el.classList.add('active');
            el.onclick = () => Actions.switchTopTab(key);
            nav.appendChild(el);
        });
    },

    renderSidebar() {
        const sidebar = Elements.sidebar();
        const content = sidebar.querySelector('.sidebar-content');
        if (!content) return;
        content.innerHTML = '';

        const data = ServiceData[AppState.currentTopTab];
        // Filter logical groups (objects)
        let keys = Object.keys(data).filter(k => typeof data[k] === 'object' && !['managers', 'employees', 'achievements', 'events'].includes(k));

        if (keys.length === 0) {
            content.innerHTML = '<div style="padding:1rem; opacity:0.7;">No directory</div>';
            return;
        }

        keys.forEach(key => {
            const item = document.createElement('div');
            item.className = 'sidebar-item';

            // Icon logic (mock)
            let iconChar = '📁';
            if (key.includes('Unix')) iconChar = '🐧';
            if (key.includes('Windows') || key.includes('Wintel')) iconChar = '🪟';
            if (key.includes('Build')) iconChar = '🏗️';

            item.innerHTML = `
                <span class="icon">${iconChar}</span>
                <span class="text">${key}</span>
            `;

            if (AppState.currentSidebarSelection === key) item.classList.add('active');

            item.onclick = () => Actions.selectService(key);
            content.appendChild(item);
        });
    },

    renderMainContent() {
        const container = Elements.mainContent();
        container.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'content-header';

        // 1. Home Dashboard View (Overview)
        if (AppState.currentTopTab === 'Home' && !AppState.currentSidebarSelection) {
            header.innerHTML = `<h2>Platform Services Overview</h2><p>Welcome to the central hub.</p>`;
            container.appendChild(header);
            this.renderDashboard(container, null); // Null means global/generic dashboard if we supported it, or empty
            return;
        }

        // 2. Specific Service View (Home -> Service)
        if (AppState.currentTopTab === 'Home' && AppState.currentSidebarSelection) {
            // Check if it's a group or leaf. Our structure is Group -> Service (e.g. SA L3 -> Unix L3)
            // But strict hierarchy in data.js is Home -> Group -> Service.
            // My sidebar render logic listed GROUPS (keys of Home).
            // So if I select "SA L3 Services", I should see its children? 
            // The previous logic allowed expanding. 
            // For this simpler SPA, let's treat the sidebar items as the selectable unit that shows a dashboard.
            // Actually, existing mock data has 'Home' -> 'SA L3' -> 'Unix L3'.
            // If sidebar shows 'SA L3', clicking it should probably show 'Unix L3', 'Wintel L3' sub-tabs or similar.
            // Simplification: Sidebar shows LEAF services if we flatten, OR we use the Sub-tab logic.
            // Let's stick to the previous 'Sub-tab' logic but simplified.

            // Let's look at data again. Home -> Group -> Leaf.
            // Sidebar renders Group.
            // So when Group is selected, we need to show Sub-tabs for Leaf.

            const groupData = ServiceData['Home'][AppState.currentSidebarSelection];
            header.innerHTML = `<h2>${AppState.currentSidebarSelection}</h2>`;
            container.appendChild(header);

            if (groupData) {
                // Sub-tabs
                const subTabs = document.createElement('div');
                subTabs.className = 'sub-tabs';
                const leaves = Object.keys(groupData);

                // Track active sub-tab in local scope or AppState?
                // For simplicity, let's default to first leaf.
                const activeLeaf = leaves[0];

                leaves.forEach(leaf => {
                    const tab = document.createElement('div');
                    tab.className = 'sub-tab';
                    tab.textContent = leaf;
                    if (leaf === activeLeaf) tab.classList.add('active'); // Static for now, or add state
                    // Click handling could refine this
                    subTabs.appendChild(tab);
                });
                container.appendChild(subTabs);

                // Dashboard for the Active Leaf
                this.renderDashboard(container, groupData[activeLeaf]);
            }
            return;
        }

        // 3. Team Details View
        if (AppState.currentTopTab === 'Team details') {
            header.innerHTML = `<h2>Team Management</h2><p>Manage roster and leadership.</p>`;
            container.appendChild(header);
            // Render existing Team logic (Leadership + Table) - Simplified for this prompt?
            // Prompt asked for "Service Directory".
            // I will put a placeholder for Team Details.
            const div = document.createElement('div');
            div.className = 'data-container';
            div.innerHTML = `<div style="padding:2rem;">Team Management Interface</div>`;
            container.appendChild(div);
        }
    },

    renderDashboard(container, data) {
        if (!data) return;

        const grid = document.createElement('div');
        grid.className = 'dashboard-grid';

        // About
        const about = document.createElement('div');
        about.className = 'dashboard-card full-width';
        about.innerHTML = `
            <div class="card-header"><h3>📃 About the Service</h3></div>
            <div class="editable-text" contenteditable="true">${data.description}</div>
        `;
        // Simple mock save
        about.querySelector('.editable-text').onblur = (e) => data.description = e.target.innerText;
        grid.appendChild(about);

        // Achievements
        this.renderListWidget(grid, '🏆 Recent Achievements', data.achievements);

        // Events
        this.renderListWidget(grid, '📅 Upcoming Events', data.events);

        container.appendChild(grid);
    },

    renderListWidget(container, title, listData) {
        const card = document.createElement('div');
        card.className = 'dashboard-card';
        card.innerHTML = `
            <div class="card-header"><h3>${title}</h3></div>
            <ul class="item-list"></ul>
            <div class="input-group">
                <input type="text" placeholder="Add new...">
                <button>+</button>
            </div>
        `;

        const ul = card.querySelector('ul');
        const renderList = () => {
            ul.innerHTML = '';
            listData.forEach((item, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${item}</span> <span style="cursor:pointer;color:red" onclick="Actions.deleteItem(this, '${title}')">×</span>`;
                // Hacky delete binding, better to use closures in real app
                li.querySelector('span:last-child').onclick = () => {
                    listData.splice(idx, 1);
                    renderList();
                };
                ul.appendChild(li);
            });
        };
        renderList();

        const btn = card.querySelector('button');
        const input = card.querySelector('input');
        btn.onclick = () => {
            if (input.value.trim()) {
                listData.push(input.value.trim());
                input.value = '';
                renderList();
            }
        };

        container.appendChild(card);
    }
};

// --- 5. Actions ---
const Actions = {
    switchTopTab(key) {
        AppState.currentTopTab = key;
        AppState.currentSidebarSelection = null; // Reset selection
        Render.init(); // Re-render all
    },

    selectService(key) {
        AppState.currentSidebarSelection = key;
        Render.renderSidebar(); // Update active state
        Render.renderMainContent(); // Show details
    },

    toggleSidebar() {
        AppState.isSidebarCollapsed = !AppState.isSidebarCollapsed;
        const app = document.getElementById('main-container');
        const sidebar = document.getElementById('sidebar');

        if (AppState.isSidebarCollapsed) {
            sidebar.classList.add('sidebar-collapsed');
            // Logic to change icon/text handled by CSS mostly
        } else {
            sidebar.classList.remove('sidebar-collapsed');
        }
    }
};

// --- 6. Initialization ---
window.onload = () => {
    // Inject Layout if empty (in case index.html is just a shell)
    // Assuming index.html has the structure.
    Render.init();
};
