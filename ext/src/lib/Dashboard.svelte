<script lang="ts">
  // Dummy data for dashboard
  const stats = [
    { label: 'Total Logs', value: 42 },
    { label: 'Topics', value: 12 },
    { label: 'This Week', value: 8 }
  ];
</script>

<div class="dashboard">
  <h2>Activity Overview</h2>
  <div class="stats-grid">
    {#each stats as stat}
      <div class="stat-card">
        <span class="label">{stat.label}</span>
        <span class="value">{stat.value}</span>
      </div>
    {/each}
  </div>

  <div class="recent-topics">
    <h3>Recent Topics</h3>
    <ul>
      <li>Web Development</li>
      <li>Machine Learning</li>
      <li>Chrome Extensions</li>
    </ul>
  </div>
</div>

<style>
  h2 { font-size: 1.2rem; margin-bottom: 1rem; }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .stat-card {
    background: #333;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  .label { display: block; font-size: 0.8rem; color: #888; }
  .value { font-size: 1.5rem; font-weight: bold; color: #00bbff; }
  .recent-topics { margin-top: 20px; }
  li { padding: 5px 0; border-bottom: 1px solid #333; font-size: 0.9rem; }
</style>
