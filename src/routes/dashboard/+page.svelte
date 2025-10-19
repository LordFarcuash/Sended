<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Menu,
		Building2,
		Key,
		Ticket,
		Users,
		Clock,
		CheckCircle2,
		AlertCircle
	} from '@lucide/svelte';

	let activeSection = $state('tickets');
	let mobileMenuOpen = $state(false);

	const sections = [
		{ id: 'departments', label: 'Departments', icon: Building2 },
		{ id: 'credentials', label: 'Credentials', icon: Key },
		{ id: 'tickets', label: 'Tickets', icon: Ticket },
		{ id: 'Assigned', label: 'Assigned', icon: Ticket }
	];

	// Sample data
	const departments = [
		{ id: 1, name: 'IT Support', members: 12, activeTickets: 23 },
		{ id: 2, name: 'Sales', members: 8, activeTickets: 15 },
		{ id: 3, name: 'Customer Service', members: 15, activeTickets: 42 },
		{ id: 4, name: 'Development', members: 20, activeTickets: 8 }
	];

	const credentials = [
		{ id: 1, service: 'Database Server', username: 'admin', lastUsed: '2 hours ago' },
		{ id: 2, service: 'Email Server', username: 'support@company.com', lastUsed: '1 day ago' },
		{ id: 3, service: 'Cloud Storage', username: 'cloud-admin', lastUsed: '3 hours ago' },
		{ id: 4, service: 'API Gateway', username: 'api-key-001', lastUsed: '30 minutes ago' }
	];

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

	function logout() {
		goto('/');
	}
</script>

<div class="min-h-screen bg-background">
	<nav class="bg-primary text-primary-foreground shadow-lg">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-3">
					<h1 class="text-xl font-bold tracking-tight">SendedMaster</h1>
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
		{#if activeSection === 'departments'}
			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold text-foreground">Departments</h2>
					<button
						class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
					>
						Add Department
					</button>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each departments as dept}
						<div
							class="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
						>
							<div class="flex items-start justify-between mb-4">
								<div class="p-3 bg-primary/10 rounded-lg">
									<Building2 class="w-6 h-6 text-primary" />
								</div>
								<span class="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
									{dept.activeTickets} active
								</span>
							</div>
							<h3 class="text-xl font-semibold text-card-foreground mb-2">{dept.name}</h3>
							<div class="flex items-center gap-2 text-muted-foreground">
								<Users class="w-4 h-4" />
								<span class="text-sm">{dept.members} members</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if activeSection === 'credentials'}
			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold text-foreground">Credentials</h2>
					<button
						class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
					>
						Add Credential
					</button>
				</div>

				<div class="bg-card border border-border rounded-xl overflow-hidden">
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead class="bg-muted">
								<tr>
									<th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Service</th>
									<th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Username</th
									>
									<th class="px-6 py-4 text-left text-sm font-semibold text-foreground"
										>Last Used</th
									>
									<th class="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th
									>
								</tr>
							</thead>
							<tbody class="divide-y divide-border">
								{#each credentials as cred}
									<tr class="hover:bg-muted/50 transition-colors">
										<td class="px-6 py-4">
											<div class="flex items-center gap-3">
												<div class="p-2 bg-primary/10 rounded-lg">
													<Key class="w-4 h-4 text-primary" />
												</div>
												<span class="font-medium text-card-foreground">{cred.service}</span>
											</div>
										</td>
										<td class="px-6 py-4 text-muted-foreground font-mono text-sm"
											>{cred.username}</td
										>
										<td class="px-6 py-4">
											<div class="flex items-center gap-2 text-muted-foreground text-sm">
												<Clock class="w-4 h-4" />
												{cred.lastUsed}
											</div>
										</td>
										<td class="px-6 py-4 text-right">
											<button
												class="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
											>
												View
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/if}

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
