import { json } from '@sveltejs/kit';
import { getSuggestions } from '$lib/utils/gemini';

export async function POST({ request }) {
  const { todo } = await request.json();
  const suggestions = await getSuggestions(todo);
  return json(suggestions);
}