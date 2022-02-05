<script lang="ts">
  import {
    foundStore,
    pyGuesserStore,
    pyGuessesStore,
    pyHinterStore,
    pyHintsStore,
    pyNumberStore,
    pyPlayersStore,
    pyWordStore,
  } from "../../stores/pyStores";
  import { socketStore } from "../../stores/socketStore";
  import { playerNameStore } from "../../stores/stores";
  import GuessInput from "./GuessInput.svelte";
  import HintInput from "./HintInput.svelte";
  import NumberInput from "./NumberInput.svelte";
  import Ok from "../assets/ok.svg";
  import Ko from "../assets/ko.svg";
  import { get } from "svelte/store";
  $: console.log(get(foundStore));
</script>

<h2>
  spectateurs : {$pyPlayersStore
    .filter((p) => p !== $pyGuesserStore && p !== $pyHinterStore)
    .join(", ")}
</h2>
{#if !$pyHinterStore && $pyGuesserStore !== $playerNameStore}
  <button
    on:click={() => {
      socketStore.sendMessage("joinhint");
    }}>Je fais deviner le mot</button
  >
{:else if $pyHinterStore !== $playerNameStore}
  <h2>{$pyHinterStore} est le joueur qui connait le mot</h2>
{/if}
{#if !$pyGuesserStore && $pyHinterStore !== $playerNameStore}
  <button
    on:click={() => {
      socketStore.sendMessage("joinguess");
    }}>Je devine</button
  >
{:else if $pyGuesserStore !== $playerNameStore}
  <h2>{$pyGuesserStore} est le joueur qui devine.</h2>
{/if}
{#if $pyHintsStore.length}
  <h2>Indices : <b>{$pyHintsStore.join(", ")}</b></h2>
{/if}
{#if $pyGuessesStore.length}
  <h2>Proposition : <b>{$pyGuessesStore.join(", ")}</b></h2>
{/if}
{#if $pyNumberStore}
  <h2>{$pyHintsStore.length}/{$pyNumberStore} tentatives</h2>
{/if}
{#if $foundStore === "OK"}
  <h1>C'est gagné ! Le mot était {$pyWordStore}.</h1>
{:else if $pyNumberStore && $pyHintsStore.length === $pyNumberStore && $foundStore === "KO" && $pyWordStore}
  <h1>C'est perdu ! Le mot était {$pyWordStore}.</h1>
{:else}
  <NumberInput />
  <GuessInput />

  {#if $pyHinterStore === $playerNameStore && $pyGuessesStore.length === $pyHintsStore.length && $foundStore === "WAIT"}
    <img
      on:click={() => socketStore.sendMessage("found", "OK")}
      src={Ok}
      alt="c'est ça !"
    />
    <img
      on:click={() => socketStore.sendMessage("found", "KO")}
      src={Ko}
      alt="c'est pas ça :("
    />
  {:else}
    <HintInput />
  {/if}
{/if}

{#if $pyWordStore} <h3>{$pyWordStore}</h3> {/if}

<style>
  img {
    width: 48px;
    height: 48px;
  }
</style>
