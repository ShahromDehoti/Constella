async function fetchMetrics() {
    const res = await fetch('/api/metrics');
    const data = await res.json();
  
    // Populate network metrics
    const networkEl = document.getElementById('network-metrics');
    networkEl.innerHTML = '';
    for (const [key, value] of Object.entries(data.network)) {
      const item = document.createElement('li');
      item.textContent = `${key.replace(/_/g, ' ')}: ${value}`;
      networkEl.appendChild(item);
    }
  
    // Populate satellite table
    const satTableBody = document.querySelector('#satellite-table tbody');
    satTableBody.innerHTML = '';
    data.satellites.forEach(sat => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${sat.id}</td>
        <td>${sat.status}</td>
        <td>${sat.lat}</td>
        <td>${sat.lng}</td>
        <td>${sat.altitude_km}</td>
        <td>${sat.speed_kmps}</td>
      `;
      satTableBody.appendChild(row);
    });
  
    // Populate alerts
    const alertsEl = document.getElementById('alerts');
    alertsEl.innerHTML = '';
    data.alerts.forEach(alert => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>[${alert.severity}]</strong> ${alert.type}: ${alert.message} <em>(${new Date(alert.timestamp).toLocaleString()})</em>`;
      alertsEl.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', fetchMetrics);
  