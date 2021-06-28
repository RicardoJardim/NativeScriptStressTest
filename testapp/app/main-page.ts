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
import { CoreTypes } from "@nativescript/core";
import * as imagepicker from "@nativescript/imagepicker";
import * as Calendar from "nativescript-calendar";
import * as camera from "@nativescript/camera";
import { MainPageModel } from "./main-view-model";
var Contacts = require("nativescript-contacts-lite");
const documents: Folder = <Folder>knownFolders.documents();
const folder: Folder = <Folder>documents.getFolder("");

const images = [
	["~/images/creativity1.png", "~/images/creativity2.png"],
	["~/images/tablet1.png", "~/images/tablet2.png"],
	["~/images/modeling1.png", "~/images/modeling2.png"],
];

var page;
var botNavIndex = 0;
// Event handler for Page 'navigatingTo' event attached in main-page.xml
export function navigatingTo(args: EventData) {
	page = <Page>args.object;
	var context = new MainPageModel();
	page.bindingContext = context;
}

export function addViews(args: EventData) {
	let elm = page.getViewById("addElements");

	console.log(new Date());
	for (let index = 1; index <= 1000; index++) {
		let btn = new AbsoluteLayout();
		btn.backgroundColor = "white";
		btn.width = 230;
		btn.height = 240;
		elm.addChild(btn);
	}
	console.log(new Date());
}

export function addButtons(args: EventData) {
	let elm = page.getViewById("addElements");

	console.log(new Date());
	for (let index = 1; index <= 1000; index++) {
		let btn = new Button();
		btn.text = "click me";
		btn.backgroundColor = "yellow";
		btn.width = 230;
		btn.top = 1;
		btn.left = 1;
		btn.height = 240;
		elm.addChild(btn);
	}
	console.log(new Date());
}

export function MakeHttp() {
	console.log(new Date());

	Http.request({
		url: "http://192.168.1.112:3000/users?size=100",
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
		url: "http://192.168.1.112:3000/banks?size=100",
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
	geolocation
		.getCurrentLocation({
			desiredAccuracy: CoreTypes.Accuracy.any,
			maximumAge: 5000,
			timeout: 20000,
		})
		.then(
			(value) => {
				console.log(value);
			},
			(e) => {
				console.log(e);
			}
		);
}

export function calendar(): void {
	Calendar.listCalendars().then(
		function (calendars) {
			// a JSON array of Calendar objects is returned, each with an 'id' and 'name'
			console.log(
				"Found these Calendars on the device: " + JSON.stringify(calendars)
			);
		},
		function (error) {
			console.log("Error while listing Calendars: " + error);
		}
	);
}

export function getContacts(): void {
	let desiredFields = ["display_name", "phone"];

	console.log("Loading contacts...");
	let timer = new Date().getTime();

	Contacts.getContactsWorker(desiredFields).then(
		(result) => {
			console.log(
				`Loading contacts completed in ${new Date().getTime() - timer} ms.`
			);
			console.log(`Found ${result.length} contacts.`);
			console.dir(result);
		},
		(e) => {
			console.dir(e);
		}
	);
}

export function checkChanged(args) {
	const index = args.object.selectedIndex;
	setUpImage(botNavIndex, 0);
	setUpImage(index, 1);
	botNavIndex = index;
}

function setUpImage(index, which) {
	let elm = page.getViewById(`image_${index}`);
	elm.src = images[index][which];
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
