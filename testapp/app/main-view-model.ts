import { Observable } from "@nativescript/core";

export class MainPageModel extends Observable {
	private _message: string;

	constructor() {
		super();
		this.message = "Result = 0";
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
		this.updateMessage();
	}

	private updateMessage() {
		console.log(new Date());
		let result = 0;
		for (let j = 1; j <= 5; j++) {
			for (let k = 1; k <= 100000; k++) {
				result +=
					Math.log2(k) + (3 * k) / (2 * j) + Math.sqrt(k) + Math.pow(k, j - 1);
			}
		}
		console.log(new Date());
		this.message = "Result = " + result;
	}
}

/* 
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
		this._tab = 1;
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
		alert(args.object.id);
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

*/
