import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/habits');
  const habits = await res.json();

  return {
    habits
  };
};
