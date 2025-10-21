<script lang="ts">
	import { goto } from '$app/navigation';
	import { Building2, Ticket, BadgeCheck, BadgeX } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();

	let tickets = $derived(data.tickets);
	let departments = $derived(data.departments);

	let activeSection = $state('tickets');
	let mobileMenuOpen = $state(false);

	let showTicketModal = $state(false);
	let TicketForm = $state({ title: '', department: '', description: '', priority: '' });

	const sections = [{ id: 'tickets', label: 'Assigned Tickets', icon: Ticket }];

	function getStatusColor(status: string) {
		switch (status) {
			case 'Pending':
				return 'text-yellow-600 dark:text-blue-400';
			case 'Solved':
				return 'text-green-600 dark:text-green-400';
			default:
				return 'text-slate-600 dark:text-slate-400';
		}
	}

	function getPriorityBadge(priority: string) {
		switch (priority) {
			case 'High':
				return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
			case 'Medium':
				return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
			case 'Low':
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

	function openTicketModal() {
		showTicketModal = true;
	}

	function closeTicketModal() {
		showTicketModal = false;
		TicketForm = { title: '', department: '', description: '', priority: '' };
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
					<h2 class="text-3xl font-bold text-foreground">Department Tickets</h2>
					<button
						onclick={openTicketModal}
						class="px-4 py-2 bg-slate-300 text-black rounded-[15px] font-bold text-foreground text-[0.8rem] hover:bg-slate-400 transition-opacity shadow-lg"
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
									</div>
								</div>
								<div class="flex items-center gap-3">
									<div class="flex items-center gap-2 {getStatusColor(ticket.status)}">
										{#if ticket.status === 'Solved'}
											<BadgeCheck class="w-5 h-5" />
										{:else}
											<BadgeX class="w-5 h-5" />
										{/if}
										<span class="font-medium capitalize">{ticket.status}</span>
									</div>
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

{#if showTicketModal}
	<div
		class="fixed inset-0 bg-slate-200/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
		onclick={closeTicketModal}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
				closeTicketModal();
			}
		}}
		role="button"
		aria-label="Close modal"
		tabindex="0"
	>
		<div
			class="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full p-6"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-2xl font-bold text-foreground">Create Ticket</h3>
				<button
					onclick={closeTicketModal}
					aria-label="Close dialog"
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<form
				onsubmit={(e) => {
					e.preventDefault();
				}}
				class="space-y-4"
				method="POST"
				action="?/createTicket"
				use:enhance
			>
				<div>
					<label for="ticket-title" class="block text-sm font-medium text-foreground mb-2">
						Ticket Title
					</label>
					<input
						id="ticket-title"
						type="text"
						name="title"
						bind:value={TicketForm.title}
						required
						class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
						placeholder="Enter department name"
					/>
				</div>

				<div>
					<label for="ticket-department" class="block text-sm font-medium text-foreground mb-2">
						Select Department
					</label>
					<select
						id="ticket-department"
						name="department"
						bind:value={TicketForm.department}
						required
						class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
					>
						<option value="" disabled selected>Select a department</option>
						{#each departments as dept}
							<option value={dept.name}>{dept.name}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="dept-password" class="block text-sm font-medium text-foreground mb-2">
						Description
					</label>
					<textarea
						id="ticket-description"
						name="description"
						bind:value={TicketForm.description}
						required
						class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
						placeholder="Enter ticket description"
					></textarea>
				</div>
				<div>
					<label for="dept-password" class="block text-sm font-medium text-foreground mb-2">
						Priority
					</label>
					<select
						id="ticket-priority"
						name="priority"
						bind:value={TicketForm.priority}
						required
						class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
					>
						<option value="" disabled selected>Select priority</option>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>

				<div class="flex gap-3 pt-4">
					<button
						type="button"
						onclick={closeTicketModal}
						class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg"
					>
						Create
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

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
