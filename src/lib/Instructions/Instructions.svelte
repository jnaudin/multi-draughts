<script lang="ts">
  import { colorStore, currentPlayerStore } from "../../stores/stores";
</script>

<div class={`text ${$currentPlayerStore}`}>
  Tu es {{ white: "blanc", black: "noir" }[$colorStore || "white"]},
  {$currentPlayerStore === $colorStore ? "à toi de jouer" : "à l'adversaire"}
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
