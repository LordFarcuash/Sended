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

			<div
				class="shadow-efect ml-10 rounded-b-lg mr-10 text-white font-selector content-center place-items-center justify-center px-overflow-hidden transition-all duration-300 ease-in-out"
				class:max-h-0={!isMenuOpen}
				class:max-h-screen={isMenuOpen}
				class:opacity-0={!isMenuOpen}
				class:opacity-100={isMenuOpen}
				class:py-0={!isMenuOpen}
				class:py-2={isMenuOpen}
			>
				<button
					on:click={() => (tab = 'About')}
					class="block py-1 hover:bg-gray-500 w-[80%] rounded-sm">About The Company</button
				>
				<button class="block py-1 hover:bg-gray-500 w-[80%] rounded-sm">Social</button>
			</div>

			<div class="p-4 text-white">
				{#if tab === 'default'}
					<div
						class="flex gap-[1rem] content-center place-items-center justify-center text-center mt-10"
					>
						<div class="bg-gray-400 w-[100%] h-[55vh] rounded-sm collapseOn-Mobile">
							<p>Si</p>
						</div>
						<div class="bg-stone-200 w-[100%] h-[55vh] rounded-sm text-black font-selector">
							<div class="mt-4 text-[2.5rem]">Welcome to out platform</div>
							<div></div>
						</div>
						<div class="bg-green-800 w-[100%] h-[55vh] rounded-sm collapseOn-Mobile">
							<p>SinoSi</p>
						</div>
					</div>
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

	.shadow-efect {
		box-shadow: 0 10px 25px 0 rgba(156, 155, 149, 0.61);
		background-color: rgb(73, 72, 68);
	}

	.Card {
		width: 100%;
		height: 85%;
		background-color: rgb(84, 84, 94);
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
		background-color: #919bad;
		border-top-left-radius: 1px;
		border-top-right-radius: 1px;
	}

	@media (max-width: 800px) {
		.collapseOn-Mobile {
			display: none;
		}
	}
</style>
