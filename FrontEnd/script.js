document.addEventListener('DOMContentLoaded', () => {
  fetchReminders();
});

// Método que busca as listas no banco de dados e atualiza.
async function fetchReminders() {
  const apiEndpoint = 'http://localhost:8080/lembretes';

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayReminders(data);
  } catch (error) {
    console.error('Erro ao buscar lembretes:', error);
  }
}

// Método que mostra os elementos na tela.
function displayReminders(reminders) {
  const reminderList = document.getElementById('reminderList');
  reminderList.innerHTML = ''; // Limpa a lista existente.

  const remindersByDate = groupRemindersByDate(reminders);

  // Ordena as datas.
  Object.keys(remindersByDate).sort().forEach(date => {
    const dateSection = document.createElement('div');
    dateSection.classList.add('date-section');
    dateSection.dataset.date = date; // Adicione um data attribute para identificar a seção da data.
    dateSection.innerHTML = `<h4>${date}</h4>`;

    const remindersForDate = document.createElement('ul');
    remindersForDate.classList.add('reminders-for-date');

    remindersByDate[date].forEach(reminder => {
      const reminderItem = document.createElement('li');
      reminderItem.classList.add('reminder');
      reminderItem.innerHTML = `
        <span>${reminder.nome}</span>
        <button class="delete-btn" onclick="deleteReminder(this, ${reminder.id})">x</button>
      `;
      remindersForDate.appendChild(reminderItem);
    });

    dateSection.appendChild(remindersForDate);
    reminderList.appendChild(dateSection);
  });
}


function groupRemindersByDate(reminders) {
  const remindersByDate = {};

  reminders.forEach(reminder => {
    const formattedDate = formatDate(reminder.data);
    if (!remindersByDate[formattedDate]) {
      remindersByDate[formattedDate] = [];
    }
    remindersByDate[formattedDate].push(reminder);
  });

  return remindersByDate;
}

// Formata a data para o formato adequado.
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
  const date = new Date(year, month - 1, day);
  date.setHours(12);
  return date.toLocaleDateString();
}

// Função 
function deleteReminder(button, id) {
  deleteReminderFromApi(id);

  const reminderItem = button.closest('.reminder');
  const remindersForDate = reminderItem.closest('.reminders-for-date');
  reminderItem.remove();

  // Se não há mais lembretes para essa data, remover a seção inteira da data
  if (remindersForDate.children.length === 0) {
    remindersForDate.closest('.date-section').remove();
  }
}

async function deleteReminderFromApi(id) {
  const apiEndpoint = `http://localhost:8080/lembretes/${id}`;

  try {
    const response = await fetch(apiEndpoint, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Lembrete excluído com sucesso:', id);
  } catch (error) {
    console.error('Erro ao excluir lembrete:', error);
  }
}

async function addReminder() {
  const name = document.getElementById('reminderName').value;
  const date = document.getElementById('reminderDate').value;
  const today = new Date();
  const reminderDate = new Date(date);

  if (!name || !date) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (reminderDate < today) {
    alert('A data deve estar no futuro.');
    return;
  }

  try {
    const newReminder = await sendReminderToApi(name, date);
    document.getElementById('reminderName').value = ''; // Limpa o input.
    document.getElementById('reminderDate').value = ''; // Limpa o input.
    fetchReminders(); // Atualiza a lista.
  } catch (error) {
    console.error('Erro ao enviar lembrete:', error);
  }
}

async function sendReminderToApi(name, date) {
  const apiEndpoint = 'http://localhost:8080/lembretes';
  const formattedDate = new Date(date).toISOString().split('T')[0];
  const reminderData = {
    nome: name,
    data: formattedDate
  };

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reminderData)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
  }

  return response.json();
}
