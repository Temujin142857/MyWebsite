<template>
	<div class="card-shadow header px-5 py-2 mb-5">
		<ul class="ul">
			<li class="li"><a href="#about-me">About me</a></li>
			<li class="li"><a href="#projects">My Projects</a></li>
			<li class="li">FAQs</li>
		</ul>
	</div>

	<div style="width: 90%; margin: auto">
		<div class="card-shadow card px-5 py-2" style="display: flex">
			<div style="width: 15%">
				<img
					src="/assets/avatar.png"
					alt="Description of avatar"
					class="mr-4"
				/>
				<p class="mb-2 ml-8">art by @mostefai</p>
			</div>
			<div>
				<h1 class="h1" id="about-me">Hi! I'm Temujin142857!</h1>
				<h2 class="h2">He/Him</h2>
				<h3 class="h3">Chilling and reading Dune for the first time</h3>
				<h3 class="h3">
					This website is still a work in progress, got the chessboard
					mostly working though :]
				</h3>
				<p>
					<a
						class="link"
						href="https://github.com/Temujin142857"
						target="_blank"
						>Github</a
					>
				</p>
			</div>
			<!-- add my resume, but only if they have a link with the token -->
		</div>
		<div class="mx-5">
			<div class="flex-container my-5">
				<div class="card-shadow mr-2 my-2 px-7 py-5 card-half">
					<h2 class="h2">Who am I?</h2>
					<p>
						I go by a few usernames online, Temujin142857,
						ThePhilosopher, forgotMyWaterBottle, ect. Often I'll
						have 142857 in there somewhere, if you're not familiar
						with that particular number, I recommend looking up the
						pattern in the repeating decimals of sevenths. 1/2,
						2/7,... it's a neat quirk of base 10. <br /><br />
						I'm a programmer and mathematician with an undergrad
						degree in computer science and mathematics.<br />
						I've mostly been into quantum computing recently, but
						spending my days dealing with abstract linear algebra
						hasn't been as entertaining as I thought it might be. So
						instead I'm thinking of looking more at traditional comp
						sci topics like writing a compiler and optimising my
						chess engine for a while. <br /><br />
						In my free time I like to read and play video games. I
						mostly play strategy games like Sid Miers Civilisation
						6, Xcom2 and Chess, but I'm also a huge fan of Warframe.
						The whole game is amazing, from the immersive story
						telling to the buttery smooth movement system, to it's
						healthy monotisation model. Would highly recommend it,
						one of the best free to play games ever made.<br /><br />
						I also run a few DnD campaigns each year. I've been
						DM-ing for 7 years now and I'd say I'm getting the hang
						of it, although the character mortality rate remains
						fairly high at my table :].<br />
					</p>
				</div>
				<div class="card-shadow card-half ml-2 my-2 px-7 py-5">
					<div class="mx-auto" style="width: 100%">
						<h2 class="h2" style="margin-bottom: 4px;">How about a game of chess? You go first!</h2>
						<chessBoard />
					</div>
				</div>
			</div>
			<div class="card-shadow card px-5 py-2">
				<h2 class="h2" id="projects">My Projects</h2>
				<p class="mb-5">
					These are my favourite personnel projects, my other projects
					and projects made for school can be found on my github.
				</p>
				<div class="project-card">
					<div style="display: flex"></div>
					<!--<img src="project1.png" alt="image for my first project">-->
					<div>
						<h3 class="h3">
							<a
								class="link"
								href="https://github.com/Temujin142857/Chess_Engine"
								target="_blank"
								>Chess Engine</a
							>
						</h3>
						<p>
							I made a chess board and engine in Java. It's pretty
							good, I'd say around 2000 elo when I run it on my
							main computer. This online version is hosted on a
							laptop with 2gb of ram and a barely working cpu, so
							it's quite a lot weaker than when it's run locally.
							To determine it's move it uses a minmax search with
							Alpha-beta pruning.<sup class="link"
								><a
									href="https://en.wikipedia.org/wiki/Alpha–beta_pruning"
									target="_blank"
									>1</a
								></sup
							>
							<br />
							Just for fun I decided to write the evaluation
							algorithm myself with my somewhat decent chess
							knowledge. That's probably the main reason it's only
							2000 elo, since the weights it uses to determine the
							strength of a given position were decided on vibe.
						</p>
					</div>
				</div>
				<div class="project-card">
					<div style="display: flex"></div>
					<!--<img src="project1.png" alt="image for my first project">-->
					<div>
						<h3 class="h3">
							<a
								class="link"
								href="https://github.com/Temujin142857/MyWebsite"
								target="_blank"
								>This Website</a
							>
						</h3>
						<p>
							This website was made to serve as an introduction to
							myself, and to showcase some of my projects. I'm
							well known for doing things the hard way and taking
							on unnecesary challenges, so I thought instead of
							just linking my projects I'd try to build some of
							them into the site.<br />
							The chess engine is the first that I've got working
							on here. I made a headless version of the engine and
							a chess board in vue.js.<br />
							From there I set up an api which can run the
							headless app and pass moves from the engine to my
							website.
						</p>
					</div>
				</div>
				<div class="project-card">
					<div style="display: flex"></div>
					<!--<img src="project1.png" alt="image for my first project">-->
					<div>
						<h3 class="h3">
							<a
								class="link"
								href="https://github.com/Temujin142857/DraftDex"
								target="_blank"
								>DraftDex</a
							>
						</h3>
						<p>
							This is a fun one! It's a website I made for
							teambuilding in Pokemon Draft Leagues. A Pokemon
							Draft League is pretty much a tournament where at
							the start everyone drafts a roster of 12 pokemon,
							and then uses it to make a team of 6 for each round
							of the tournament. I used to use a teambuilder and a
							damage calculator each in theor own tab when
							teambuilding for a draft league, and this website is
							the two combined into one page.
							<br />
							You can find the website here, assuming I redeployed it:
							<a
								class="link"
								href="https://draftdex.temujin142857.ca"
								target="_blank"
								>DraftDex</a
							>.
							<br />
							I wrote it in React, so I could use the frontend as
							a submition for a class project, but I generally
							prefer Vue. It's a very fat client architecture,
							where everything takes place in the clients browser,
							even the database calls. I know that's generally not
							ideal, but it's not like there's anything sensitive
							in the data, and I'm running it and this website on
							the same old laptop with 2gb of ram.
						</p>
					</div>
				</div>
				<div class="project-card">
					<div style="display: flex"></div>
					<!--<img src="project1.png" alt="image for my first project">-->
					<div>
						<h3 class="h3">
							<a
								class="link"
								href="https://github.com/Temujin142857/RatsInARoom"
								target="_blank"
								>RatsInARoom</a
							>
						</h3>
						<p>
							This one is still a work in progress, but it's the
							one I'm the most proud of already. I won't say too
							much yet but it's going to be good!
							<br />
							This is an ESOLang (esotaric language) based on the
							"crazy? I was crazy once" copy pasta. It will be
							what I'm calling the first Rat Orients Programmling
							language.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer card-shadow"></div>
</template>

<script setup>
import chessBoard from "./components/ChessBoard.vue";
//add some code to verify the token to maybe return my resume, email, and phone
</script>

<style></style>
