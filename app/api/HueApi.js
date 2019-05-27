const user = process.env.HUE_USER;
const apiHost = process.env.HUE_ENDPOINT;

async function getInfo() {
  try {
    const response = await fetch(`${apiHost}/${user}`);
    return await response.json();
  } catch(e) {
    throw e;
  }
}

async function toggleGroup(groupIndex, isOn) {
  try {
    const response = await(fetch(`${apiHost}/${user}/groups/${groupIndex}/action`, {
      method: 'PUT',
      body: JSON.stringify({ on: !isOn })
    }));
    return await response.json();
  } catch(e) {
    throw e;
  }
}

async function turnAllOn() {
  try {
    return await toggleGroup(0, false);
  } catch(e) {
    throw e;
  }
}

async function turnAllOff() {
  try {
    return await toggleGroup(0, true);
  } catch(e) {
    throw e;
  }
}

export {
  getInfo,
  toggleGroup,
  turnAllOn,
  turnAllOff
}
