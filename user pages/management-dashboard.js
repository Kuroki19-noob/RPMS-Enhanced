/* Small, front-end-only interactions for management dashboards. */
document.addEventListener('DOMContentLoaded', () => {
  const landlordRows = document.getElementById('landlordListings');
  const updateLandlordCounts = () => {
    if (!landlordRows) return;
    const rows = [...landlordRows.querySelectorAll('tr')];
    const available = rows.filter(row => row.dataset.status === 'Available').length;
    const total = document.getElementById('totalListings');
    const availableEl = document.getElementById('availableListings');
    if (total) total.textContent = rows.length;
    if (availableEl) availableEl.textContent = available;
  };
  
  document.getElementById('jumpAdd')?.addEventListener('click', () => document.getElementById('addListing')?.scrollIntoView({behavior:'smooth'}));
  landlordRows?.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const row = button.closest('tr');
    if (button.dataset.action === 'toggle') {
      const next = row.dataset.status === 'Available' ? 'Occupied' : 'Available';
      row.dataset.status = next;
      row.cells[2].innerHTML = `<span class="status-pill ${next === 'Available' ? 'available' : ''}">${next}</span>`;
      button.textContent = next === 'Available' ? 'Mark occupied' : 'Mark available';
      updateLandlordCounts();
    } else if (button.dataset.action === 'panorama') {
      const path = prompt('Enter the relative path to a valid 360-degree panorama image. Example: ../Assets/panoramas/unit-1.jpg');
      if (path && path.trim()) row.cells[3].textContent = path.trim();
      else if (path !== null) alert('No panorama path entered.');
    }
  });

  document.getElementById('addApartmentForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const rent = Number(data.get('rent'));
    if (!name || !Number.isFinite(rent) || rent <= 0) { alert('Enter an apartment name and a valid monthly rent.'); return; }
    const status = String(data.get('status') || 'Available');
    const row = document.createElement('tr');
    row.dataset.status = status;
    const values = [name, `₱${rent.toLocaleString('en-PH')}`, status, String(data.get('panorama') || '').trim() || 'Not added'];
    values.forEach(value => { const cell = document.createElement('td'); cell.textContent = value; if (value === status) { const pill = document.createElement('span'); pill.className = `status-pill ${status === 'Available' ? 'available' : ''}`; pill.textContent = status; cell.replaceChildren(pill); } row.appendChild(cell); });
    const actions = document.createElement('td'); actions.innerHTML = '<div class="management-actions"><button data-action="toggle">Mark occupied</button><button data-action="panorama">Set panorama</button></div>'; row.appendChild(actions);
    landlordRows?.appendChild(row); form.reset(); updateLandlordCounts(); alert('Demo listing added to this page only.');
  });

  document.getElementById('landlordRequests')?.addEventListener('click', event => {
    const button = event.target.closest('button[data-request]'); if (!button) return;
    const cell = button.closest('td'); const status = button.dataset.request === 'approve' ? 'Approved' : 'Rejected';
    cell.querySelector('.status-pill').className = `status-pill ${status.toLowerCase()}`; cell.querySelector('.status-pill').textContent = status;
    cell.querySelector('.management-actions')?.remove();
    const pending = document.querySelectorAll('#landlordRequests .status-pill.pending').length;
    const pendingEl = document.getElementById('pendingRequests'); if (pendingEl) pendingEl.textContent = pending;
  });

  const adminUsers = document.getElementById('adminUsers');
  adminUsers?.addEventListener('click', event => {
    const button = event.target.closest('button[data-user-action]'); if (!button) return;
    const row = button.closest('tr'); const active = button.dataset.userAction === 'activate';
    row.cells[3].innerHTML = `<span class="status-pill ${active ? 'active' : 'inactive'}">${active ? 'Active' : 'Inactive'}</span>`;
    button.dataset.userAction = active ? 'deactivate' : 'activate'; button.textContent = active ? 'Deactivate' : 'Activate';
  });

  document.getElementById('userSearch')?.addEventListener('input', event => {
    const term = event.target.value.toLowerCase();
    adminUsers?.querySelectorAll('tr').forEach(row => row.hidden = !row.textContent.toLowerCase().includes(term));
  });

  const adminListings = document.getElementById('adminListings');
  const updateAdminPending = () => {
    if (!adminListings) return;
    const pending = adminListings.querySelectorAll('.status-pill.pending').length;
    const count = document.getElementById('pendingReviewCount'); if (count) count.textContent = pending;
  };

  adminListings?.addEventListener('click', event => {
    const button = event.target.closest('button[data-listing-action]'); if (!button) return;
    const row = button.closest('tr'); const action = button.dataset.listingAction;
    const status = action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Pending';
    row.cells[3].innerHTML = `<span class="status-pill ${status.toLowerCase()}">${status}</span>`;
    const actions = row.querySelector('.management-actions');
    if (actions) actions.innerHTML = '<button data-listing-action="review">Mark pending</button>';
    updateAdminPending();
  });
  updateLandlordCounts(); updateAdminPending();
});
