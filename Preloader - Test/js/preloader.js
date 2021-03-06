// Generated by CoffeeScript 1.7.1
(function() {
  var LoadedImage;

  this.Preloader = (function() {
    function Preloader(game) {
      this.images = new Array();
      this.out = new Array();
      this.preloaded = 0;
      this.game = game;
      this.path = "";
    }

    Preloader.prototype.setPath = function(path) {
      this.path = path;
      return console.log("[Preloader] Set path to: " + path);
    };

    Preloader.prototype.addImage = function(src, name) {
      if (!this.images.push('{ "name": "' + name + '", "src": "' + this.path + src + '", "image": null }')) {
        throw "[Preloader] Error while adding image";
      }
      return console.log("[Preloader] Added image: Path: " + this.path + src + ", Name: " + name);
    };

    Preloader.prototype.getImage = function(name) {
      var i, json, _i, _ref;
      console.log(this.out);
      for (i = _i = 0, _ref = this.out.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        json = this.out[i];
        console.log("Name: " + json.name + ", " + name);
        if (json.name === name) {
          console.log("match");
          return json.image;
        }
      }
    };

    Preloader.prototype.preloadImages = function() {
      var i, image, json, name, src, _i, _ref, _results;
      if (this.images.length <= 0) {
        this.updateBar();
      }
      _results = [];
      for (i = _i = 0, _ref = this.images.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        json = JSON.parse(this.images[i]);
        name = json["name"];
        src = json["src"];
        image = new Image();
        image.src = src;
        _results.push(new LoadedImage(this, name, src, image));
      }
      return _results;
    };

    Preloader.prototype.updateBar = function() {
      var bar, total, w, wb;
      bar = document.getElementById("preloader_move");
      wb = 400;
      total = this.images.length - 1;
      if (total <= 0) {
        bar.style.width = wb + "px";
        return;
      }
      w = wb / total;
      bar.style.width = w * this.preloaded + "px";
      if (this.preloaded >= total) {
        return this.game.preloadDone();
      }
    };

    return Preloader;

  })();

  LoadedImage = (function() {
    function LoadedImage(loader, name, src, image) {
      this.loader = loader;
      this.name = name;
      this.src = src;
      this.image = image;
      this.image.onload = (function(_this) {
        return function() {
          _this.loader.updateBar();
          if (_this.loader.out.push(_this)) {
            console.log("Added image" + _this.name);
            return _this.loader.preloaded++;
          } else {
            return console.log("Error adding image" + _this.name);
          }
        };
      })(this);
    }

    return LoadedImage;

  })();

}).call(this);
