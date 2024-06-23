<template>
	<MainContainer class="Notfound404">
		<div class="illust">
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 307.6 153.2"
			>
				<g style="fill: #d8d8d8">
					<path
						class="st1"
						d="M74,72.7l10.6-1.4c1.9-0.2,3.6,1.1,3.8,3l1.4,10.6c0.2,1.9-1.1,3.6-3,3.8L76.3,90c-1.9,0.2-3.2,2-3,3.8
						l2.1,15.9c0.2,1.9-1.1,3.6-3,3.8l-12.7,1.6c-1.9,0.2-3.6-1.1-3.8-3l-2-15.6c-0.2-1.9-2-3.2-3.8-3L5.6,99.4
						c-1.9,0.2-3.6-1.1-3.8-3L0,83c0-0.5,0-1,0.2-1.6L26.6,5.9c0.4-1.2,1.5-2.1,2.8-2.3L57.8,0c1.9-0.2,3.6,1.1,3.8,3l8.6,66.7
						C70.5,71.6,72.2,72.9,74,72.7z M50.7,72.2l-5.2-40.6c-0.5-3.6-5.4-4.1-6.6-0.7L23.2,74.2c-0.9,2.4,1.1,4.9,3.6,4.6l20.9-2.7
						C49.6,75.8,51,74.1,50.7,72.2L50.7,72.2z"
					/>
					<path
						class="st1"
						d="M159.6,32.6c17.2,0,31.4,14,31.4,31.3v52.5c0,17.4-14.1,31.4-31.4,31.4h-17.1c-17.2,0-31.2-14-31.2-31.3
						V63.9c0-17.4,14-31.3,31.2-31.3C142.5,32.6,159.6,32.6,159.6,32.6z M171.4,67.4c0-7.9-6.3-14.4-14.1-14.4h-12.5
						c-7.8,0-14.1,6.5-14.1,14.4v45.5c0,7.9,6.3,14.4,14.1,14.4h12.5c7.8,0,14.1-6.5,14.1-14.4V67.4z"
					/>
					<path
						class="st1"
						d="M287.1,87.8l10.5,1.9c1.9,0.3,3.1,2.1,2.8,4l-1.9,10.5c-0.3,1.9-2.1,3.1-4,2.8l-10.5-2
						c-1.9-0.3-3.6,0.9-4,2.8l-2.8,15.8c-0.3,1.9-2.1,3.1-4,2.8l-12.6-2.3c-1.9-0.3-3.1-2.1-2.8-4l2.8-15.5c0.3-1.9-0.9-3.6-2.8-4
						l-44.1-7.9c-1.9-0.3-3.1-2.1-2.8-4l2.4-13.3c0.1-0.5,0.3-1,0.6-1.4l47.9-64.1c0.8-1,2.1-1.6,3.4-1.3l28.2,5.1
						c1.9,0.3,3.1,2.1,2.8,4l-11.9,66.2C284,85.7,285.2,87.4,287.1,87.8L287.1,87.8z M265,80.3l7.2-40.3c0.6-3.5-3.9-5.5-6.1-2.7
						l-28,36.6c-1.6,2-0.4,5,2.1,5.4L261,83C262.9,83.4,264.6,82.2,265,80.3L265,80.3z"
					/>
				</g>
			</svg>
		</div>
		<p>This page does not exist</p>
		<div class="button_wrap">
			<router-link to="/" class="c_button primary">Return Home</router-link>
		</div>
	</MainContainer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.Notfound404 {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.illust {
		margin-bottom: var(--space-mid);
		width: 24rem;
		svg {
			width: 100%;
		}
	}
	p {
		font-size: var(--font-size-large);
		color: var(--color-font-light);
		font-weight: var(--font-w-mid);
	}
	.button_wrap {
		margin-top: 2rem;
	}
}
</style>
