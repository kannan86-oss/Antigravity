// --- Rendering Layer ---
// Depends on: ServiceData, AppState

const Render = {
    // Icons
    Icons: {
        doc: '<span class="icon-doc">📄</span>',
        edit: '<span class="icon-edit">✏️</span>',
        trophy: '<span class="icon-trophy">🏆</span>',
        calendar: '<span class="icon-calendar">📅</span>',
        add: '+'
    },

    init() {
        this.renderTopNav();
        this.renderSidebar();
        this.renderMainContent();
    },

    renderTopNav() {
        const nav = document.getElementById('top-nav');
        if (!nav) return;
        nav.innerHTML = '';
        TopNavItems.forEach(key => {
            const el = document.createElement('div');
            el.className = 'nav-item';
            el.textContent = key;
            if (key === AppState.currentTopTab) el.classList.add('active');
            el.onclick = () => App.switchTopTab(key);
            nav.appendChild(el);
        });
    },

    renderSidebar() {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('sidebar-content');
        if (!content) return;
        content.innerHTML = '';

        // Only show Service Directory if on Home (or we could show it always?)
        // Prompt implies Sidebar Items are: SA L3, Platform L2... 
        // These are strictly part of the "Service Directory".

        // We will render these groups.
        const groups = Object.keys(ServiceData.Services);

        groups.forEach(key => {
            const item = document.createElement('div');
            item.className = 'sidebar-item';

            // Icon logic
            let iconChar = '📁';
            if (key.includes('L3')) iconChar = '🛠️';
            if (key.includes('L2')) iconChar = '⚙️';
            if (key.includes('Build')) iconChar = '🏗️';
            if (key.includes('Virtualization')) iconChar = '☁️';

            item.innerHTML = `
                <span class="icon">${iconChar}</span>
                <span class="text">${key}</span>
            `;

            if (AppState.currentSidebarSelection === key) item.classList.add('active');

            item.onclick = () => App.selectSidebarItem(key);
            content.appendChild(item);
        });

        // Handle Collapse Class
        if (AppState.isSidebarCollapsed) {
            sidebar.classList.add('sidebar-collapsed');
        } else {
            sidebar.classList.remove('sidebar-collapsed');
        }
    },

    renderMainContent() {
        const container = document.getElementById('main-content');
        container.innerHTML = '';

        // 1. Home -> Overview (Default)
        if (AppState.currentTopTab === 'Home' && !AppState.currentSidebarSelection) {
            this.renderPlatformOverview(container);
            return;
        }

        // 2. Home -> Service Group selected
        if (AppState.currentTopTab === 'Home' && AppState.currentSidebarSelection) {
            this.renderServiceGroup(container, AppState.currentSidebarSelection);
            return;
        }

        // 3. Other Tabs
        container.innerHTML = `<div style="padding:2rem;"><h2>${AppState.currentTopTab}</h2><p>Placeholder content.</p></div>`;
    },

    renderPlatformOverview(container) {
        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'data-container';

        // Header
        const header = document.createElement('div');
        header.className = 'content-header';
        header.innerHTML = `
            <h1>Platform Services Overview</h1>
            <p>Welcome to the central hub.</p>
        `;
        wrapper.appendChild(header);

        // Grid
        const grid = document.createElement('div');
        grid.className = 'dashboard-grid';

        // Card 1: About (Full Width)
        const aboutData = ServiceData.Overview;
        const aboutCard = this.createCard('about', 'About the Service', this.Icons.doc, true);

        // Edit Button in Header
        const editBtn = document.createElement('button');
        editBtn.className = 'icon-btn';
        editBtn.innerHTML = this.Icons.edit;
        editBtn.title = "Edit Description";
        aboutCard.querySelector('.card-header').appendChild(editBtn);

        // Content
        const descDiv = document.createElement('div');
        descDiv.className = 'editable-text';
        descDiv.contentEditable = true;
        descDiv.innerText = aboutData.description;
        descDiv.onblur = (e) => aboutData.description = e.target.innerText;
        aboutCard.appendChild(descDiv);

        grid.appendChild(aboutCard);

        // Card 2: Achievements
        const achCard = this.createCard('achievements', 'Recent Achievements', this.Icons.trophy);
        this.renderAchievementsList(achCard, aboutData.achievements);
        this.renderRichInput(achCard, (text) => {
            const date = new Date().toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            aboutData.achievements.push({ text, date });
            this.renderAchievementsList(achCard, aboutData.achievements);
        });
        grid.appendChild(achCard);

        // Card 3: Events
        const evtCard = this.createCard('events', 'Upcoming Events', this.Icons.calendar);
        this.renderEventsList(evtCard, aboutData.events);
        this.renderRichInput(evtCard, (text) => {
            aboutData.events.push(text);
            this.renderEventsList(evtCard, aboutData.events);
        });
        grid.appendChild(evtCard);

        wrapper.appendChild(grid);
        container.appendChild(wrapper);
    },

    renderServiceGroup(container, groupKey) {
        const groupData = ServiceData.Services[groupKey];
        if (!groupData) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'data-container';

        wrapper.innerHTML = `<h2 class="section-title">${groupKey}</h2>`;

        // Render Sub-Services as simple cards for now? 
        // Or reuse the dashboard logic for the FIRST sub-service?
        // Prompt said: "load the specific service details"
        // Let's list them first.
        const list = document.createElement('div');

        Object.keys(groupData).forEach(subKey => {
            const div = document.createElement('div');
            div.style.marginBottom = '2rem';
            div.innerHTML = `<h3>${subKey}</h3>`;

            // Just show description for now to verify
            const d = groupData[subKey];
            div.innerHTML += `<p>${d.description}</p>`;
            list.appendChild(div);
        });

        wrapper.appendChild(list);
        container.appendChild(wrapper);
    },

    // --- Components ---

    createCard(id, title, icon, fullWidth = false) {
        const card = document.createElement('div');
        card.className = `dashboard-card ${fullWidth ? 'full-width' : ''}`;
        card.innerHTML = `
            <div class="card-header">
                <h3>${icon} ${title}</h3>
            </div>
        `;
        return card;
    },

    renderAchievementsList(card, data) {
        let ul = card.querySelector('ul');
        if (!ul) {
            ul = document.createElement('ul');
            ul.className = 'item-list';
            // Insert after header
            card.insertBefore(ul, card.querySelector('.input-area') || null);
        }
        ul.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="ach-item">
                    <span class="check">✓</span>
                    <div class="ach-content">
                        <div class="ach-text">${item.text}</div>
                        <div class="ach-date">${item.date}</div>
                    </div>
                </div>
            `;
            ul.appendChild(li);
        });
    },

    renderEventsList(card, data) {
        let ul = card.querySelector('ul');
        if (!ul) {
            ul = document.createElement('ul');
            ul.className = 'item-list';
            card.insertBefore(ul, card.querySelector('.input-area') || null);
        }
        ul.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="evt-item">
                    <span class="bullet">•</span>
                    <span>${item}</span>
                </div>
            `;
            ul.appendChild(li);
        });
    },

    renderRichInput(card, onAdd) {
        let container = card.querySelector('.input-area');
        if (container) return; // Already exists

        container = document.createElement('div');
        container.className = 'input-area';

        container.innerHTML = `
            <div class="rich-toolbar">
                <button title="Bold"><b>B</b></button>
                <button title="Italic"><i>I</i></button>
                <button title="Underline"><u>U</u></button>
            </div>
            <div class="input-row">
                <input type="text" placeholder="Add entry...">
                <button class="add-btn">+</button>
            </div>
        `;

        const input = container.querySelector('input');
        const btn = container.querySelector('.add-btn');

        btn.onclick = () => {
            if (input.value.trim()) {
                onAdd(input.value.trim());
                input.value = '';
            }
        };

        card.appendChild(container);
    }
};
