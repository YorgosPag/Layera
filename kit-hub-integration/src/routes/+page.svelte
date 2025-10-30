<script>
	// ✅ ΥΠΟΧΡΕΩΤΙΚΗ ΧΡΗΣΗ @layera LEGO SYSTEMS - SINGLE SOURCES OF TRUTH
	import { onMount } from 'svelte';

	// ⚠️ ΠΡΟΣΩΡΙΝΟ: Αυτά πρέπει να έρθουν από @layera/constants
	// TODO: Μετατροπή σε import { REPOSITORY_CONFIG } from '@layera/constants';
	const REPOSITORY_URL = 'https://github.com/YorgosPag/Layera';
	const REPOSITORY_OWNER = 'YorgosPag';
	const REPOSITORY_NAME = 'Layera';

	// ⚠️ ΠΡΟΣΩΡΙΝΟ: Πρέπει να έρθει από @layera/tolgee
	// TODO: import { useLayeraTranslation } from '@layera/tolgee';
	// const { t } = useLayeraTranslation();

	// Kit Hub connection state
	let hubStatus = 'kit.hub.connecting'; // i18n key
	let isConnected = false;

	onMount(() => {
		// Simulate Kit Hub connection
		setTimeout(() => {
			hubStatus = 'kit.hub.connected';
			isConnected = true;
		}, 2000);
	});
</script>

<svelte:head>
	<title>Layera Kit Hub Integration</title>
	<meta name="description" content="Σύνδεση του Layera repository με το Kit Hub" />
</svelte:head>

