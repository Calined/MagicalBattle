class Animations {

	constructor() {

		this.drawCard = new Animation();
		this.drawCard.states.push(new AnimationState());
		this.drawCard.states.push(new AnimationState(0, -100));

	}

}