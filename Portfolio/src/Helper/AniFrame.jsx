// Puts everything canvas related under one loop

const Members = new Set();

function UpdateMembers() {
  Members.forEach((callBack) => callBack());

  requestAnimationFrame(UpdateMembers);
}

requestAnimationFrame(UpdateMembers);

export function AddMember(callBack) {
  Members.add(callBack);
}

export function RemoveMember(callBack) {
  Members.delete(callBack);
}
