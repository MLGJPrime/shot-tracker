// script.js

function addRow() {
  const tbody = document.getElementById('shotTableBody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td class="p-2">
      <select class="w-full bg-gray-50 border rounded p-1">
        <option>Standing Shot</option>
        <option>Moving Shot</option>
        <option>Floater</option>
        <option>Backstep Shot</option>
        <option>Fadeaway</option>
        <option>Catch and Shoot</option>
        <option>Stepback</option>
        <option>Hook Shot</option>
        <option>Layup</option>
      </select>
    </td>
    <td class="p-2">
      <select class="zone w-full bg-gray-50 border rounded p-1">
  <option value="zone-left-elbow">Left Elbow</option>
  <option value="zone-right-elbow">Right Elbow</option>
  <option value="zone-left-post">Left Post</option>
  <option value="zone-right-post">Right Post</option>
  <option value="zone-free-throw">Free Throw</option>
  <option value="zone-top-key">Top of Key</option>
  <option value="zone-left-short-corner">Left Short Corner</option>
  <option value="zone-right-short-corner">Right Short Corner</option>
  <option value="left-short-wing">Left Short Wing</option>
  <option value="right-short-wing">Right Short Wing</option>
  <option value="zone-downtown">Downtown</option>
  <option value="zone-left-corner">Left Corner</option>
  <option value="zone-right-corner">Right Corner</option>
  <option value="left-wing">Left Wing</option>
  <option value="right-short-wing">Right Wing</option>
</select>
    </td>
    <td class="p-2 text-center">
      <input type="number" class="made w-16 text-center bg-gray-50 border rounded p-1" min="0" oninput="calculateFG()" />
    </td>
    <td class="p-2 text-center">
      <input type="number" class="attempted w-16 text-center bg-gray-50 border rounded p-1" min="0" oninput="calculateFG()" />
    </td>
    <td class="p-2 text-center">
      <button onclick="this.closest('tr').remove(); calculateFG();" class="text-red-500 hover:underline">Remove</button>
    </td>
  `;

  tbody.appendChild(row);
}

function calculateFG() {
  const rows = document.querySelectorAll('#shotTableBody tr');
  const zoneStats = {};

  rows.forEach(row => {
    const zone = row.querySelector('select.zone')?.value;
    const made = parseInt(row.querySelector('input.made')?.value) || 0;
    const attempted = parseInt(row.querySelector('input.attempted')?.value) || 0;

    if (!zone) return;

    if (!zoneStats[zone]) {
      zoneStats[zone] = { made: 0, attempted: 0 };
    }

    zoneStats[zone].made += made;
    zoneStats[zone].attempted += attempted;
  });

  for (const zone in zoneStats) {
    const data = zoneStats[zone];
    const fg = data.attempted > 0 ? data.made / data.attempted : 0;

    // Convert FG% to color (blue = cold, red = hot)
    const color = fgToColor(fg);
    const zoneEl = document.getElementById(zone);
    if (zoneEl) {
      zoneEl.setAttribute('fill', color);
    }
  }
}

function fgToColor(fg) {
  let r = 0, g = 0, b = 0;
  if (fg <= 0.25) {
    // Blue to green
    const t = fg / 0.25;
    r = Math.round(96 + (16 * t));
    g = Math.round(165 + (90 * t));
    b = Math.round(250 - (90 * t));
  } else if (fg <= 0.5) {
    // Green to yellow
    const t = (fg - 0.25) / 0.25;
    r = Math.round(112 + (138 * t));
    g = Math.round(255 - (65 * t));
    b = Math.round(160 - (160 * t));
  } else if (fg <= 0.75) {
    // Yellow to orange
    const t = (fg - 0.5) / 0.25;
    r = 250;
    g = Math.round(190 - (120 * t));
    b = 0;
  } else {
    // Orange to red
    const t = (fg - 0.75) / 0.25;
    r = 250;
    g = Math.round(70 - (70 * t));
    b = 0;
  }
  return `rgba(${r},${g},${b},0.6)`;

}
