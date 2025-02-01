<template>
	<div class="card-shadow header px-5 py-2 mb-5">
		<ul class="ul">
			<li class="li">About me</li>
			<li class="li">My Projects</li>
			<li class="li">FAQs</li>
		</ul>
	</div>

	<div style="width: 90%; margin: auto">
		<div class="card-shadow card px-5 py-2" style="display: flex">
			<img src="./assets/avatar.png" alt="Description of avatar" class="my-2 mr-4" style="width: 15%" />
			<div>
				<h1 class="h1">Hi! I'm Tomio Nagano!</h1>
				<h2 class="h2">He/Him</h2>
				<h3 class="h3">University student by day, and also by night</h3>
			</div>
		</div>
		<div class="mx-5">
			<div class="flex-container my-5">
				<div class="card-shadow mr-2 my-2 px-7 py-5 card-half">
					<h2 class="h2">Who am I?</h2>
					<p>
						I'm a progammer and mathematician working on a joint
						degree in computer science and mathematics.<br />
						In general I'd rather learn via a project than by
						sitting in class, so I make lots of projects for
						practice and for fun. My favourites are the projects
						that someone will actually use, simple or complex it's
						always satisfying to put my skills to use making
						someones life a bit easier. <br /><br />
						To relax I like to play video games. I mostly play
						strategy games like: Sid Miers Civilisation 6, Xcom2 and
						Chess, but I'm also a huge fan of Warframe. The whole
						game is amazing, from the immersive story telling to the
						buttery smooth movement system, to it's healthy
						monotisation model. Would highly recommend it, one of
						the best free to play games ever made.<br /><br />
						I also enjoy running DnD campaigns. I've been DM-ing for
						6 years now and I'd say I'm getting the hang of it,
						although the character mortality rate remains
						questionably high at my table :].<br />
					</p>
				</div>
				<div class="card-shadow card-half ml-2 my-2 px-7 py-5">
					<div class="mx-auto" style="width: 100%">
						<h2 class="h2">How about a game of chess?</h2>
						<chessBoard />
					</div>
				</div>
			</div>
			<div class="card-shadow card px-5 py-2">
				<h2 class="h2">My Projects</h2>
				<div class="project-card">
					<div style="display: flex"></div>
					<!--<img src="project1.png" alt="image for my first project">-->
					<div>
						<h3 class="h3">Project name</h3>
						<p>project description</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer card-shadow"></div>
</template>

<script setup>
import chessBoard from "./components/ChessBoard.vue";
</script>

<style></style>
