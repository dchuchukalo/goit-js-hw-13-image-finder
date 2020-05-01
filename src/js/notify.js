import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { defaults } from '@pnotify/core';
import * as PNotify from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
PNotify.defaultModules.set(PNotifyMobile, {});
defaults.delay = '3000';

function showStackTopRight(type) {
  if (typeof window.stackBottomRight === 'undefined') {
    window.stackBottomRight = new PNotify.Stack({
      dir1: 'down',
      dir2: 'left',
      firstpos1: 25,
      firstpos2: 25,
      modal: false,
      maxOpen: Infinity,
    });
  }
  const opts = {
    title: 'Over Here',
    text: "Check me out. I'm in a different stack.",
    stack: window.stackBottomRight,
  };
  switch (type) {
    case 'error':
      opts.title = 'Error';
      opts.text = 'Please start enter your request';
      opts.type = 'error';
      break;
    case 'notice':
      opts.title = 'Oops..';
      opts.text = 'Try to enter another request';
      opts.type = 'notice';
      break;
    case 'success':
      opts.title = 'Success';
      opts.text = 'Start searching';
      opts.type = 'success';
      break;
    case 'firstImage':
      opts.title = 'You are at the first image';
      opts.text = 'Click the next arrow';
      opts.type = 'info';
      break;
    case 'lastImage':
      opts.title = 'Oops..';
      opts.text = "We don't have images anymore";
      opts.type = 'info';
      break;
  }
  PNotify.alert(opts);
}

export { showStackTopRight };
