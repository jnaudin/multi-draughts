<script lang="ts">
  import { playerNameStore } from "../../stores/stores";
  import { socketStore } from "../../stores/socketStore";
  import { toast } from "$lib/Toast/toastStore";
</script>

<div class="container">
  <label for="playerName">Mon nom : </label>
  <input id="playerName" bind:value={$playerNameStore} />
  <button
    on:click={() => {
      playerNameStore.update((n) => n.replaceAll(/-|,/g, " "));
      socketStore.sendMessage("changename", $playerNameStore);
      toast.add({
        type: "info",
        message: `Ton nouveau nom est maintenant : ${$playerNameStore}`,
      });
    }}>Je change mon pseudo</button
  >
</div>

<style>
  .container {
    margin: 1rem;
  }
</style>
