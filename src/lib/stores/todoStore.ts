import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { v4 as uuid } from 'uuid';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  steps: string[];
}

const storedTodos = browser ? localStorage.getItem('todos') : null;
const initialTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

function createTodoStore() {
  const { subscribe, set, update } = writable<Todo[]>(initialTodos);

  return {
    subscribe,
    add: (text: string, steps: string[] = []) => {
      update(todos => {
        const newTodos = [...todos, { 
          id: uuid(), 
          text, 
          completed: false, 
          steps 
        }];
        if (browser) {
          localStorage.setItem('todos', JSON.stringify(newTodos));
        }
        return newTodos;
      });
    },
    toggle: (id: string) => {
      update(todos => {
        const newTodos = todos.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        if (browser) {
          localStorage.setItem('todos', JSON.stringify(newTodos));
        }
        return newTodos;
      });
    },
    delete: (id: string) => {
      update(todos => {
        const newTodos = todos.filter(todo => todo.id !== id);
        if (browser) {
          localStorage.setItem('todos', JSON.stringify(newTodos));
        }
        return newTodos;
      });
    },
    addSteps: (id: string, steps: string[]) => {
      update(todos => {
        const newTodos = todos.map(todo => 
          todo.id === id ? { ...todo, steps } : todo
        );
        if (browser) {
          localStorage.setItem('todos', JSON.stringify(newTodos));
        }
        return newTodos;
      });
    }
  };
}

export const todos = createTodoStore();