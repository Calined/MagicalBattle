class AnimationState {
	constructor(posX = 0, posY = 0, scaleX = 1, scaleY = 1) {

		this.position = new Vector(posX, posY);
		this.scale = new Vector(scaleX, scaleY);

	}

}


class Animation {
	constructor() {

		this.currentProgress = 0;
		this.speed = 1;
		this.states = [];

		//set this to true if you want to disable the user inputs while the animation plays
		this.blocksInput = false;

	}
}



class Animations {

	constructor() {


	}

	static getNewAnimation(name) {

		let newAnimation = new Animation();

		switch (name) {

			case "drawCard":

				newAnimation.states.push(new AnimationState());
				newAnimation.states.push(new AnimationState(0, -100));

				break;

		}

		return newAnimation;

	}

}