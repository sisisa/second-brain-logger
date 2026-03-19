<script lang="ts">
  import Dashboard from './lib/Dashboard.svelte';
  import History from './lib/History.svelte';
  import Search from './lib/Search.svelte';

  let activeTab = 'dashboard';
</script>

<main>
  <nav class="tabs">
    <button class:active={activeTab === 'dashboard'} on:click={() => activeTab = 'dashboard'}>
      Dashboard
    </button>
    <button class:active={activeTab === 'history'} on:click={() => activeTab = 'history'}>
      History
    </button>
    <button class:active={activeTab === 'search'} on:click={() => activeTab = 'search'}>
      Search
    </button>
  </nav>

  <section class="scrollable">
    <section class="content">
      {#if activeTab === 'dashboard'}
        <Dashboard />
      {:else if activeTab === 'history'}
        <History />
      {:else if activeTab === 'search'}
        <Search />
      {/if}
    </section>
  </section>
</main>

<style>
  main {
    width: 400px;
    height: 550px;
    display: flex;
    flex-direction: column;
    background: #1a1a1a;
    color: #fff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    overflow: hidden;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #333;
    background: #2a2a2a;
  }

  button {
    flex: 1;
    padding: 12px;
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    transition: 0.3s;
    font-size: 14px;
    font-weight: 500;
  }

  button:hover {
    color: #fff;
  }

  button.active {
    color: #00bbff;
    border-bottom: 2px solid #00bbff;
  }

  .scrollable {
    flex: 1;
    overflow-y: auto;
  }

  .content {
    padding: 15px;
  }
</style>
