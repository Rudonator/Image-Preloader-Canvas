class @Preloader

  constructor: (game) ->
    @images = new Array()
    @preloaded = 0
    @game = game
    @path = ""

  setPath: (path) ->
    @path = path
    console.log("[Preloader] Set path to: " + path)

  addImage: (src, name) ->
    if(!@images.push('
      {
          "name": "' + name + '",
          "src": "' + @path + src + '",
          "image": null
      }
    '))
      throw "[Preloader] Error while adding image"
    console.log("[Preloader] Added image: Path: " + @path + src + ", Name: " + name)

  getImage: (name) ->
    for i in [0...@images.length]
      json = JSON.parse(@images[i])
      if(json["name"] == name)
        @images[i] ?= @getImage("no_images")

  preloadImages: () ->
    if(@images.length <= 0)
      @updateBar()
    for i in [0...@images.length]
      json = JSON.parse(@images[i])
      name = json["name"]
      src = json["src"]
      image = new Image()
      image.src = src
      image.onload = =>
        @preloaded++
        @images[i] = ["name": name, "src": src, "image": image]
        @updateBar()

  updateBar: () ->
    bar = document.getElementById("preloader_move")
    wb = 400
    total = @images.length - 1
    if(total <= 0)
      bar.style.width = wb + "px"
      return

    w = wb / total
    bar.style.width = w * @preloaded + "px"
    if(@preloaded >= total)
      @game.preloadDone()