import { Observable } from "@nativescript/core";

export class MainPageModel extends Observable {
	private _counter: number;
	private _message: string;
	private _tab: number;
	public buttons: Array<any>;

	constructor() {
		super();

		// Initialize default values.
		this._counter = 42;
		this.updateMessage();
		this._tab = 0;
	}

	get message(): string {
		return this._message;
	}

	set message(value: string) {
		if (this._message !== value) {
			this._message = value;
			this.notifyPropertyChange("message", value);
		}
	}

	onTap() {
		this._counter--;
		this.updateMessage();
	}

	onChangingTab(args) {
		if (this._tab != parseInt(args.object.id)) {
			this._tab = parseInt(args.object.id);
			this.buttons.forEach((el) => {
				el.getChildAt(0).tintColor = "black";
				el.getChildAt(1).color = "black";
			});
			args.object.getChildAt(0).tintColor = "white";
			args.object.getChildAt(1).color = "white";
		}
	}

	private updateMessage() {
		if (this._counter <= 0) {
			this.message =
				"Hoorraaay! You unlocked the NativeScript clicker achievement!";
		} else {
			this.message = `${this._counter} taps left`;
		}
	}
}
