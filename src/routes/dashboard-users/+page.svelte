<script lang="ts">
	import { goto } from '$app/navigation';
	import { Building2, Ticket, Clock, CheckCircle2, AlertCircle } from '@lucide/svelte';

	let activeSection = $state('tickets');
	let mobileMenuOpen = $state(false);

	const sections = [
		{ id: 'tickets', label: 'Assigned Tickets', icon: Ticket },
		{ id: 'createticket', label: 'Create Ticket', icon: Ticket }
	];

	// Sample data

	const tickets = [
		{
			id: 1001,
			title: 'Login issues on mobile app',
			status: 'open',
			priority: 'high',
			department: 'IT Support',
			created: '2 hours ago'
		},
		{
			id: 1002,
			title: 'Request for new feature',
			status: 'in-progress',
			priority: 'medium',
			department: 'Development',
			created: '1 day ago'
		},
		{
			id: 1003,
			title: 'Payment processing error',
			status: 'open',
			priority: 'high',
			department: 'Sales',
			created: '30 minutes ago'
		},
		{
			id: 1004,
			title: 'Account verification needed',
			status: 'resolved',
			priority: 'low',
			department: 'Customer Service',
			created: '3 days ago'
		},
		{
			id: 1005,
			title: 'Email delivery failure',
			status: 'open',
			priority: 'medium',
			department: 'IT Support',
			created: '5 hours ago'
		}
	];

	// @ts-ignore
	function getStatusColor(status) {
		switch (status) {
			case 'open':
				return 'text-red-600 dark:text-red-400';
			case 'in-progress':
				return 'text-blue-600 dark:text-blue-400';
			case 'resolved':
				return 'text-green-600 dark:text-green-400';
			default:
				return 'text-slate-600 dark:text-slate-400';
		}
	}

	// @ts-ignore
	function getPriorityBadge(priority) {
		switch (priority) {
			case 'high':
				return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
			case 'medium':
				return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
			case 'low':
				return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
			default:
				return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
		}
	}

	async function logout() {
		try {
			const res = await fetch('/api/logout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				goto('/');
			}
		} catch (error) {
			console.error('Error al cerrar sesión:', error);
			// Redirigir de todos modos
			goto('/');
		}
	}
</script>

