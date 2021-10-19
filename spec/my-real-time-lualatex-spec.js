'use babel';

import MyRealTimeLualatex from '../lib/my-real-time-lualatex';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('MyRealTimeLualatex', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('my-real-time-lualatex');
  });

  describe('when the my-real-time-lualatex:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.my-real-time-lualatex')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'my-real-time-lualatex:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.my-real-time-lualatex')).toExist();

        let myRealTimeLualatexElement = workspaceElement.querySelector('.my-real-time-lualatex');
        expect(myRealTimeLualatexElement).toExist();

        let myRealTimeLualatexPanel = atom.workspace.panelForItem(myRealTimeLualatexElement);
        expect(myRealTimeLualatexPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'my-real-time-lualatex:toggle');
        expect(myRealTimeLualatexPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.my-real-time-lualatex')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'my-real-time-lualatex:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let myRealTimeLualatexElement = workspaceElement.querySelector('.my-real-time-lualatex');
        expect(myRealTimeLualatexElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'my-real-time-lualatex:toggle');
        expect(myRealTimeLualatexElement).not.toBeVisible();
      });
    });
  });
});
