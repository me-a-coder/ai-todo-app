<script lang="ts">
    import type { Todo } from '$lib/stores/todoStore';
    import { todos } from '$lib/stores/todoStore';
    
    export let todo: Todo;
  </script>
  
  <div class="border p-4 mb-2 rounded {todo.completed ? 'bg-gray-100' : ''}">
    <div class="flex items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        on:change={() => todos.toggle(todo.id)}
        class="mr-2"
      />
      <span class={todo.completed ? 'line-through' : ''}>
        {todo.text}
      </span>
      <button
        on:click={() => todos.delete(todo.id)}
        class="ml-auto text-red-500"
      >
        Delete
      </button>
    </div>
    
    {#if todo.steps.length > 0}
      <div class="mt-2 pl-6">
        <h4 class="font-bold">Steps:</h4>
        <ul class="list-disc pl-4">
          {#each todo.steps as step}
            <li>{step}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>