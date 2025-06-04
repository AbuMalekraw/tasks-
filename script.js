const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');

function addTask() {
  const taskName = document.getElementById('taskName').value;
  const category = document.getElementById('taskCategory').value;

  if (!taskName) return;

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = () => moveToDone(li);

  li.textContent = `${taskName} [${category}] `;
  li.prepend(checkbox);
  todoList.appendChild(li);

  document.getElementById('taskName').value = '';
}

function moveToDone(taskElement) {
  taskElement.querySelector('input').remove();
  doneList.appendChild(taskElement);
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("To Do:", 10, 10);
  [...todoList.children].forEach((item, i) => {
    doc.text(`- ${item.textContent}`, 10, 20 + i * 10);
  });

  const doneOffset = 30 + todoList.children.length * 10;
  doc.text("Done:", 10, doneOffset);
  [...doneList.children].forEach((item, i) => {
    doc.text(`- ${item.textContent}`, 10, doneOffset + 10 + i * 10);
  });

  doc.save("tasks.pdf");
}
