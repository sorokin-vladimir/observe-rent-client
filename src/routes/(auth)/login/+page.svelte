
<script lang="ts">
	import { SignInForm } from '$lib/components';

	// TODO: correct presenting errors


	let errors: string[] = [];

  async function signIn(event: CustomEvent<any>) {
		console.log(`SignIn | email: ${event.detail.email} | pwd: ${event.detail.password}`,);
	}

</script>

<div class="wrapper">
	<h2>Login to your account</h2>

	<div>
		{#if errors}
			{#each errors as error, i (i)}
				<div class="notification-block">
					<p>{error}</p>
				</div>
			{/each}
		{/if}

		<SignInForm on:signin={signIn} />

		<div class="bottom-helper">Does not have an account yet? <a href="/signup" class="link">Sign Up</a></div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 20rem;

		.bottom-helper {
			margin-top: 2rem;

			.link {
				color: rgba(var(--y-blue-rgb), 1);
				&:hover {
					text-decoration: none;
					color: rgba(var(--y-blue-rgb), 1);
				}
			}
		}
	}
</style>
