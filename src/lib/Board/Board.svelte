<script lang="ts">
  import {
    pyGuesserStore,
    pyHinterStore,
    pyPlayersStore,
  } from "../../stores/pyStores";
  import { socketStore } from "../../stores/socketStore";
  import { currentPlayerStore } from "../../stores/stores";
  import GuessInput from "./GuessInput.svelte";
  import HintInput from "./HintInput.svelte";
  currentPlayerStore;
</script>

<button
  on:click={() => {
    socketStore.sendMessage("joinhint");
  }}>Je fais deviner le mot</button
>
<button
  on:click={() => {
    socketStore.sendMessage("joinguess");
  }}>Je devine</button
>
<h2>
  spectateurs : {$pyPlayersStore
    .filter((p) => p !== $pyGuesserStore && p !== $pyHinterStore)
    .join(", ")}
</h2>
<h2>devine : {$pyGuesserStore}</h2>
<h2>fait deviner : {$pyHinterStore}</h2>
<HintInput />
<GuessInput />
<h2>Propose un mot pour l'aider à deviner : todo field shown to guesser</h2>
<h2>ton mot a faire deviner : todo shown to hinter</h2>
<h2>en combien de coup ? todo field 1 à 9 shown to hinter</h2>
<h2>|nom du guesser| dit |mot proposé|</h2>
<h2>oui ou non ? pour le hinter</h2>

<style>
</style>
