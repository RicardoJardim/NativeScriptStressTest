/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page } from "@nativescript/core";
import { MainPageModel } from "./main-view-model";

// Event handler for Page 'navigatingTo' event attached in main-page.xml
export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	var context = new MainPageModel();
	page.bindingContext = context;
	/* 	view.className = "active";
	 */
	context.buttons = [
		page.getViewById("0"),
		page.getViewById("1"),
		page.getViewById("2"),
	];
}
