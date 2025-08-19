// Puts everything canvas related under one loop

const Members = new Set();

function PrimeUpdateMembers() {
  Members.forEach((callBack) => callBack());

  requestAnimationFrame(PrimeUpdateMembers);
}

requestAnimationFrame(PrimeUpdateMembers);

export function AddMember(callBack) {
  Members.add(callBack);
}

export function RemoveMember(callBack) {
  Members.delete(callBack);
}
