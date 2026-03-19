<script lang="ts">
  let query = '';
</script>

<div class="search">
  <h2>Search Logs</h2>
  <div class="search-box">
    <input type="text" bind:value={query} placeholder="Search by topic or tag..." />
  </div>
  
  {#if query}
    <div class="results">
      <p>Searching for: {query}</p>
      <!-- Search results will appear here -->
    </div>
  {/if}
</div>

<style>
  .search-box input {
    width: 100%;
    padding: 10px;
    background: #333;
    border: 1px solid #444;
    border-radius: 5px;
    color: #fff;
    outline: none;
  }
  .search-box input:focus { border-color: #00bbff; }
</style>
