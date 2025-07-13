<script lang="ts">
  import { title } from '$lib/stores/title';
  import { browser } from '$app/environment';
  import "../app.css";

  const { children } = $props();

  let pageTitle = $state('Habitus');

  if (browser) {
    title.subscribe(value => {
      pageTitle = value;
    });
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

{@render children()}
