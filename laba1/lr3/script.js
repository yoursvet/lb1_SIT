async function getResponse() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users/1/todos");
        let content = await response.json();

        let list = document.querySelector(".data");
        let data = content.map(task => ({
            userId: task.userId,
            title: task.title,
            completed: task.completed ? 'Завершено' : 'В процессе'
        }));

        // Initial render of the table
        renderTable(data);

        // Adding event listeners to table headers
        document.querySelectorAll("th").forEach((header, index) => {
            header.addEventListener("click", () => sortTable(data, index));
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function renderTable(data) {
    let list = document.querySelector(".data");
    list.innerHTML = data.map(task => `
        <tr class="data">
            <td>${task.userId}</td>
            <td>${task.title}</td>
            <td>${task.completed}</td>
        </tr>
    `).join('');
}

function sortTable(data, columnIndex) {
    const columnKey = ["userId", "title", "completed"][columnIndex];

    data.sort((a, b) => {
        if (a[columnKey] > b[columnKey]) {
            return 1;
        } else if (a[columnKey] < b[columnKey]) {
            return -1;
        } else {
            return 0;
        }
    });

    renderTable(data);
}

getResponse();
