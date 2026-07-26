import {
  ElementRef
} from '@angular/core';

import {
  Highlight
} from './highlight';


describe('Highlight', () => {

  let element: HTMLElement;
  let directive: Highlight;


  beforeEach(() => {

    element =
      document.createElement('div');

    const elementRef =
      new ElementRef(element);

    directive =
      new Highlight(elementRef);

  });


  it('should create an instance', () => {

    expect(directive)
      .toBeTruthy();

  });


  it('should highlight on mouse enter', () => {

    directive.appHighlight =
      'yellow';

    directive.onMouseEnter();

    expect(
      element.style.backgroundColor
    ).toBe('yellow');

  });


  it('should remove highlight on mouse leave', () => {

    directive.appHighlight =
      'yellow';

    directive.onMouseEnter();

    directive.onMouseLeave();

    expect(
      element.style.backgroundColor
    ).toBe('');

  });

});