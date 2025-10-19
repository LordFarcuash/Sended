<script lang="ts">
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	let loginError = false;

	async function handleLogin(e: Event) {
		e.preventDefault();

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await res.json();

		if (data.success) {
			// Redirigir según el rol
			if (data.role === 'admin') {
				console.log('Usuario admin');
				goto('/dashboard-admin');
			} else {
				console.log('Usuario normal');
				goto('/');
			}
		} else {
			loginError = true;
		}
	}
</script>

<div class="login-cards-container">
	<div class="login-card">
		<h2 class="login-title">Login Form</h2>
		<form on:submit={handleLogin} class="login-form">
			<div class="form-group">
				<input
					type="text"
					bind:value={username}
					placeholder=" "
					class="form-input {loginError ? 'input-error' : ''}"
					required
				/>
				<label class="form-label">Username</label>
			</div>

			<div class="form-group">
				<input
					type="password"
					bind:value={password}
					placeholder=" "
					class="form-input {loginError ? 'input-error' : ''}"
					required
				/>
				<label class="form-label">Password</label>
			</div>

			{#if loginError}
				<p class="text-red-600 text-sm mb-2">Invalid username or password.</p>
			{/if}

			<button type="submit" class="submit-btn">Login</button>
		</form>
	</div>
</div>

<style>
	.login-cards-container {
		display: flex;
		width: 100%;
		max-width: 500px;
		justify-content: center;
	}

	.login-card {
		background: white;
		border-radius: 12px;
		padding: 2.5rem;
		border: 2px solid #e0e7ff;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		width: 100%;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
	}

	.login-card:hover {
		border-color: #6366f1;
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
	}

	.login-title {
		color: #2d3e5f;
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		text-align: center;
		letter-spacing: 0.5px;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		position: relative;
		width: 100%;
	}

	.form-input {
		width: 100%;
		padding: 0.875rem 1rem;
		border: 2px solid #e0e7ff;
		border-radius: 8px;
		font-size: 1rem;
		font-family: 'Kode Mono', monospace;
		color: #2d3e5f;
		background: white;
		transition: all 0.3s ease;
		outline: none;
	}

	.form-input:focus {
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}

	.form-input:focus ~ .form-label,
	.form-input:not(:placeholder-shown) ~ .form-label {
		top: -0.75rem;
		left: 1rem;
		background: white;
		padding: 0 0.375rem;
		color: #6366f1;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.form-label {
		position: absolute;
		left: 1rem;
		top: 0.875rem;
		color: #6b7280;
		font-size: 1rem;
		font-family: 'Kode Mono', monospace;
		pointer-events: none;
		transition: all 0.3s ease;
	}

	.submit-btn {
		width: 100%;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		font-family: 'Kode Mono', monospace;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 1rem;
	}

	.submit-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
	}

	.submit-btn:active {
		transform: translateY(0);
	}

	.input-error {
		width: 100%;
		padding: 0.875rem 1rem;
		border: 2px solid #ff0000;
		border-radius: 8px;
		font-size: 1rem;
		font-family: 'Kode Mono', monospace;
		color: #2d3e5f;
		background: white;
		transition: all 0.3s ease;
		outline: none;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
	}

	@media (max-width: 768px) {
		.login-cards-container {
			max-width: 100%;
		}
	}

	@media (max-width: 480px) {
		.login-card {
			padding: 1.5rem;
		}

		.login-title {
			font-size: 1.25rem;
		}

		.form-input {
			padding: 0.75rem 0.875rem;
			font-size: 0.95rem;
		}

		.submit-btn {
			padding: 0.75rem 1rem;
			font-size: 0.9rem;
		}
	}
</style>
