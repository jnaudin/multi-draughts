<script lang="ts">
  import { colorStore, currentPlayerStore } from "../../stores/stores";
</script>

<div class={`text ${$currentPlayerStore}`}>
  {#if $colorStore}
    Tu es {{ white: "blanc", black: "noir" }[$colorStore]},
    {$currentPlayerStore === $colorStore ? "à toi de jouer" : "à l'adversaire"}
  {:else}
    En attente d'un adversaire ...
  {/if}
</div>

<style>
  .text {
    width: fit-content;
    font-size: 3rem;
    margin: auto;
    margin-top: 2rem;
    border-radius: 6px;
    padding: 1rem;
  }

  .white {
    color: black;
    background-color: white;
  }
  .black {
    color: white;
    background-color: black;
  }
</style>
