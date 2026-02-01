// --- Rendering Layer ---
const Render = {
    Icons: {
        doc: '<span class="icon-doc">📄</span>',
        edit: '<span class="icon-edit">✏️</span>',
        trophy: '<span class="icon-trophy">🏆</span>',
        calendar: '<span class="icon-calendar">📅</span>',
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

        // Toggle Class
        sidebar.classList.toggle('sidebar-collapsed', AppState.isSidebarCollapsed);
    },

    renderMainContent() {
        const container = document.getElementById('main-content');
        container.innerHTML = '';

        // 1. Platform Overview
        if (AppState.currentTopTab === 'Home' && !AppState.currentSidebarSelection) {
            this.renderPlatformOverview(container);
            return;
        }

        // 2. Service View (Sub-Level)
        if (AppState.currentTopTab === 'Home' && AppState.currentSidebarSelection) {
            this.renderServiceView(container);
            return;
        }

        // 3. Other Tabs
        container.innerHTML = `<div style="padding:2rem;"><h2>${AppState.currentTopTab}</h2><p>Placeholder.</p></div>`;
    },

    renderPlatformOverview(container) {
        const wrapper = this.createWrapper();

        const header = document.createElement('div');
        header.className = 'content-header';
        header.innerHTML = `
            <h1>Platform Services Overview</h1>
            <p>Welcome to the central hub.</p>
        `;
        wrapper.appendChild(header);

        this.renderDashboard(wrapper, ServiceData.Overview);
        container.appendChild(wrapper);
    },

    renderServiceView(container) {
        const category = AppState.currentSidebarSelection;
        const subService = AppState.currentSubService;
        const groupData = ServiceData.Services[category];
        const data = groupData[subService];

        const wrapper = this.createWrapper();

        // Title Area
        const header = document.createElement('div');
        header.className = 'service-header'; // New class for spacing
        header.innerHTML = `
            <div style="font-size:0.8rem; color:var(--accent-color); margin-bottom:0.25rem;">${category.toUpperCase()}</div>
            <h1>Home - ${subService}</h1>
        `;
        wrapper.appendChild(header);

        // Sub-Nav Pills
        const pills = document.createElement('div');
        pills.className = 'sub-nav-pills';
        Object.keys(groupData).forEach(key => {
            const pill = document.createElement('button');
            pill.className = `pill ${key === subService ? 'active' : ''}`;
            pill.textContent = key;
            pill.onclick = () => App.switchSubService(key);
            pills.appendChild(pill);
        });
        wrapper.appendChild(pills);

        // Sub-Title
        const subTitle = document.createElement('div');
        subTitle.innerHTML = `
            <h3 style="margin-top:2rem; margin-bottom:0.5rem; color:#fff;">Service Overview</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1rem;">Key metrics and service description</p>
        `;
        wrapper.appendChild(subTitle);

        // Dashboard
        if (data) {
            this.renderDashboard(wrapper, data);
        }

        container.appendChild(wrapper);
    },

    renderDashboard(container, data) {
        const grid = document.createElement('div');
        grid.className = 'dashboard-grid';

        // About Card
        const aboutCard = this.createCard('about', 'About the Service', this.Icons.doc, true);
        const editBtn = document.createElement('button'); // Add edit icon
        editBtn.className = 'icon-btn';
        editBtn.innerHTML = this.Icons.edit;
        aboutCard.querySelector('.card-header').appendChild(editBtn);

        const desc = document.createElement('div');
        desc.className = 'editable-text';
        desc.contentEditable = true;
        desc.innerText = data.description || '';
        desc.onblur = (e) => data.description = e.target.innerText;
        aboutCard.appendChild(desc);
        grid.appendChild(aboutCard);

        // Achievements
        const achCard = this.createCard('achievements', 'Recent Achievements', this.Icons.trophy);
        this.renderAchievementsList(achCard, data.achievements || []);
        this.renderRichInput(achCard, (text) => {
            const date = new Date().toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            if (!data.achievements) data.achievements = [];
            data.achievements.push({ text, date, status: 'ok' });
            this.renderAchievementsList(achCard, data.achievements);
        });
        grid.appendChild(achCard);

        // Events
        const evtCard = this.createCard('events', 'Upcoming Events', this.Icons.calendar);
        this.renderEventsList(evtCard, data.events || []);
        this.renderRichInput(evtCard, (text) => {
            if (!data.events) data.events = [];
            data.events.push(text);
            this.renderEventsList(evtCard, data.events);
        });
        grid.appendChild(evtCard);

        container.appendChild(grid);
    },

    // --- Helpers ---
    createWrapper() {
        const div = document.createElement('div');
        div.className = 'data-container';
        return div;
    },

    createCard(id, title, icon, fullWidth = false) {
        const card = document.createElement('div');
        card.className = `dashboard-card ${fullWidth ? 'full-width' : ''}`;
        card.innerHTML = `<div class="card-header"><h3>${icon} ${title}</h3></div>`;
        return card;
    },

    renderAchievementsList(card, list) {
        let ul = card.querySelector('ul') || document.createElement('ul');
        if (!ul.parentNode) {
            ul.className = 'item-list';
            card.insertBefore(ul, card.querySelector('.input-area'));
        }
        ul.innerHTML = '';
        list.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                 <div class="ach-item">
                    <span class="check">✓</span>
                    <div class="ach-content">
                        <div class="ach-text">${item.text}</div>
                        <div class="ach-date">${item.date}</div>
                    </div>
                </div>`;
            ul.appendChild(li);
        });
    },

    renderEventsList(card, list) {
        let ul = card.querySelector('ul') || document.createElement('ul');
        if (!ul.parentNode) {
            ul.className = 'item-list';
            card.insertBefore(ul, card.querySelector('.input-area'));
        }
        ul.innerHTML = '';
        list.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<div class="evt-item"><span class="bullet">•</span><span>${item}</span></div>`;
            ul.appendChild(li);
        });
    },

    renderRichInput(card, onAdd) {
        if (card.querySelector('.input-area')) return;
        const area = document.createElement('div');
        area.className = 'input-area';
        area.innerHTML = `
            <div class="rich-toolbar">
                <button title="Bold">B</button>
                <button title="Italic"><i>I</i></button>
                <button title="Underline"><u>U</u></button>
            </div>
            <div class="input-row">
                <input type="text" placeholder="Add entry...">
                <button class="add-btn">+</button>
            </div>
        `;
        const inp = area.querySelector('input');
        area.querySelector('.add-btn').onclick = () => {
            if (inp.value.trim()) { onAdd(inp.value.trim()); inp.value = ''; }
        };
        card.appendChild(area);
    }
};
