<script lang="ts">
  import { gameStore, playerNameStore } from "../../stores/stores";
  import { socketStore } from "../../stores/socketStore";
  import { toast } from "$lib/Toast/toastStore";

  const handleBlur = () => {
    playerNameStore.update((n) => n.replaceAll(/-|,/g, " "));
    socketStore.sendMessage("changename", $playerNameStore);
    toast.add({
      message: `Ton nouveau nom est maintenant : ${$playerNameStore}`,
    });
  };
</script>

<div class="container">
  {#if $gameStore}
    {$playerNameStore}
  {:else}
    <label for="playerName">Mon nom : </label>
    <input on:blur={handleBlur} id="playerName" bind:value={$playerNameStore} />
  {/if}
</div>

<style>
  .container {
    margin: 1rem;
  }
</style>
