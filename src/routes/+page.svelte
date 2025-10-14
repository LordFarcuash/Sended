<script lang="ts">
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

			<!-- Mobile Menu -->
			<nav class="mobile-menu" class:open={isMenuOpen}>
				<button on:click={() => handleTabChange('Home')} class="menu-item">
					<span class="menu-icon">🏠</span>
					<span>Home</span>
				</button>
				<button on:click={() => handleTabChange('About')} class="menu-item">
					<span class="menu-icon">ℹ️</span>
					<span>About The Service</span>
				</button>
			</nav>

			<div class="content-wrapper">
				{#if tab === 'Home'}
					<div class="cards-container">
						<!-- Card 1: Open Source -->
						<div class="feature-card feature-card-side">
							<div class="icon-container">
								<svg
									class="icon"
									xmlns="http://www.w3.org/2000/svg"
									width="200"
									height="200"
									viewBox="0 0 24 24"
									><path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M12 3a9 9 0 0 1 3.618 17.243l-2.193-5.602a3 3 0 1 0-2.849 0l-2.193 5.603A9 9 0 0 1 12 3z"
									/></svg
								>
							</div>
							<h3 class="card-title">Open Source</h3>
							<p class="card-description">
								Open source and transparent. Be part of a community that values ​​collaboration and
								constant innovation.
							</p>
						</div>

						<!-- Card 2: Main Presentation -->
						<div class="feature-card feature-card-main">
							<div class="icon-container main-icon">
								<svg
									class="icon main-icon-svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
								</svg>
							</div>
							<h3 class="card-title">Welcome to our platform</h3>
							<p class="card-description">
								Modern Solution and efficient designed for your company. Manage your operations with
								elegance and complete control.
							</p>
						</div>

						<!-- Card 3: Easy to Use -->
						<div class="feature-card feature-card-side">
							<div class="icon-container">
								<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 class="card-title">Fácil de Usar</h3>
							<p class="card-description">
								Optimized Interface, Intuitive for desktop and mobile. Your Experience is our
								priority on any device.
							</p>
						</div>
					</div>
				{:else if tab === 'About'}
					<div class="about-cards-container">
						<div class="about-card">
							<div class="icon-container main-icon">
								<svg
									class="icon main-icon-svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
								</svg>
							</div>
							<h3 class="card-title">Easy Software Set Up</h3>
							<p class="card-description">
								Follow the video on Github to setup everything you need for this project to work.
								Every step is well explain for your technicians and non-technicians to set it up.
							</p>
						</div>
						<div class="about-card">
							<div class="icon-container main-icon">
								<svg
									width="80px"
									height="80px"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									stroke="currentColor"
									><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g><g id="SVGRepo_iconCarrier">
										<defs>
											<style>
												.cls-1,
												.cls-2 {
													fill: none;
													stroke: #ffff;
													stroke-miterlimit: 10;
													stroke-width: 0.9px;
												}
												.cls-1 {
													stroke-linecap: square;
												}
											</style>
										</defs>
										<g id="reciept">
											<line class="cls-1" x1="8.18" y1="9.16" x2="12.95" y2="9.16"></line>
											<line class="cls-1" x1="8.18" y1="12.98" x2="12.95" y2="12.98"></line>
											<line class="cls-1" x1="8.18" y1="16.8" x2="12.95" y2="16.8"></line>
											<path
												class="cls-1"
												d="M19.64,22.52H4.36A2.86,2.86,0,0,1,1.5,19.66V2.48L4,4.39,6.59,2.48,9.13,4.39l2.55-1.91,2.54,1.91,2.55-1.91V19.66a2.87,2.87,0,0,0,2.87,2.86Z"
											></path> <line class="cls-2" x1="4.36" y1="9.16" x2="6.27" y2="9.16"></line>
											<line class="cls-2" x1="4.36" y1="12.98" x2="6.27" y2="12.98"></line>
											<line class="cls-2" x1="4.36" y1="16.8" x2="6.27" y2="16.8"></line>
											<path
												class="cls-2"
												d="M18.68,10.11H22.5v9.55a2.87,2.87,0,0,1-5.73,0V10.11h1.91Z"
											></path>
										</g>
									</g></svg
								>
							</div>
							<h3 class="card-title">This Software Allow You to</h3>
							<p class="card-description">
								This software can Create User for Each department for them Creating Tickets for
								other departments, creating a self controlled ticket sistem.
							</p>
						</div>
					</div>
				{:else if tab === 'Login'}
					<div class="login-cards-container">
						<div class="login-card">
							<h3>Login Form</h3>
							<div>
								<p>Username</p>
								<input placeholder="Ejemplo: Ledanix" />
							</div>
							<div>
								<p>Password</p>
								<input />
							</div>
						</div>
					</div>
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

	/* Header */
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
	}

	.btn-login {
		background: rgba(255, 255, 255, 0.15);
		color: white;
		border: 1.5px solid rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
	}

	.btn-login:hover {
		background: rgba(255, 255, 255, 0.25);
		border-color: rgba(255, 255, 255, 0.5);
	}

	/* Main Container */
	.main-container {
		flex: 1;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-y: auto;
	}

	/* Card Principal */
	.card {
		width: 100%;
		height: 85%;
		background: white;
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Header de la Card */
	.header-card {
		background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
		border-bottom: 2px solid #e0e7ff;
		height: 5vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1.5rem;
		position: relative;
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

	/* Burger Button */
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

	/* Mobile Menu */
	.mobile-menu {
		background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
		border-bottom: 2px solid #e0e7ff;
		display: none;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.mobile-menu.open {
		display: flex;
		max-height: 500px;
		opacity: 1;
		padding: 1rem;
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

	.menu-item:active {
		background: #dbeafe;
		border-color: #4f46e5;
	}

	.menu-icon {
		font-size: 1.25rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	/* Content Wrapper */
	.content-wrapper {
		flex: 1;
		padding: 3rem 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Cards Container */
	.cards-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		width: 100%;
		max-width: 1800px;
	}

	/* Cards Container */
	.about-cards-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		width: 100%;
		max-width: 1800px;
	}

	/* Cards Container */
	.login-cards-container {
		display: flex;
		width: 50%;
	}

	.login-card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		border: 2px solid #6366f1;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 350px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		max-width: 1200px;
		width: 100%;
	}
	/* Feature Card */
	.feature-card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		border: 2px solid #e0e7ff;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 350px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
	}

	.feature-card:hover {
		border-color: #6366f1;
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
		transform: translateY(-5px);
	}

	.feature-card-main {
		background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
		border-color: #6366f1;
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
	}

	/* About Card */
	.about-card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		border: 2px solid #e0e7ff;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 350px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		max-width: 1200px;
		width: 100%;
	}

	.about-card:hover {
		border-color: #6366f1;
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
		transform: translateY(-5px);
	}

	/* Icon Container */
	.icon-container {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.5rem;
		transition: all 0.3s ease;
	}

	.feature-card:hover .icon-container,
	.about-card:hover .icon-container {
		background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
	}

	.main-icon {
		background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
		width: 100px;
		height: 100px;
	}

	.icon {
		width: 45px;
		height: 45px;
		color: #4f46e5;
		transition: all 0.3s ease;
	}

	.main-icon-svg {
		width: 55px;
		height: 55px;
		color: white;
	}

	.feature-card:hover .icon,
	.about-card:hover .icon {
		color: white;
	}

	/* Card Text */
	.card-title {
		color: #2d3e5f;
		font-size: 1.3rem;
		font-weight: 700;
		margin-bottom: 1rem;
		letter-spacing: 0.5px;
	}

	.card-description {
		color: #6b7280;
		font-size: 0.95rem;
		line-height: 1.6;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	/* Footer */
	.footer {
		width: 100%;
		height: 8%;
		background: linear-gradient(135deg, #2d3e5f 0%, #3d4e6f 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		border-radius: 16px 16px 16px 16px;
		margin-top: 1rem;
		box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
	}

	.footer p {
		font-size: 0.9rem;
		letter-spacing: 0.5px;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.cards-container {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.content-wrapper {
			padding: 2rem 1rem;
		}
		.feature-card-side {
			display: none;
		}
		.feature-card,
		.about-card {
			min-height: 350px;
			padding: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.burger-btn {
			display: flex;
		}

		.header-card .brand {
			flex: 1;
		}

		.cards-container {
			grid-template-columns: 1fr;
		}

		.main-container {
			padding: 1rem;
		}

		.content-wrapper {
			padding: 1.5rem 1rem;
		}

		.feature-card,
		.about-card {
			min-height: 350px;
			padding: 1.5rem;
		}
		.feature-card-side {
			display: none;
		}

		.card-title {
			font-size: 1.1rem;
		}

		.card-description {
			font-size: 0.85rem;
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

		.feature-card,
		.about-card {
			min-height: 400px;
			padding: 1rem;
		}

		.feature-card-side {
			display: none;
		}

		.icon-container {
			width: 60px;
			height: 60px;
		}

		.main-icon {
			width: 80px;
			height: 80px;
		}

		.icon {
			width: 35px;
			height: 35px;
		}

		.main-icon-svg {
			width: 45px;
			height: 45px;
		}

		.card-title {
			font-size: 0.95rem;
		}

		.card-description {
			font-size: 0.75rem;
			line-height: 1.4;
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