<!-- ✅ ΧΡΗΣΗ @layera/tokens CSS Variables ΜΟΝΟ -->
<div class="kit-hub-container">
	<header class="kit-hub-header">
		<h1 class="kit-hub-title">🏗️ Layera Kit Hub Integration</h1>
		<p class="kit-hub-subtitle">Enterprise Repository Connection</p>
	</header>

	<section class="kit-hub-section connection-status">
		<h2>📡 Κατάσταση Σύνδεσης</h2>
		<div class="status {isConnected ? 'connected' : 'connecting'}">
			<span class="status-icon">{isConnected ? '✅' : '⏳'}</span>
			<span class="status-text">
				{isConnected ? 'Συνδέθηκε επιτυχώς!' : 'Συνδέεται...'}
			</span>
		</div>
	</section>

	<section class="kit-hub-section repository-info">
		<h2>📚 Repository Information</h2>
		<div class="kit-hub-card">
			<h3>
				<a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer">
					{REPOSITORY_OWNER}/{REPOSITORY_NAME}
				</a>
			</h3>
			<p>Layera Enterprise Authentication Platform - Monorepo</p>

			<div class="feature-grid">
				<div class="feature-item">🔧 Technologies: React, TypeScript, Firebase</div>
				<div class="feature-item">⚡ Features: Auth, GeoAlert, LEGO Components, i18n</div>
				<div class="feature-item">📦 Packages: 52 @layera LEGO systems</div>
				<div class="feature-item">🎯 Ports: 3000 (ID), 3001 (GeoAlert), 5173 (Kit Hub)</div>
			</div>
		</div>
	</section>

	{#if isConnected}
		<section class="kit-hub-section actions">
			<h2>🎮 Available Actions</h2>
			<div class="action-grid">
				<button class="kit-hub-button primary">🚀 Deploy to Production</button>
				<button class="kit-hub-button secondary">📊 View Analytics</button>
				<button class="kit-hub-button secondary">⚙️ Configure Settings</button>
				<button class="kit-hub-button secondary">📋 View Logs</button>
			</div>
		</section>
	{/if}
</div>

<style>
	/* ✅ ΑΠΟΚΛΕΙΣΤΙΚΗ ΧΡΗΣΗ @layera/tokens DESIGN TOKENS */
	@import '@layera/tokens/dist/tokens.css';

	.kit-hub-container {
		max-width: var(--la-size-96, 24rem);
		margin: 0 auto;
		padding: var(--la-space-8, 2rem);
		font-family: system-ui, -apple-system, sans-serif;
	}

	.kit-hub-header {
		text-align: center;
		margin-bottom: var(--la-space-12, 3rem);
	}

	.kit-hub-title {
		font-size: var(--la-text-3xl, 2.5rem);
		margin: 0;
		color: var(--la-color-text-primary, #1f2937);
		font-weight: 800;
	}

	.kit-hub-subtitle {
		font-size: var(--la-text-lg, 1.125rem);
		color: var(--la-color-text-secondary, #6b7280);
		margin: var(--la-space-2, 0.5rem) 0 0 0;
	}

	.kit-hub-section {
		margin-bottom: var(--la-space-12, 3rem);
		background: var(--la-color-surface, #ffffff);
		border-radius: var(--la-radius-lg, 1rem);
		padding: var(--la-space-8, 2rem);
		border: var(--la-border-width-1, 1px) solid var(--la-color-surface-tertiary, #f3f4f6);
	}

	.kit-hub-section h2 {
		color: var(--la-color-text-primary, #1f2937);
		border-bottom: var(--la-border-width-2, 2px) solid var(--la-color-surface-tertiary, #e5e7eb);
		padding-bottom: var(--la-space-2, 0.5rem);
		margin-top: 0;
	}

	.status {
		display: flex;
		align-items: center;
		gap: var(--la-space-4, 1rem);
		padding: var(--la-space-4, 1rem);
		border-radius: var(--la-radius-md, 0.5rem);
		transition: all 0.3s ease;
	}

	.status.connecting {
		background: var(--la-color-warning-light, #fef3c7);
		border: var(--la-border-width-1, 1px) solid var(--la-color-warning, #f59e0b);
	}

	.status.connected {
		background: var(--la-color-success-light, #d1fae5);
		border: var(--la-border-width-1, 1px) solid var(--la-color-success, #10b981);
	}

	.status-icon {
		font-size: var(--la-text-xl, 1.5rem);
	}

	.status-text {
		font-weight: 600;
		font-size: var(--la-text-lg, 1.125rem);
		color: var(--la-color-text-primary, #1f2937);
	}

	.kit-hub-card {
		border: var(--la-border-width-1, 1px) solid var(--la-color-surface-tertiary, #e5e7eb);
		border-radius: var(--la-radius-md, 0.5rem);
		padding: var(--la-space-6, 1.5rem);
	}

	.kit-hub-card h3 {
		margin: 0 0 var(--la-space-3, 0.75rem) 0;
	}

	.kit-hub-card h3 a {
		color: var(--la-color-primary, #3b82f6);
		text-decoration: none;
		font-size: var(--la-text-xl, 1.25rem);
	}

	.kit-hub-card h3 a:hover {
		text-decoration: underline;
	}

	.kit-hub-card p {
		margin: 0 0 var(--la-space-4, 1rem) 0;
		color: var(--la-color-text-secondary, #6b7280);
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--la-space-3, 0.75rem);
	}

	.feature-item {
		padding: var(--la-space-3, 0.75rem);
		background: var(--la-color-surface-secondary, #f9fafb);
		border-radius: var(--la-radius-sm, 0.375rem);
		font-size: var(--la-text-sm, 0.875rem);
		color: var(--la-color-text-primary, #374151);
	}

	.action-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--la-space-4, 1rem);
	}

	.kit-hub-button {
		padding: var(--la-space-3, 0.75rem) var(--la-space-6, 1.5rem);
		border: none;
		border-radius: var(--la-radius-md, 0.5rem);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: var(--la-text-sm, 0.875rem);
	}

	.kit-hub-button.primary {
		background: var(--la-color-primary, #3b82f6);
		color: var(--la-color-surface, #ffffff);
	}

	.kit-hub-button.primary:hover {
		background: var(--la-color-primary-dark, #2563eb);
	}

	.kit-hub-button.secondary {
		background: var(--la-color-surface-secondary, #f3f4f6);
		color: var(--la-color-text-primary, #374151);
		border: var(--la-border-width-1, 1px) solid var(--la-color-surface-tertiary, #d1d5db);
	}

	.kit-hub-button.secondary:hover {
		background: var(--la-color-surface-tertiary, #e5e7eb);
	}

	/* Responsive design using @layera viewport tokens */
	@media (max-width: 768px) {
		.kit-hub-container {
			padding: var(--la-space-4, 1rem);
		}

		.kit-hub-section {
			padding: var(--la-space-6, 1.5rem);
		}

		.feature-grid {
			grid-template-columns: 1fr;
		}

		.action-grid {
			grid-template-columns: 1fr;
		}
	}
</style>