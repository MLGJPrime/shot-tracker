// script.js

function addRow() {
    const tbody = document.getElementById('shotTableBody');
    const row = document.createElement('tr');
  
    row.classList.add('opacity-0'); // Start transparent
    row.innerHTML = `
      <td class="p-3">
        <select class="w-full bg-gray-50 border rounded-lg p-2 shadow-sm">
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
      <td class="p-3">
        <select class="w-full bg-gray-50 border rounded-lg p-2 shadow-sm">
          <option>Under Basket</option>
          <option>Left Block</option>
          <option>Left Elbow</option>
          <option>Free Throw</option>
          <option>Right Elbow</option>
          <option>Right Block</option>
          <option>Left Short Corner</option>
          <option>Right Short Corner</option>
          <option>Left Short Wing</option>
          <option>Right Short Wing</option>
          <option>Top of Key</option>
          <option>Left Corner 3</option>
          <option>Right Corner 3</option>
          <option>Left Wing 3</option>
          <option>Right Wing 3</option>
          <option>Downtown 3</option>
        </select>
      </td>
      <td class="p-3 text-center">
        <input type="number" class="w-20 text-center bg-gray-50 border rounded-lg p-2 shadow-sm" min="0" />
      </td>
      <td class="p-3 text-center">
        <input type="number" class="w-20 text-center bg-gray-50 border rounded-lg p-2 shadow-sm" min="0" />
      </td>
      <td class="p-3 text-center">
        <button onclick="this.closest('tr').remove()" class="text-red-500 hover:text-red-600 font-medium">Remove</button>
      </td>
    `;
  
    tbody.appendChild(row);
    setTimeout(() => {
      row.classList.remove('opacity-0');
      row.classList.add('transition-opacity', 'duration-300', 'opacity-100');
    }, 10); // slight delay to trigger transition
  }
  