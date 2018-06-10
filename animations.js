class AnimationState {
	constructor(posX = 0, posY = 0, scaleX = 1, scaleY = 1) {

		this.position = new Vector(posX, posY);
		this.scale = new Vector(scaleX, scaleY);

	}

}


class Animation {
	constructor(object) {

		this.object = object;

		this.currentProgress = 0;
		this.speed = 1;
		this.states = [];

		//set this to true if you want to disable the user inputs while the animation plays
		this.blocksInput = false;

	}

	process(delta) {

		//running at 60 fps
		//but should also hand over the delta time of the last frame

		this.currentProgress += delta / 1000;

		if (this.currentProgress < 1) {

			//lerp between the two states on the current progress
			this.object.x = Util.lerp(this.states[0].position.x, this.states[1].position.x, this.currentProgress);
			this.object.y = Util.lerp(this.states[0].position.y, this.states[1].position.y, this.currentProgress);

			this.object.scale.x = Util.lerp(this.states[0].scale.x, this.states[1].scale.x, this.currentProgress);
			this.object.scale.y = Util.lerp(this.states[0].scale.y, this.states[1].scale.y, this.currentProgress);

		} else {
			//remove the animation from the stack
			this.object.activeAnimations.splice(Util.getIndex(this.object.activeAnimations, this), 1);

			//and delete it
			delete this;
		}

	}

}



class Animations {

	constructor() {

	}

	static getNewAnimation(name, object) {

		let newAnimation = new Animation(object);

		switch (name) {

			case "drawCard":

				newAnimation.states.push(new AnimationState());
				newAnimation.states.push(new AnimationState(0, -100));

				break;

		}

		return newAnimation;

	}

}