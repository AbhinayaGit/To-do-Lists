window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    let tasks = loadTasks(); // Load saved tasks when the page loads
    renderTasks(); // Render the tasks from localStorage

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = input.value.trim();
        if (taskText === "") return; // Prevent empty tasks

        const task = { text: taskText, completed: false };
        tasks.push(task); // Add to tasks array
        saveTasks(); // Save to localStorage( to save the updated task list in localstorage)
        renderTasks(); // Update UI(to update the task list on the screen)

        input.value = ''; // Clear input field
    });

    function renderTasks() {
        list_el.innerHTML = ""; // Clear the task list

        tasks.forEach((task, index) => {
            const task_el = document.createElement('div');
            task_el.classList.add('task');

            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');

            const task_input_el = document.createElement('input');
            task_input_el.classList.add('text');
            task_input_el.type = 'text';
            task_input_el.value = task.text;
            task_input_el.setAttribute('readonly', 'readonly');

            task_content_el.appendChild(task_input_el);
            task_el.appendChild(task_content_el);

            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');

            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerText = 'Edit';

            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerText = 'Delete';

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
            task_el.appendChild(task_actions_el);
            list_el.appendChild(task_el);

            // Edit Task
            task_edit_el.addEventListener('click', () => {
                if (task_edit_el.innerText.toLowerCase() === "edit") {
                    task_edit_el.innerText = "Save";
                    task_input_el.removeAttribute("readonly");
                    task_input_el.focus();
                } else {
                    task_edit_el.innerText = "Edit";
                    task_input_el.setAttribute("readonly", "readonly");
                    tasks[index].text = task_input_el.value; // Update task text
                    saveTasks();
                }
            });

            // Delete Task
            task_delete_el.addEventListener('click', () => {
                tasks.splice(index, 1); // Remove from array
                saveTasks();
                renderTasks(); // Re-render the tasks
            });
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    }
});
