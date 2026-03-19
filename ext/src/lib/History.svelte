<script lang="ts">
  // Dummy history
  const history = [
    { title: 'How to use Svelte with Vite', date: '2024-03-19' },
    { title: 'Manifest V3 Permissions Guide', date: '2024-03-18' },
    { title: 'Google Apps Script POST API', date: '2024-03-17' }
  ];
</script>

<div class="history">
  <h2>Log History</h2>
  {#each history as item}
    <div class="history-item">
      <p class="title">{item.title}</p>
      <span class="date">{item.date}</span>
    </div>
  {/each}
</div>

<style>
  .history-item {
    padding: 10px;
    border-bottom: 1px solid #333;
    cursor: pointer;
  }
  .history-item:hover { background: #2a2a2a; }
  .title { margin: 0; font-size: 0.9rem; font-weight: 500; }
  .date { font-size: 0.7rem; color: #666; }
</style>
