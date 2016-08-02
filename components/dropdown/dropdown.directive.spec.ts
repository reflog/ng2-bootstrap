import {Component} from '@angular/core';
import {inject, async} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {DROPDOWN_DIRECTIVES} from '../dropdown';

const defaultHtml = `
  <div dropdown>
    <button dropdownToggle>Dropdown</button>
    <ul dropdownMenu>
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
    </ul>
  </div>
`;

describe('Directive: dropdown', () => {
  it('should be closed by default', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb.overrideTemplate(TestDropdownComponent, defaultHtml)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
      });
  })));

  it('should be opened if isOpen === true and toggle on isOpen changes', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    const html = `
      <div dropdown [(isOpen)]="isOpen">
        <button dropdownToggle>Dropdown</button>
        <ul dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    tcb.overrideTemplate(TestDropdownComponent, html)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const context = fixture.componentInstance;
        context.isOpen = true;
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        context.isOpen = false;
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
        context.isOpen = true;
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
      });
  })));

  it('should toggle by click', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb.overrideTemplate(TestDropdownComponent, defaultHtml)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
      });
  })));

  it('should close by click on nonInput menu item', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    const html = `
      <div dropdown>
        <button dropdownToggle>Dropdown</button>
        <ul dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    tcb.overrideTemplate(TestDropdownComponent, html)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('li').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
      });
  })));

  it('should not close by click on input or textarea menu item', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    const html = `
      <div dropdown>
        <button dropdownToggle>Dropdown</button>
        <ul dropdownMenu>
          <li><input type="text"></li>
          <li><textarea>dropdown</textarea></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    tcb.overrideTemplate(TestDropdownComponent, html)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('input').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('textarea').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
      });
  })));

  it('should not close by click on menu item if autoClose === disabled', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    const html = `
      <div dropdown [autoClose]="autoClose">
        <button dropdownToggle>Dropdown</button>
        <ul dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    tcb.overrideTemplate(TestDropdownComponent, html)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const context = fixture.componentInstance;
        context.autoClose = 'disabled';
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('li').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
      });
  })));

  xit('should close by click on input in menu if autoClose === always', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    const html = `
      <div dropdown [autoClose]="autoClose">
        <button dropdownToggle>Dropdown</button>
        <ul dropdownMenu>
          <li><input type="text"></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    tcb.overrideTemplate(TestDropdownComponent, html)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const context = fixture.componentInstance;
        context.autoClose = 'always';
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('input').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
      });
  })));

  xit('should close by click on any element outside the dropdown', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    const html = `
      <div dropdown>
        <button dropdownToggle>Dropdown</button>
        <ul dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
      <span>outside</span>
    `;
    tcb.overrideTemplate(TestDropdownComponent, html)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const context = fixture.componentInstance;
        context.autoClose = 'outsideClick';
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('li').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('span').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
      });
  })));

  xit('should enable navigation of dropdown list elements with the arrow keys if keyboardNav is true', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    const html = `
      <div dropdown [keyboardNav]="keyboardNav">
        <button dropdownToggle>Dropdown</button>
        <ul dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    tcb.overrideTemplate(TestDropdownComponent, html)
      .createAsync(TestDropdownComponent)
      .then((fixture:ComponentFixture<any>) => {
        fixture.detectChanges();
        const element = fixture.nativeElement;
        const context = fixture.componentInstance;
        context.keyboardNav = true;
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');

        // var keyPressed = null;
        //
        // function keyPress(key) {
        //   var event = document.createEvent('Event');
        //   event.keyCode = key;
        //   event.initEvent('keydown');
        //   document.dispatchEvent(event);
        // }
        //
        // document.addEventListener('keydown', function(e){
        //   keyPressed = e.keyCode;
        // });
        //
        // keyPress(40)

        // element.triggerHandler({type:'keydown', which:40});

      });
  })));

  describe('Directive: dropdownToggle', () => {
    it('should not open if toggle isDisabled', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      const html = `
      <div dropdown>
        <button dropdownToggle [isDisabled]="isDisabled">Dropdown</button>
        <ul dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
      tcb.overrideTemplate(TestDropdownComponent, html)
        .createAsync(TestDropdownComponent)
        .then((fixture:ComponentFixture<any>) => {
          fixture.detectChanges();
          const element = fixture.nativeElement;
          const context = fixture.componentInstance;
          context.isDisabled = true;
          fixture.detectChanges();
          expect(element.querySelector('.dropdown').classList).not.toContain('open');
          element.querySelector('button').click();
          fixture.detectChanges();
          expect(element.querySelector('.dropdown').classList).not.toContain('open');
          context.isDisabled = false;
          fixture.detectChanges();
          element.querySelector('button').click();
          fixture.detectChanges();
          expect(element.querySelector('.dropdown').classList).toContain('open');
        });
    })));

    it('should add dropdown-toggle class if addToggleClass is true', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      const html = `
      <div dropdown>
        <button dropdownToggle [addToggleClass]="addToggleClass">Dropdown</button>
        <ul dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
      tcb.overrideTemplate(TestDropdownComponent, html)
        .createAsync(TestDropdownComponent)
        .then((fixture:ComponentFixture<any>) => {
          fixture.detectChanges();
          const element = fixture.nativeElement;
          const context = fixture.componentInstance;
          fixture.detectChanges();
          expect(element.querySelector('button').classList).not.toContain('dropdown-toggle');
          context.addToggleClass = true;
          fixture.detectChanges();
          expect(element.querySelector('button').classList).toContain('dropdown-toggle');
        });
    })));
  });
});

@Component({
  selector: 'dropdown-test',
  directives: [DROPDOWN_DIRECTIVES],
  template: ''
})

class TestDropdownComponent {
  public isOpen:Boolean = false;
  public isDisabled:Boolean = false;
  public addToggleClass:Boolean = false;
  public autoClose:String = 'nonInput';
  public keyboardNav:Boolean = false;
}
