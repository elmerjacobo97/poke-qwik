import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  pokemonId: number;
  width?: number;
  height?: number;
  backImage: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({
    pokemonId,
    width = 200,
    height = 200,
    backImage = false,
    isVisible,
  }: Props) => {
    const imageLoaded = useSignal<boolean>(false);

    // cada que pokemonId cambia se ejecuta
    useTask$(({ track }) => {
      track(() => pokemonId);
      imageLoaded.value = false;
    });

    return (
      <div
        class="flex justify-center items-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {!imageLoaded.value && <span class="text-gray-400">Cargando...</span>}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            backImage ? "back/" : ""
          }${pokemonId}.png`}
          alt="pokemon imagen"
          width={width}
          height={height}
          onLoad$={() => {
            // setTimeout(() => {
            imageLoaded.value = true;
            // }, 1000);
          }}
          // style={{ opacity: imageLoaded.value ? 1 : 0 }}
          class={[
            {
              hidden: !imageLoaded.value,
              "brightness-0": isVisible,
            },
            "transition-all",
          ]}
        />
      </div>
    );
  }
);
