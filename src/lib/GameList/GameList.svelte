<script lang="ts">
  import { socketStore } from "../../stores/socketStore";
  import Play from "../assets/play.svg";
  import Chevron from "../assets/chevron.svg";

  export let label: string;
  export let games: string[];
  let isOpen = true;
  const toggleIsOpen = () => (isOpen = !isOpen);
</script>

{#if games.length}
  <div class="title">
    {label}
    <img
      class:isClose={!isOpen}
      on:click={() => toggleIsOpen()}
      src={Chevron}
      alt="toggle"
    />
  </div>
  {#if isOpen}
    {#each games as game}
      <ul>
        <img
          on:click={() => socketStore.sendMessage("join", game)}
          src={Play}
          alt="jouer"
        />
        {game}
      </ul>
    {/each}
  {/if}
{/if}

<style>
  .title {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
  .title img {
    margin-left: 0.3rem;
    width: 16px;
    height: 16px;
  }
  .isClose {
    transform: rotate(180deg);
  }
  ul {
    margin: 0.3rem 0;
    display: flex;
    align-items: center;
  }
  ul img {
    margin-right: 0.5rem;
    width: 24px;
    height: 24px;
  }
</style>
