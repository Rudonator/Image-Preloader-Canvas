class @Game

	constructor: () ->
		console.log("Game Launched.")
		@preloader = new Preloader(@)
		@preloader.setPath("images/game/")
		@preloader.addImage("test.png", "player")
		@preloader.preloadImages()

	preloadDone: () ->
		console.log("Preloader done.")

window.game = new Game()