<div class="min-h-screen bg-background">
	<nav class="bg-primary text-primary-foreground shadow-lg">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-3">
					<h1 class="text-xl font-bold tracking-tight">SendedMaster Worker Panel</h1>
					<button onclick={logout} class="btn-login">Logout</button>
				</div>
				<div class="hidden md:flex items-center gap-2">
					{#each sections as section}
						<button
							onclick={() => {
								activeSection = section.id;
								mobileMenuOpen = false;
							}}
							class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all {activeSection ===
							section.id
								? 'bg-white/20'
								: 'hover:bg-white/10'}"
						>
							<section.icon class="w-5 h-5" />
							<span class="font-medium">{section.label}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
		{#if mobileMenuOpen}
			<div class="md:hidden border-t border-white/10">
				<div class="px-4 py-3 space-y-2">
					{#each sections as section}
						<button
							onclick={() => {
								activeSection = section.id;
								mobileMenuOpen = false;
							}}
							class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all {activeSection ===
							section.id
								? 'bg-white/20'
								: 'hover:bg-white/10'}"
						>
							<section.icon class="w-5 h-5" />
							<span class="font-medium">{section.label}</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</nav>
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
		{#if activeSection === 'tickets'}
			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold text-foreground">Tickets</h2>
					<button
						class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
					>
						Create Ticket
					</button>
				</div>

				<div class="space-y-4">
					{#each tickets as ticket}
						<div
							class="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
						>
							<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
								<div class="flex-1">
									<div class="flex items-center gap-3 mb-2">
										<span class="text-sm font-mono text-muted-foreground">#{ticket.id}</span>
										<span
											class="px-2 py-1 text-xs font-medium rounded-full {getPriorityBadge(
												ticket.priority
											)}"
										>
											{ticket.priority}
										</span>
									</div>
									<h3 class="text-lg font-semibold text-card-foreground mb-2">{ticket.title}</h3>
									<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
										<div class="flex items-center gap-2">
											<Building2 class="w-4 h-4" />
											{ticket.department}
										</div>
										<div class="flex items-center gap-2">
											<Clock class="w-4 h-4" />
											{ticket.created}
										</div>
									</div>
								</div>
								<div class="flex items-center gap-3">
									<div class="flex items-center gap-2 {getStatusColor(ticket.status)}">
										{#if ticket.status === 'resolved'}
											<CheckCircle2 class="w-5 h-5" />
										{:else}
											<AlertCircle class="w-5 h-5" />
										{/if}
										<span class="font-medium capitalize">{ticket.status}</span>
									</div>
									<button
										class="px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
									>
										View Details
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Added Create Ticket form section -->
		{#if activeSection === 'createticket'}
			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold text-foreground">Create New Ticket</h2>
				</div>

				<div class="bg-card border border-border rounded-xl p-8 shadow-lg">
					<form class="space-y-6">
						<!-- Ticket Title -->
						<div class="space-y-2">
							<label for="title" class="block text-sm font-semibold text-card-foreground">
								Ticket Title <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="title"
								name="title"
								placeholder="Enter a brief description of the issue"
								class="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
							/>
						</div>

						<!-- Department and Priority Row -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<!-- Department -->
							<div class="space-y-2">
								<label for="department" class="block text-sm font-semibold text-card-foreground">
									Department <span class="text-red-500">*</span>
								</label>
								<select
									id="department"
									name="department"
									class="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
								>
									<option value="">Select a department</option>
									<option value="it-support">IT Support</option>
									<option value="development">Development</option>
									<option value="sales">Sales</option>
									<option value="customer-service">Customer Service</option>
									<option value="hr">Human Resources</option>
									<option value="finance">Finance</option>
								</select>
							</div>

							<!-- Priority -->
							<div class="space-y-2">
								<label for="priority" class="block text-sm font-semibold text-card-foreground">
									Priority <span class="text-red-500">*</span>
								</label>
								<select
									id="priority"
									name="priority"
									class="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
								>
									<option value="">Select priority level</option>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</select>
							</div>
						</div>

						<!-- Description -->
						<div class="space-y-2">
							<label for="description" class="block text-sm font-semibold text-card-foreground">
								Description <span class="text-red-500">*</span>
							</label>
							<textarea
								id="description"
								name="description"
								rows="6"
								placeholder="Provide detailed information about the issue or request..."
								class="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
							></textarea>
						</div>

						<!-- Form Actions -->
						<div class="flex flex-col sm:flex-row gap-4 pt-4">
							<button
								type="submit"
								class="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
							>
								Submit Ticket
							</button>
						</div>

						<!-- Required Fields Note -->
						<p class="text-xs text-muted-foreground text-center pt-2">
							<span class="text-red-500">*</span> Required fields
						</p>
					</form>
				</div>
			</div>
		{/if}
	</main>

	<nav
		class="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl bg-gray-600/15 backdrop-blur-lg"
	>
		<div class="flex items-center justify-around px-4 py-4">
			{#each sections as section}
				<button
					onclick={() => (activeSection = section.id)}
					class="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 {activeSection ===
					section.id
						? 'bg-primary text-primary-foreground scale-110 -translate-y-2 shadow-lg'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					<section.icon class="w-6 h-6" />
					<span class="text-xs font-medium">{section.label}</span>
				</button>
			{/each}
		</div>
	</nav>
</div>

<style>
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
		background: rgb(255, 0, 0);
		color: white;
		border: 1.5px solid rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
	}

	.btn-login:hover {
		background: rgba(255, 0, 0, 0.733);
		border-color: rgba(109, 105, 105, 0.788);
	}
</style>
