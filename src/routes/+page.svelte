<script lang="ts">
	import HomeCard from '$lib/components/homeCard.svelte';
	import AboutCard from '$lib/components/aboutCard.svelte';
	import LoginCard from '$lib/components/loginCard.svelte';

	let isMenuOpen = false;
	let tab = 'Home';

	function toggleBurgerMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleTabChange(tabName: string) {
		tab = tabName;
		closeMenu();
	}
</script>

<div class="gap-4">
	<div class="header">
		<button on:click={() => handleTabChange('Login')} class="btn-login">Login</button>
	</div>

	<div class="main-container">
		<div class="card">
			<div class="header-card">
				<div class="brand font-selector">
					<button on:click={() => handleTabChange('Home')}>SendedMaster</button>
				</div>

				<button
					on:click={toggleBurgerMenu}
					class="burger-btn"
					class:active={isMenuOpen}
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
				>
					<svg class="burger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<nav class="floating-menu" class:open={isMenuOpen}>
				<div class="menu-content">
					<button on:click={() => handleTabChange('Home')} class="menu-item">
						<span class="menu-icon">🏠</span>
						<span>Home</span>
					</button>
					<button on:click={() => handleTabChange('About')} class="menu-item">
						<span class="menu-icon">ℹ️</span>
						<span>About The Service</span>
					</button>
				</div>
			</nav>

			<div class="content-wrapper">
				{#if tab === 'Home'}
					<HomeCard />
				{:else if tab === 'About'}
					<AboutCard />
				{:else if tab === 'Login'}
					<LoginCard />
				{/if}
			</div>
		</div>

		<div class="footer">
			<p>&copy; 2025 SendedMaster. Todos los derechos reservados.</p>
		</div>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.gap-4 {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.font-selector {
		font-family: 'Kode Mono', monospace;
	}

	.header {
		background: linear-gradient(135deg, #2d3e5f 0%, #3d4e6f 100%);
		height: 5vh;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.btn-login {
		width: 10rem;
		height: 2.5vh;
		border: none;
		border-radius: 25px;
		font-family: 'Kode Mono', monospace;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		background: rgba(255, 255, 255, 0.15);
		color: white;
		border: 1.5px solid rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
	}

	.btn-login:hover {
		background: rgba(255, 255, 255, 0.25);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.main-container {
		flex: 1;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-y: auto;
		position: relative;
	}

	.card {
		width: 100%;
		height: 85%;
		background: white;
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
	}

	.header-card {
		background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
		border-bottom: 2px solid #e0e7ff;
		height: 5vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1.5rem;
		position: relative;
		z-index: 20;
	}

	.brand button {
		color: #2d3e5f;
		font-size: 1.2rem;
		font-weight: 700;
		border: none;
		background: none;
		cursor: pointer;
		letter-spacing: 1px;
		transition: color 0.3s ease;
	}

	.brand button:hover {
		color: #6366f1;
	}

	.burger-btn {
		display: flex;
		background: none;
		border: none;
		color: #2d3e5f;
		cursor: pointer;
		padding: 0.5rem;
		width: 2.5rem;
		height: 2.5rem;
		position: relative;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		transition: all 0.3s ease;
		z-index: 30;
	}

	.burger-btn:hover {
		background: rgba(99, 102, 241, 0.1);
	}

	.burger-btn.active {
		color: #6366f1;
	}

	.burger-icon,
	.close-icon {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		stroke-width: 2.5;
		transition: all 0.3s ease;
	}

	.burger-icon {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}

	.burger-btn.active .burger-icon {
		opacity: 0;
		transform: scale(0.8) rotate(-90deg);
	}

	.close-icon {
		opacity: 0;
		transform: scale(0.8) rotate(90deg);
	}

	.burger-btn.active .close-icon {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}

	.floating-menu {
		position: absolute;
		top: 5vh;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		pointer-events: none;
		z-index: 25;
		transition: all 0.3s ease;
	}

	.menu-content {
		background: white;
		border: 2px solid #e0e7ff;
		border-radius: 0 0 16px 16px; /* Bordes hacia arriba cerrados */
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		padding: 1rem 1rem 1.25rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 90%;
		max-width: 400px;

		/* Estado inicial (cerrado) */
		opacity: 0;
		transform: translateY(-20px) scaleY(0.95);
		transform-origin: top center;
		pointer-events: none;

		transition:
			opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.floating-menu.open .menu-content {
		opacity: 1;
		transform: translateY(0) scaleY(1);
		pointer-events: all;
	}

	/* Transición de cierre “replegándose hacia arriba” */
	.floating-menu:not(.open) .menu-content {
		opacity: 0;
		transform: translateY(-20px) scaleY(0.95);
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: white;
		border: 2px solid #e0e7ff;
		color: #2d3e5f;
		padding: 0.875rem 1rem;
		border-radius: 10px;
		cursor: pointer;
		font-family: 'Kode Mono', monospace;
		font-size: 0.95rem;
		font-weight: 500;
		transition: all 0.2s ease;
		width: 100%;
		text-align: left;
	}

	.menu-item:hover {
		background: #e0e7ff;
		border-color: #6366f1;
		transform: translateX(4px);
	}

	.menu-icon {
		font-size: 1.25rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.content-wrapper {
		flex: 1;
		padding: 3rem 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}

	.footer {
		width: 100%;
		height: 8%;
		background: linear-gradient(135deg, #2d3e5f 0%, #3d4e6f 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		border-radius: 16px;
		margin-top: 1rem;
		box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
	}

	.footer p {
		font-size: 0.9rem;
		letter-spacing: 0.5px;
	}
	/* Responsive Design */
	@media (max-width: 1024px) {
		.content-wrapper {
			padding: 2rem 1rem;
		}
	}

	@media (max-width: 768px) {
		.burger-btn {
			display: flex;
		}

		.header-card .brand {
			flex: 1;
		}

		.main-container {
			padding: 1rem;
		}

		.content-wrapper {
			padding: 1.5rem 1rem;
		}

		.mobile-menu {
			display: none;
		}

		.mobile-menu.open {
			display: flex;
		}
	}

	@media (max-width: 480px) {
		.header {
			gap: 0.5rem;
		}

		.btn-login {
			width: 8rem;
			font-size: 0.75rem;
			height: 2rem;
		}

		.menu-item {
			padding: 0.75rem 0.875rem;
			font-size: 0.875rem;
		}

		.menu-icon {
			font-size: 1rem;
		}
	}
</style>
