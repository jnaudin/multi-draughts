<script lang="ts">
  import {
    boardStore,
    selectedPieceStore,
    possibilitiesStore,
    colorStore,
    currentPlayerStore,
  } from "../../stores/stores";
  import { socketStore } from "../../stores/socketStore";

  import type { CellType, CoordType, PossibilityType } from "../../types";
  import { handleBoxClick, handlePieceClick } from "./eventHandlers";

  export let line: number;
  export let col: number;

  let board: CellType[][];
  let selectedPiece: CoordType | undefined;
  let possibilities: PossibilityType[];

  boardStore.subscribe((value) => {
    board = value;
  });

  selectedPieceStore.subscribe((value) => {
    selectedPiece = value;
  });

  possibilitiesStore.subscribe((value) => {
    possibilities = value;
  });

  let isSelected: boolean;
  $: isSelected = line === selectedPiece?.line && col === selectedPiece?.col;

  let piece: CellType["piece"] | undefined;
  $: piece = board[line][col]?.piece;

  let isPossibility: boolean;
  $: isPossibility = !!possibilities?.find(
    (p) => p.coord.line === line && p.coord.col === col
  );
</script>

<div
  data-testid={`box-${line}-${col}`}
  class={`${isPossibility} box${isPossibility ? " possible" : ""}`}
  on:click={() => {
    if ($colorStore === $currentPlayerStore) {
      handleBoxClick(line, col);
      socketStore.sendMessage("box", line, col);
    }
  }}
>
  {#if piece}
    <div
      data-testid={`piece-${line}-${col}`}
      class={`${piece.type} piece-${isSelected ? "selected" : piece.color}`}
      on:click={(event) => {
        event.stopPropagation();
        if ($colorStore === $currentPlayerStore) {
          handlePieceClick(line, col);
          socketStore.sendMessage("piece", line, col);
        }
      }}
    />
  {/if}
</div>

<style>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pawn {
    width: 2.5rem;
    min-width: 2.5rem;
    height: 2.5rem;
    min-height: 2.5rem;
    border-radius: 1.5rem;
    border: 3px solid grey;
  }

  .lady {
    width: 3.5rem;
    min-width: 3.5rem;
    height: 3.5rem;
    min-height: 3.5rem;
    border-radius: 2rem;
    border: 1px solid grey;
  }

  .piece-white {
    background-color: navajowhite;
  }

  .piece-black {
    background-color: brown;
  }

  .piece-selected {
    background-color: purple;
  }
  .possible {
    width: 2.5rem;
    min-width: 2.5rem;
    height: 2.5rem;
    min-height: 2.5rem;
    border-radius: 1.5rem;
    border: 3px dashed salmon;
    margin: auto;
  }
</style>
