<script>
</script>

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
			Open source and transparent. Be part of a community that values ​​collaboration and constant
			innovation.
		</p>
	</div>

	<!-- Card 2: Main Presentation -->
	<div class="feature-card feature-card-main">
		<div class="icon-container main-icon">
			<svg class="icon main-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
			</svg>
		</div>
		<h3 class="card-title">Welcome to our platform</h3>
		<p class="card-description">
			Modern Solution and efficient designed for your company. Manage your operations with elegance
			and complete control.
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
			Optimized Interface, Intuitive for desktop and mobile. Your Experience is our priority on any
			device.
		</p>
	</div>
</div>

<style>
	.main-icon-svg {
		width: 55px;
		height: 55px;
		color: white;
	}
	.icon {
		width: 45px;
		height: 45px;
		color: #4f46e5;
		transition: all 0.3s ease;
	}
	.cards-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		width: 100%;
		max-width: 1800px;
	}
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

	.feature-card:hover .icon-container {
		background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
		border-radius: 10px;
	}
	.feature-card:hover .icon {
		color: white;
	}

	.feature-card-main {
		background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
		border-color: #6366f1;
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
	}

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
	/* Responsive Design */
	@media (max-width: 1024px) {
		.cards-container {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.feature-card-side {
			display: none;
		}
		.feature-card {
			min-height: 350px;
			padding: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.feature-card {
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
	}

	@media (max-width: 480px) {
		.feature-card {
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
	}
</style>
