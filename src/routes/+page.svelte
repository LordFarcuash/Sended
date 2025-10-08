<script>
	// Importar librerías externas si las usaras (no es el caso aquí, pero es buena práctica)

	// Función para manejar el toggle del menú de hamburguesa
	let isMenuOpen = false;
	let tab = 'default';

	function toggleBurgerMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<div class="gap-4">
	<div
		class="flex bg-neutral-600 h-[5vh] w-[100%] content-center place-items-center justify-center gap-4"
	>
		<button
			class="bg-rose-600 text-neutral-100 w-[10rem] text-center h-[2.5vh] rounded-2xl content-center font-selector"
		>
			Register
		</button>
		<button
			class=" bg-blue-900 text-neutral-100 w-[10rem] text-center h-[2.5vh] rounded-2xl content-center font-selector"
		>
			Login
		</button>
	</div>

	<div class="h-[100vh] p-4">
		<div class="Card rounded-sm">
			<div class="villegas h-[5vh] flex justify-between items-center px-4">
				<div class="flex gap-4 text-[#fff] font-selector">
					<button on:click={() => (tab = 'default')}>SendedMaster</button>
				</div>

				<button
					on:click={toggleBurgerMenu}
					class="text-white focus:outline-none"
					aria-label="Toggle menu"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
			</div>

			<div class=" bg-blue-800 text-white font-selector py-2 px-4" class:hidden={!isMenuOpen}>
				<button on:click={() => (tab = 'About')} class="block py-1 hover:bg-blue-700 w-[100%]"
					>About The Company</button
				>
				<button class="block py-1 hover:bg-blue-700 w-[100%]">Social</button>
			</div>

			<div class="p-4 text-white">
				{#if tab === 'default'}
					<p>Contenido principal de la tarjeta va aquí...</p>
				{:else if tab === 'About'}
					<p>Carajooooo</p>
				{/if}
			</div>
		</div>

		<div
			class="footer rounded-sm text-center content-center flex items-center justify-center font-selector text-white"
		>
			Footer
		</div>
	</div>
</div>

<style>
	/* Asegúrate de que tu font 'Kode Mono' esté importado globalmente
       o en este componente si no usas @import. */

	.font-selector {
		font-family: 'Kode Mono', monospace;
	}

	.Card {
		width: 100%;
		height: 80%;
		background-color: blue;
	}

	.footer {
		width: 100%;
		margin-top: 1rem;
		height: 8%;
		background-color: green;
	}

	.villegas {
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		border-color: white;
		border-width: 0.1px;
		background-color: #0046cb;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
</style>
