<script lang="ts">
  import { fade } from "svelte/transition";
  import { toast } from "./toastStore";
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";

  export let duration = 3e3;
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
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    position: fixed;
    bottom: calc(3rem);
    transition: 0.3s ease all;
    z-index: 20;
    border-radius: 4px;
    border-left: 4px solid blueviolet;
    box-shadow: 0 7px 20px 0 rgba(var(--rgb-grey-1000), 0.22);
    left: 50%;
    width: calc(100% - 2rem);
    transform: translate(-50%, 0);

    /* @media (--large-min-viewport) {
      width: 370px;
      height: 53px;
      right: var(--space2);
      top: var(--toast-top);
      transform: none;
      left: auto;
    }
 */
    /* @media (hover: hover) {
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-primary);
      }
    } */
  }
</style>
