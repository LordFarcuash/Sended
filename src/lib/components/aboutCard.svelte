<script></script>

<div class="about-cards-container">
	<div class="about-card">
		<div class="icon-container main-icon">
			<svg class="icon main-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
			</svg>
		</div>
		<h3 class="card-title">Easy Software Set Up</h3>
		<p class="card-description">
			Follow the video on Github to setup everything you need for this project to work. Every step
			is well explain for your technicians and non-technicians to set it up.
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
						<path class="cls-2" d="M18.68,10.11H22.5v9.55a2.87,2.87,0,0,1-5.73,0V10.11h1.91Z"
						></path>
					</g>
				</g></svg
			>
		</div>
		<h3 class="card-title">This Software Allow You to</h3>
		<p class="card-description">
			This software can Create User for Each department for them Creating Tickets for other
			departments, creating a self controlled ticket sistem.
		</p>
	</div>
</div>

<style>
	.about-cards-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		width: 100%;
		max-width: 1800px;
	}
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

	/* Responsive Design */
	@media (max-width: 1024px) {
	}

	@media (max-width: 768px) {
		.about-card {
			min-height: 350px;
			padding: 1.5rem;
		}

		.card-title {
			font-size: 1.1rem;
		}

		.card-description {
			font-size: 0.85rem;
		}
	}

	@media (max-width: 480px) {
		.about-card {
			min-height: 400px;
			padding: 1rem;
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
