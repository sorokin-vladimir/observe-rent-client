
<script lang="ts">
	import { SignUpFrom } from '$lib/components';


	let errors: string[] = [];

  async function signUp(event: CustomEvent<any>) {
		console.log(`SignIn | email: ${event.detail.email} | name: ${event.detail.username} | pwd: ${event.detail.password}`,);
	}

</script>

<div class="wrapper">
	<h2>Create new account</h2>

	<div>
		{#if errors}
			{#each errors as error, i (i)}
				<div class="notification-block">
					<p>{error}</p>
				</div>
			{/each}
		{/if}

		<SignUpFrom on:signup={signUp} />

		<div class="bottom-helper">Already have an account? <a href="/login" class="link">LogIn</a></div>
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
