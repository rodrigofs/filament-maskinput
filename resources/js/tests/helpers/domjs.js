import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');


global.document = dom.window.document;
global.window = dom.window;
global.KeyboardEvent = window.KeyboardEvent;
global.Event = window.Event;

