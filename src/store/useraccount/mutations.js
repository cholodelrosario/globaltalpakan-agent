/*
export function someMutation (state) {
}
*/
export function setDashboardUser (state,payload) {
    state.dashboardUser = payload
}

export function unsetDashboardUser (state) {
    state.dashboardUser = null
}

export function changeDept (state,payload) {
    state.dashboardUser.department = payload
}
