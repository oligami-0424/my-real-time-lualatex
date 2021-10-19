'use babel';

import RealtimeTexView from './my-real-time-lualatex-view';
import { CompositeDisposable } from 'atom';
import { BufferedProcess } from 'atom';

export default {

  realtimeTexView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.realtimeTexView = new RealtimeTexView(state.realtimeTexViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.realtimeTexView.getElement(),
      visible: false
    });
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      // atom.commands.add('atom-workspace', {
      //   'my-real-time-lualatex:toggle': () => this.toggle()
      // }),
      // my function
      atom.commands.add('atom-workspace', {
        'my-real-time-lualatex:insert': () => {
          this.insert()
        }
      })
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.realtimeTexView.destroy();
  },

  serialize() {
    return {
      realtimeTexViewState: this.realtimeTexView.serialize()
    };
  },

  // toggle() {
  //   console.log('RealtimeTex was toggled!');
  //   return (
  //     this.modalPanel.isVisible() ?
  //     this.modalPanel.hide() :
  //     this.modalPanel.show()
  //   );
  // },

  // my function
  insert() {
    var command = 'cd';
    var arguments = ['/users/nziq5/documents/_tex/helloworld'];
    var stdout = function(output) {
      var editor = atom.workspace.getActiveTextEditor();
      editor.insertText(output);
    };
    var command = 'cd';
    var arguments = [];
    var stdout = function(output) {
      var editor = atom.workspace.getActiveTextEditor();
      editor.insertText(output);
    };
    var process = new BufferedProcess({ command, arguments, stdout });
    var command = 'lualatex';
    var arguments = ['helloworld'];
    var stdout = function(output) {
      var editor = atom.workspace.getActiveTextEditor();
      editor.insertText(output);
    };
    var process = new BufferedProcess({ command, arguments, stdout });

    return ('');
  }

};
