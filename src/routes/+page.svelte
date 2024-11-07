<script lang="ts">
    import TodoForm from '$lib/components/TodoForm.svelte';
    import TodoItem from '$lib/components/TodoItem.svelte';
    import { todos } from '$lib/stores/todoStore';
  </script>
  
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">AI-Powered Todo List</h1>
    <TodoForm />
    
    {#each $todos as todo (todo.id)}
      <TodoItem {todo} />
    {/each}
  </div>