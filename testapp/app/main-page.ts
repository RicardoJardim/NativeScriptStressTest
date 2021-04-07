/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import {
	Http,
	HttpResponse,
	EventData,
	Page,
	Button,
	AbsoluteLayout,
	knownFolders,
	Folder,
	File,
} from "@nativescript/core";
import * as geolocation from "@nativescript/geolocation";
import * as imagepicker from "@nativescript/imagepicker";
import * as camera from "@nativescript/camera";

import { MainPageModel } from "./main-view-model";

const documents: Folder = <Folder>knownFolders.documents();
const folder: Folder = <Folder>documents.getFolder("");

var page;
// Event handler for Page 'navigatingTo' event attached in main-page.xml
export function navigatingTo(args: EventData) {
	page = <Page>args.object;
	var context = new MainPageModel();
	page.bindingContext = context;
	/* 	view.className = "active";
	 */
	/* context.buttons = [
		page.getViewById("0"),
		page.getViewById("1"),
		page.getViewById("2"),
	]; */
}

export function addViews(args: EventData) {
	let elm = page.getViewById("addElements");

	console.log(new Date());
	for (let index = 1; index <= 1000; index++) {
		let btn = new AbsoluteLayout();
		btn.backgroundColor = "white";
		btn.width = 220;
		btn.height = 230;
		elm.addChild(btn);
	}
	console.log(new Date());
}

export function addButtons(args: EventData) {
	let elm = page.getViewById("addElements");

	console.log(new Date());
	for (let index = 1; index <= 1000; index++) {
		let btn = new Button();
		btn.text = "My New Label";
		btn.backgroundColor = "yellow";
		btn.width = 230;
		btn.height = 240;
		elm.addChild(btn);
	}
	console.log(new Date());
}

export function MakeHttp() {
	console.log(new Date());

	Http.request({
		url: "https://random-data-api.com/api/users/random_user?size=100",
		method: "GET",
	}).then(
		(response: HttpResponse) => {
			// Argument (response) is HttpResponse
			console.log(`Response Status Code: ${response.statusCode}`);
			writeFile("users", `${response.content}`);
		},
		(e) => {
			alert(e.toString());
		}
	);
	Http.request({
		url: "https://random-data-api.com/api/bank/random_bank?size=100",
		method: "GET",
	}).then(
		(response: HttpResponse) => {
			// Argument (response) is HttpResponse
			console.log(`Response Status Code: ${response.statusCode}`);
			writeFile("banks", `${response.content}`);
		},
		(e) => {
			alert(e.toString());
		}
	);
}

export function gallery(): void {
	const context = imagepicker.create({
		mode: "single",
	});

	// Request permissions, show the images list and process the selection
	context
		.authorize()
		.then(() => {
			return context.present();
		})
		.then((selection) => {
			console.log(selection);
		})
		.catch((e) => {
			// process error
			console.log(e);
		});
}

export function openCamera(): void {
	camera.requestPermissions().then(
		function success() {
			camera
				.takePicture()
				.then((imageAsset) => {
					console.log(imageAsset);
				})
				.catch((err) => {
					console.log("Error -> " + err.message);
				});
		},
		function failure() {
			alert("Failure");
		}
	);
}

export function gps(args: EventData): void {
	//https://docs.nativescript.org/plugins/geolocation.html#usage
	/* geolocation.isEnabled().then(
		(value) => {
			console.log(value);
			if (value == false) {
				geolocation.enableLocationRequest().then(
					(value) => {
						console.log(value);
					},
					(e) => {
						console.log(e);
					}
				);
			}
		},
		(e) => {
			console.log(e);
		}
	); */
}

export function checkChanged(args: EventData) {
	/* alert(args);
	console.log(args); */
}

function writeFile(where: string, data: string): void {
	var file: File = <File>folder.getFile(`${where}` + `.txt`);

	file
		.writeText(data)
		.then(() => {
			file.readText().then((res) => {
				console.log(`Successfully saved in ${file.path}`);
				console.log(new Date());
			});
		})
		.catch((err) => {
			console.log(err);
		});
}
