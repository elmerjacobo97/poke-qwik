import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal<number>(1); // <- primitivos
  const showBackImage = useSignal<boolean>(false);
  const isPokemonVisible = useSignal<boolean>(false);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });

  return (
    <>
      <span class="text-5xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>

      <PokemonImage
        pokemonId={pokemonId.value}
        width={200}
        height={200}
        backImage={showBackImage.value}
        isVisible={isPokemonVisible.value}
      />

      <div class="flex gap-4 mt-4">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary">
          Anterior
        </button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">
          Siguiente
        </button>
        <button
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary"
        >
          Voltear
        </button>
        <button
          onClick$={() => (isPokemonVisible.value = !isPokemonVisible.value)}
          class="btn btn-primary"
        >
          {isPokemonVisible.value ? "Revelar" : "Ocultar"}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "Esta es mi primera aplicación de Qwik",
      content: "Qwik site description",
    },
  ],
};
