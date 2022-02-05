<script lang="ts">
  import { fade } from "svelte/transition";
  import { toast } from "./toastStore";
  import { onDestroy } from "svelte";

  export let duration = 1e4;
  let timeout: NodeJS.Timeout;

  const unsubcribe = toast.subscribe((value) => {
    if (!Object.values(value).length) return;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => toast.remove(), duration);
  });

  onDestroy(unsubcribe);
</script>

{#if $toast.message}
  <div class="Toast" transition:fade={{ delay: $toast.transitionDelay }}>
    <span class="Toast-message g-text-3">{$toast.message}</span>
  </div>
{/if}

<style>
  .Toast {
    background: #999;
    margin: 0.2rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    position: fixed;
    top: 1.1rem;
    transition: 0.3s ease all;
    z-index: 20;
    border-radius: 12px;
    border-left: 12px solid blueviolet;
    box-shadow: 0 7px 20px 0 rgba(var(--rgb-grey-1000), 0.22);
    left: 50%;
    width: calc(100% - 4.1rem);
    transform: translate(-50%, 0);
  }
</style>
