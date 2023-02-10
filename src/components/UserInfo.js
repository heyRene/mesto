export default class UserInfo {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._name = nameSelector;
    this._occupation = occupationSelector;
    this._avatar = avatarSelector;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
    };
  }
  setUserInfo(name, occupation) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }
  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
