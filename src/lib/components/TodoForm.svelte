<script lang="ts">
  import { todos } from '$lib/stores/todoStore';
  
  let todoText = '';
  
  async function handleSubmit() {
    if (!todoText.trim()) return;
    
    const response = await fetch('/api/suggest', {
      method: 'POST',
      body: JSON.stringify({ todo: todoText }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const steps = await response.json();
    todos.add(todoText, steps);
    todoText = '';
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="mb-4">
  <input
    type="text"
    bind:value={todoText}
    placeholder="Add a new todo..."
    class="w-full p-2 border rounded"
  />
  <button type="submit" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
    Add Todo
  </button>
</form>