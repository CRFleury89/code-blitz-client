import { Challenge } from '../models/challenge.model';
import { HandleStartChallenge } from '../controllers/challenge.controller';

/**
 * @class View
 *
 * Visual representation of the model.
 */

interface Input {
  key: string;
  type: string;
  placeholder: string;
  name: string;
}
export class ChallengeView {
  private app: HTMLElement;
  private form: HTMLElement;
  private submitButton: HTMLElement;
  private gameOnButton: HTMLElement;
  private inputName: HTMLInputElement;
  private inputWinLossRecord: HTMLInputElement;
  private title: HTMLElement;
  private userList: HTMLElement;
  private _temporaryWinLossText: string;

  constructor() {
    this.app = document.querySelector('#root');

    this.form = this.createElement('form');
    /*this.createInput({
      key: 'inputName',
      type: 'text',
      placeholder: 'Name',
      name: 'name'
    });
    this.createInput({
      key: 'inputWinLossRecord',
      type: 'text',
      placeholder: 'Win / Loss',
      name: 'winLossRecord'
    });

    //this.submitButton = this.createElement('button');
    //this.submitButton.textContent = 'Submit';

    //this.gameOnButton = this.createElement('button');
    //this.gameOnButton.textContent = 'Game On!';

    this.form.append(
      this.inputName, 
      this.inputWinLossRecord, 
      this.submitButton, 
      this.gameOnButton);

    this.gameOnButton.addEventListener('click', event => {
      const { origin, pathname } = location;
          location.replace(origin+pathname+'?page=game');
    });
*/
    this.title = this.createElement('h1');
    this.title.textContent = 'Challenge';
    this.userList = this.createElement('ul', 'user-list');
    this.app.append(this.title, this.form, this.userList);

    this._temporaryWinLossText = '';
    this._initLocalListeners();
  }

  _resetInput() {
    this.inputName.value = '';
    this.inputWinLossRecord.value = '';
  }

  createInput(
    { key, type, placeholder, name }: Input = {
      key: 'default',
      type: 'text',
      placeholder: 'default',
      name: 'default'
    }
  ) {
    this[key] = 
    Object.assign(this.createElement('input'), { type, placeholder, name });
  }

  createElement(tag: string, className?: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  displayUsers(users: Challenge[]) {
    // Delete all nodes
    while (this.userList.firstChild) {
      this.userList.removeChild(this.userList.firstChild);
    }

    // Show default message
    if (users.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'No users are currently looking for a challenge.';
      this.userList.append(p);
    } else {
      // Create nodes
      users.forEach(user => {
        const li = this.createElement('li');
        li.id = user.id;

        const spanUser = this.createElement('span');

        const spanAge = this.createElement('span') as HTMLInputElement;
        //spanAge.contentEditable = 'true';
        //spanAge.classList.add('editable');

        spanUser.textContent = user.name;
        spanAge.textContent = user.winLossRecord;

        const challengeButton = this.createElement('button', 'challenge');
        challengeButton.textContent = 'Challenge';

        const acceptChallengeButton = this.createElement('button', 'accept');
        acceptChallengeButton.textContent = "Accept Challenge";
        acceptChallengeButton.style.visibility = user.challenged ? 'visible' : 'hidden';
        li.append(spanUser, spanAge, challengeButton, acceptChallengeButton);

        // Append nodes
        this.userList.append(li);
      });
    }
  }

  _initLocalListeners() {
    this.userList.addEventListener('input', event => {
      /*if ((event.target as any).className === 'editable') {
        this._temporaryWinLossText = (event.target as any).innerText;
      }*/
    });
  }

  bindStartChallenge(handler: HandleStartChallenge) {
    /*this.gameOnButton.addEventListener('click', event => {
      //
      // NOTE: Passing a Challenge object is probably 
      // not needed, but I'm just continuing with
      // the MVC template pattern for now.
      // (Feel free to remove/simplify/refactor...)
      // We'll probably reflect challenge and game play
      // "state" all in Mongo, and our services can 
      // always get that information via a Mongoose query.
      //
      handler(new Challenge({
        name: this._nameText,
        winLossRecord: this._winLossRecordText}))
    });*/
  }

  bindAddUser(handler: Function) {
    /*this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (this._nameText) {
        handler({
          name: this._nameText,
          winLossRecord: this._winLossRecordText
        });
        this._resetInput();
      }
    });*/
  }

  bindChallengeUser(handler: Function) {
    this.userList.addEventListener('click', event => {
      if ((event.target as any).className === 'challenge') {
        const id = (event.target as any).parentElement.id;
        
        handler(id);
      }
    });
  }

  bindAcceptChallenge(handler: Function) {
    this.userList.addEventListener('click', event => {
      if ((event.target as any).className === 'accept') {
        const id = (event.target as any).parentElement.id;

        handler(id);
      }
    })
  }

  bindEditUser(handler: Function) {
    /*this.userList.addEventListener('focusout', event => {
      if (this._temporaryWinLossText) {
        const id = (event.target as any).parentElement.id;
        const key = 'winLossRecord';

        handler(id, { [key]: this._temporaryWinLossText });
        this._temporaryWinLossText = '';
      }
    });*/
  }
}