export async function addProfile(clientID: string, userID: string) {
    return await window.ipc.addProfile(clientID, userID);
}

export async function getProfiles() {
    return await window.ipc.getProfiles();
}

export async function getProfileById(id: number) {
    return await window.ipc.getProfileById(id);
}

export async function updateProfile(
    id: number,
    clientID: string,
    userID: string
) {
    return await window.ipc.updateProfile(id, clientID, userID);
}

export async function deleteProfile(id: number) {
    return await window.ipc.deleteProfile(id);
}
