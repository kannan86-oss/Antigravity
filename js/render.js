import { Store } from './store.js';

export const Render = {
    // --- Top Navigation ---
    renderTopNav(keys, onSelect) {
        const topNav = document.getElementById('top-nav');
        topNav.innerHTML = '';
        keys.forEach(key => {
            const el = document.createElement('div');
            el.className = 'nav-item';
            el.textContent = key;
            el.onclick = () => onSelect(key);
            if (key === Store.currentTopTab) el.classList.add('active');
            topNav.appendChild(el);
        });
    },

    // --- Sidebar ---
    renderSidebar(keys, onSelect) {
        const sidebarContent = document.getElementById('sidebar-content');
        sidebarContent.innerHTML = '';

        if (keys.length === 0) {
            sidebarContent.innerHTML = '<div style="padding:1rem; color: #94a3b8;">No services available.</div>';
            return;
        }

        keys.forEach(key => {
            const el = document.createElement('div');
            el.className = 'sidebar-item';
            el.textContent = key;
            el.onclick = () => onSelect(key);
            if (key === Store.currentSidebarTab) el.classList.add('active');
            sidebarContent.appendChild(el);
        });
    },

    // --- Sub Tabs ---
    renderSubTabs(keys, onSelect) {
        const subTabsContainer = document.getElementById('sub-tabs');
        subTabsContainer.innerHTML = '';

        keys.forEach(key => {
            const el = document.createElement('div');
            el.className = 'sub-tab';
            el.textContent = key;
            el.onclick = () => onSelect(key);
            if (key === Store.currentSubTab) el.classList.add('active');
            subTabsContainer.appendChild(el);
        });
    },

    // --- Data View ---
    renderDataView(title, data) {
        const viewTitle = document.getElementById('view-title');
        const viewSubtitle = document.getElementById('view-subtitle');
        const managerGrid = document.getElementById('manager-grid');

        // Update Title/Subtitle
        viewTitle.textContent = title;
        viewSubtitle.textContent = data.description || `Details for ${title}`;

        // Managers
        const leadershipSection = document.getElementById('leadership-section');

        if (Store.currentTopTab === 'Team details') {
            leadershipSection.style.display = 'block';
            managerGrid.innerHTML = '';
            if (data.managers) {
                ['l1', 'l2', 'l3'].forEach(level => {
                    if (data.managers[level]) {
                        const card = document.createElement('div');
                        card.className = 'manager-card';
                        card.innerHTML = `
                            <small>${level.toUpperCase()} Manager</small>
                            <h4>${data.managers[level]}</h4>
                            <div style="margin-top:0.5rem; font-size:0.8rem; opacity:0.7;">Global Lead</div>
                            <div class="card-action"><button class="icon-btn">✏️</button></div>
                        `;
                        managerGrid.appendChild(card);
                    }
                });
            }
        } else {
            leadershipSection.style.display = 'none';
        }
    },

    // --- Table Rendering (With scroll and dynamic columns) ---
    renderTable(employees) {
        const tableContainer = document.querySelector('.table-container');
        const tableBody = document.getElementById('employee-table-body');
        const tableHead = document.querySelector('thead tr');

        tableBody.innerHTML = '';
        tableHead.innerHTML = ''; // Reset headers

        if (!employees || employees.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem;">No data available</td></tr>';
            return;
        }

        // Generate headers dynamically based on the first object keys
        const headers = Object.keys(employees[0]);
        headers.forEach(h => {
            const th = document.createElement('th');
            th.textContent = h.toUpperCase();
            tableHead.appendChild(th);
        });

        employees.forEach(emp => {
            const tr = document.createElement('tr');
            headers.forEach(h => {
                const td = document.createElement('td');
                if (h.toLowerCase() === 'status') {
                    // Status Badge Logic
                    const status = emp[h];
                    const color = status.toLowerCase() === 'active' ? 'var(--accent-color)' : '#f59e0b';
                    td.innerHTML = `<span style="padding: 2px 8px; border-radius: 10px; background: rgba(255, 255, 255, 0.1); color: ${color}; font-size: 0.8rem; border: 1px solid ${color}">${status}</span>`;
                } else {
                    td.textContent = emp[h];
                }
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });

        // Update member count
        const countSpan = document.getElementById('member-count');
        if (countSpan) countSpan.textContent = `${employees.length} Members`;
    },

    toggleSettingsModal(show) {
        const modal = document.getElementById('settings-modal');
        if (show) {
            modal.style.display = 'flex';
        } else {
            modal.style.display = 'none';
        }
    }
};
